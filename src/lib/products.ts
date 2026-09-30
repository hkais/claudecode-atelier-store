import "server-only";

import { and, asc, desc, eq, inArray, ne } from "drizzle-orm";

import { db } from "@/db";
import { productImages, products } from "@/db/schema";

import type { Product } from "./catalog";

const BADGES = { new: "New", limited: "Limited" } as const;

type ProductRow = typeof products.$inferSelect & {
  category: { name: string };
  images: { src: string; alt: string }[];
};

const withRelations = {
  category: true,
  images: { orderBy: asc(productImages.position) },
} as const;

/** Maps a database row (with category and images) to the storefront `Product` shape. */
function toProduct(row: ProductRow): Product {
  const [image, ...gallery] = row.images.map(({ src, alt }) => ({ src, alt }));
  if (!image) throw new Error(`Product "${row.slug}" has no images`);

  return {
    slug: row.slug,
    name: row.name,
    category: row.category.name,
    price: row.priceCents,
    image,
    gallery: gallery.length > 0 ? gallery : undefined,
    badge: row.badge ? BADGES[row.badge] : undefined,
    color: row.color,
    description: row.description,
    details: row.details,
    stock: row.stock,
  };
}

export async function getProductBySlug(slug: string) {
  const row = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: withRelations,
  });
  return row ? toProduct(row) : undefined;
}

/** Newest products first. */
export async function getNewArrivals(limit = 8) {
  const rows = await db.query.products.findMany({
    with: withRelations,
    orderBy: desc(products.createdAt),
    limit,
  });
  return rows.map(toProduct);
}

/** Returns products in the order of `slugs`; unknown slugs are skipped. */
export async function getProductsBySlugs(slugs: readonly string[]) {
  if (slugs.length === 0) return [];
  const rows = await db.query.products.findMany({
    where: inArray(products.slug, [...slugs]),
    with: withRelations,
  });
  const bySlug = new Map(rows.map((row) => [row.slug, toProduct(row)]));
  return slugs.flatMap((slug) => bySlug.get(slug) ?? []);
}

/** Same-category products first, then the rest of the catalog. */
export async function getRelatedProducts(product: Product, limit = 4) {
  const current = await db.query.products.findFirst({
    columns: { categoryId: true },
    where: eq(products.slug, product.slug),
  });
  if (!current) return [];

  const sameCategory = await db.query.products.findMany({
    where: and(
      ne(products.slug, product.slug),
      eq(products.categoryId, current.categoryId),
    ),
    with: withRelations,
    orderBy: desc(products.createdAt),
    limit,
  });

  const remaining = limit - sameCategory.length;
  const others =
    remaining > 0
      ? await db.query.products.findMany({
          where: ne(products.categoryId, current.categoryId),
          with: withRelations,
          orderBy: desc(products.createdAt),
          limit: remaining,
        })
      : [];

  return [...sameCategory, ...others].map(toProduct);
}

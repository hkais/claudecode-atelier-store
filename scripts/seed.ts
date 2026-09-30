// Loads the sample catalog into MySQL. Safe to re-run: rows are upserted by slug.
//
//   npm run db:seed
//
// Uses its own connection instead of @/db, which imports "server-only" and
// throws outside Next.

import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { eq, inArray, sql } from "drizzle-orm";
import mysql from "mysql2/promise";

import * as schema from "../src/db/schema";
import { seedProducts } from "./seed-data";

const { categories, products, productImages } = schema;

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const pool = mysql.createPool({ uri: process.env.DATABASE_URL });
const db = drizzle(pool, { schema, mode: "default" });

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const categoryNames = [...new Set(seedProducts.map((p) => p.category))];

  await db
    .insert(categories)
    .values(categoryNames.map((name) => ({ slug: slugify(name), name })))
    .onDuplicateKeyUpdate({ set: { name: sql`values(${categories.name})` } });

  const categoryRows = await db
    .select()
    .from(categories)
    .where(inArray(categories.slug, categoryNames.map(slugify)));
  const categoryIds = new Map(categoryRows.map((c) => [c.name, c.id]));

  // Earlier entries get later timestamps, so "newest first" matches array order.
  const base = Date.now() - 24 * 60 * 60 * 1000;

  for (const [index, p] of seedProducts.entries()) {
    const values = {
      slug: p.slug,
      name: p.name,
      description: p.description,
      categoryId: categoryIds.get(p.category)!,
      priceCents: p.price,
      color: p.color,
      badge: p.badge ? (p.badge.toLowerCase() as "new" | "limited") : null,
      details: p.details,
      stock: p.stock,
      createdAt: new Date(base - index * 60_000),
    };

    await db
      .insert(products)
      .values(values)
      .onDuplicateKeyUpdate({ set: values });

    const [row] = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.slug, p.slug));

    await db.delete(productImages).where(eq(productImages.productId, row.id));
    await db.insert(productImages).values(
      [p.image, ...(p.gallery ?? [])].map((photo, position) => ({
        productId: row.id,
        src: photo.src,
        alt: photo.alt,
        position,
      })),
    );
  }

  console.log(
    `Seeded ${categoryNames.length} categories and ${seedProducts.length} products.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());

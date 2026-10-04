import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product-card";
import { getCategories, getCategoryWithProducts } from "@/lib/products";

// Catalog and stock changes should show immediately, so render per request.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[category]">): Promise<Metadata> {
  const result = await getCategoryWithProducts((await params).category);
  if (!result) return {};

  return {
    title: result.category.name,
    description: `Shop ${result.category.name} from the Atelier collection.`,
    openGraph: result.products[0] ? { images: [result.products[0].image.src] } : undefined,
  };
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const slug = (await params).category;
  const [result, categories] = await Promise.all([
    getCategoryWithProducts(slug),
    getCategories(),
  ]);
  if (!result) notFound();

  const { category, products } = result;

  return (
    <div className="container-page pt-6 pb-section md:pt-8">
      <nav aria-label="Breadcrumb" className="mb-10 md:mb-16">
        <ol className="type-eyebrow flex flex-wrap items-center gap-2 text-muted">
          <li>
            <Link href="/" className="link-reveal hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            {category.name}
          </li>
        </ol>
      </nav>

      <header className="mb-6 grid gap-6 md:mb-8 md:grid-cols-12 md:items-end md:gap-x-12">
        <h1 className="type-h1 md:col-span-7">{category.name}</h1>
        <p className="type-caption tabular-nums md:col-span-5 md:justify-self-end">
          {products.length} {products.length === 1 ? "piece" : "pieces"}
        </p>
      </header>

      {/* Switch between categories without going back to the homepage. */}
      <nav
        aria-label="Categories"
        className="mb-10 border-y py-4 md:mb-14"
      >
        <ul className="type-label flex flex-wrap gap-x-8 gap-y-3">
          <li>
            <Link href="/new-in" className="link-reveal text-muted hover:text-ink">
              New Arrivals
            </Link>
          </li>
          {categories.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/${item.slug}`}
                aria-current={item.slug === category.slug ? "page" : undefined}
                className="link-reveal text-muted hover:text-ink aria-[current=page]:text-ink"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {products.length > 0 ? (
        <ul className="grid-products">
          {products.map((product, index) => (
            <li key={product.slug}>
              <ProductCard product={product} priority={index < 4} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-6 py-section">
          <p className="type-lead">Nothing in {category.name} at the moment.</p>
          <Link href="/new-in" className="btn btn-secondary">
            View New Arrivals
          </Link>
        </div>
      )}
    </div>
  );
}

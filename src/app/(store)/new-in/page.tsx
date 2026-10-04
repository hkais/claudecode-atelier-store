import type { Metadata } from "next";
import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { getNewArrivals } from "@/lib/products";

// Catalog and stock changes should show immediately, so render per request.
export const dynamic = "force-dynamic";

// 24 fills the 2, 3 and 4 column grids evenly.
const PAGE_SIZE = 24;

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "The latest pieces to join the Atelier collection.",
};

export default async function NewInPage() {
  const products = await getNewArrivals(PAGE_SIZE);

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
            New Arrivals
          </li>
        </ol>
      </nav>

      <header className="mb-10 grid gap-6 border-b pb-8 md:mb-14 md:grid-cols-12 md:items-end md:gap-x-12 md:pb-12">
        <h1 className="type-h1 md:col-span-7">New Arrivals</h1>
        <div className="space-y-2 md:col-span-5 md:justify-self-end md:max-w-md">
          <p className="type-lead">
            The latest pieces to join the collection, newest first.
          </p>
          {products.length > 0 ? (
            <p className="type-caption tabular-nums">
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </p>
          ) : null}
        </div>
      </header>

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
          <p className="type-lead">Nothing new at the moment. Check back soon.</p>
          <Link href="/" className="btn btn-secondary">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}

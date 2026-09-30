import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product-card";
import { ProductAccordion } from "@/components/product/product-accordion";
import { ProductGallery } from "@/components/product/product-gallery";
import { StockIndicator } from "@/components/product/stock-indicator";
import { SectionHeading } from "@/components/section-heading";
import { formatPrice, getStockStatus } from "@/lib/catalog";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";

// Stock changes should show immediately, so render per request.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.image.src] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();

  const soldOut = getStockStatus(product.stock) === "sold-out";
  const related = await getRelatedProducts(product);

  return (
    <>
      <div className="container-page pt-6 pb-section md:pt-8">
        <nav aria-label="Breadcrumb" className="mb-6 md:mb-8">
          <ol className="type-eyebrow flex flex-wrap items-center gap-2 text-muted">
            <li>
              <Link href="/" className="link-reveal hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>{product.category}</li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-20">
          <div className="lg:col-span-7">
            <ProductGallery images={[product.image, ...(product.gallery ?? [])]} />
          </div>

          <div className="lg:col-span-5">
            {/* Details stay in view while the gallery scrolls on desktop. */}
            <div className="space-y-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:max-w-md">
              <header className="space-y-4">
                <p className="type-eyebrow text-muted">
                  {product.category}
                  {product.badge ? (
                    <span className="text-accent"> · {product.badge}</span>
                  ) : null}
                </p>
                <h1 className="type-h3">{product.name}</h1>
                <p className="text-lg tabular-nums">{formatPrice(product.price)}</p>
              </header>

              <dl className="space-y-3 border-t pt-6 text-sm">
                <div className="flex gap-2">
                  <dt className="text-muted">Color</dt>
                  <dd>{product.color}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="sr-only">Availability</dt>
                  <dd>
                    <StockIndicator stock={product.stock} />
                  </dd>
                </div>
              </dl>

              <div className="space-y-3">
                {/* TODO: wire to the cart once it exists. */}
                <button
                  type="button"
                  disabled={soldOut}
                  className="btn btn-primary w-full"
                >
                  {soldOut ? "Sold Out" : "Add to Bag"}
                </button>
                {soldOut ? (
                  <p className="type-caption">
                    This piece is currently unavailable.{" "}
                    <Link href="/contact" className="link text-ink">
                      Contact client services
                    </Link>{" "}
                    to hear when it returns.
                  </p>
                ) : (
                  <p className="type-caption">
                    Complimentary express shipping and returns.
                  </p>
                )}
              </div>

              <p className="type-body">{product.description}</p>

              <ProductAccordion
                sections={[
                  {
                    title: "Details & Care",
                    defaultOpen: true,
                    content: (
                      <ul className="list-disc space-y-1.5 pl-5 marker:text-subtle">
                        {product.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    title: "Shipping & Returns",
                    content: (
                      <p>
                        Complimentary express delivery in 2–4 business days. Returns
                        and exchanges are free within 30 days of delivery.
                      </p>
                    ),
                  },
                  {
                    title: "Gift Packaging",
                    content: (
                      <p>
                        Every order arrives in our signature box, with the option to
                        add a handwritten note at checkout.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="related-title" className="container-page section-y border-t">
        <SectionHeading id="related-title" eyebrow="Discover" title="You May Also Like" />
        {/* Four fill 2 and 4 columns; the 3-column range shows three. */}
        <ul className="grid-products md:max-xl:[&>li:nth-child(n+4)]:hidden">
          {related.map((item) => (
            <li key={item.slug}>
              <ProductCard product={item} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

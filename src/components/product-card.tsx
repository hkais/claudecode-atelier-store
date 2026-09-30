import Image from "next/image";
import Link from "next/link";

import { formatPrice, getStockStatus, type Product } from "@/lib/catalog";

type ProductCardProps = {
  product: Product;
  /** `sizes` for next/image; defaults to the grid-products column widths. */
  sizes?: string;
};

export function ProductCard({
  product,
  sizes = "(min-width: 80rem) 25vw, (min-width: 48rem) 33vw, 50vw",
}: ProductCardProps) {
  const badge =
    getStockStatus(product.stock) === "sold-out" ? "Sold Out" : product.badge;

  return (
    <article className="group relative">
      <div className="media-product">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes={sizes}
          className="transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {badge ? (
          <span className="type-eyebrow absolute top-3 left-3 bg-paper px-2 py-1">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="mt-3 space-y-1 px-1 md:px-0">
        <p className="type-eyebrow text-muted">{product.category}</p>
        <h3 className="text-sm">
          {/* Stretched link: the whole card is clickable. */}
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-1 focus-visible:after:outline-offset-4 focus-visible:after:outline-ink"
          >
            {product.name}
          </Link>
        </h3>
        <p className="type-price">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}

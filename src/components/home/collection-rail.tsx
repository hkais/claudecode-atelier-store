import Image from "next/image";

import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import type { Collection, Product } from "@/lib/catalog";

type CollectionRailProps = {
  collection: Collection;
  products: Product[];
};

// Collection image beside a swipeable rail of its products.
export function CollectionRail({ collection, products }: CollectionRailProps) {
  const titleId = `${collection.slug}-title`;

  return (
    <section aria-labelledby={titleId} className="container-page section-y">
      <SectionHeading
        id={titleId}
        eyebrow={collection.eyebrow}
        title={collection.title}
        action={{ label: "Shop the Edit", href: `/collections/${collection.slug}` }}
      />

      <div className="grid gap-y-8 gap-x-(--grid-gap-x) lg:grid-cols-[1fr_2fr]">
        <div className="relative aspect-landscape overflow-hidden bg-canvas lg:aspect-auto">
          <Image
            src={collection.image.src}
            alt={collection.image.alt}
            fill
            sizes="(min-width: 64rem) 33vw, 100vw"
            className="object-cover"
          />
          <p className="type-lead absolute inset-x-0 bottom-0 bg-paper/90 p-5 backdrop-blur-sm">
            {collection.description}
          </p>
        </div>

        <ul className="scroll-rail pb-2">
          {products.map((product) => (
            <li key={product.slug}>
              <ProductCard
                product={product}
                sizes="(min-width: 80rem) 17vw, (min-width: 48rem) 40vw, 72vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

import type { Collection } from "@/lib/catalog";

// Full-bleed pair of collection stories; stacks on phones.
export function EditorialSplit({ collections }: { collections: Collection[] }) {
  return (
    <section aria-label="Featured collections" className="grid-split">
      {collections.map((collection) => (
        <Link
          key={collection.slug}
          href={`/collections/${collection.slug}`}
          className="group relative block aspect-portrait overflow-hidden bg-canvas md:aspect-auto md:h-[min(90svh,60rem)]"
        >
          <Image
            src={collection.image.src}
            alt={collection.image.alt}
            fill
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 space-y-3 p-gutter pb-10 text-white md:pb-14">
            <p className="type-eyebrow">{collection.eyebrow}</p>
            <h2 className="type-h2">{collection.title}</h2>
            <p className="max-w-sm text-base text-white/85">{collection.description}</p>
            <span className="type-label link-reveal mt-2 inline-block">Discover</span>
          </div>
        </Link>
      ))}
    </section>
  );
}

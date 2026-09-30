import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import type { Category } from "@/lib/catalog";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section aria-labelledby="categories-title" className="container-page section-y">
      <SectionHeading id="categories-title" eyebrow="Explore" title="Shop by Category" />
      <ul className="grid grid-cols-2 gap-x-(--grid-gap-x) gap-y-8 lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={`/${category.slug}`} className="group block">
              <div className="relative aspect-portrait overflow-hidden bg-canvas">
                <Image
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  sizes="(min-width: 64rem) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <span className="type-label mt-4 flex items-center gap-2 px-1 md:px-0">
                {category.name}
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

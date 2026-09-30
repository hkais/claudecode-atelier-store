import Image from "next/image";
import Link from "next/link";

import { hero } from "@/lib/catalog";

// Two-up campaign imagery on tablet and up; a single full-height image on phones.
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="grid md:grid-cols-2">
        {hero.images.map((image, index) => (
          <div
            key={image.src}
            className={`relative h-[82svh] max-h-[56rem] min-h-[32rem] bg-canvas md:h-[88svh] md:max-h-[72rem] ${
              index > 0 ? "max-md:hidden" : ""
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload={index === 0}
              sizes="(min-width: 48rem) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

      <div className="container-page absolute inset-x-0 bottom-0 flex flex-col items-center gap-5 pb-12 text-center text-white md:pb-20">
        <p className="type-eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-title" className="type-display">
          {hero.title}
        </h1>
        <p className="max-w-md text-md text-white/85">{hero.description}</p>
        <div className="mt-3 flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
          <Link href="/collections/autumn-winter" className="btn btn-inverse">
            Discover the Collection
          </Link>
          <Link href="/women" className="type-label link-reveal">
            Shop Women
          </Link>
        </div>
      </div>
    </section>
  );
}

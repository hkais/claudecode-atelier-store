import Image from "next/image";

import type { Photo } from "@/lib/catalog";

// Phones: edge-to-edge swipe gallery (the next image peeks in when there is
// more than one). Desktop: images stacked in a column beside sticky details.
export function ProductGallery({ images }: { images: Photo[] }) {
  const multiple = images.length > 1;

  return (
    <ul
      aria-label="Product images"
      className="-mx-gutter flex snap-x snap-mandatory gap-(--grid-gap-x) overflow-x-auto [scrollbar-width:none] lg:mx-0 lg:grid lg:overflow-visible [&::-webkit-scrollbar]:hidden"
    >
      {images.map((image, index) => (
        <li
          key={image.src}
          className={`shrink-0 snap-start ${multiple ? "w-[88%]" : "w-full"} lg:w-full`}
        >
          <div className="media-product">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload={index === 0}
              sizes="(min-width: 64rem) 58vw, 90vw"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

import Image from "next/image";
import Link from "next/link";

import { story } from "@/lib/catalog";

// Full-bleed brand story over a darkened photograph.
export function StoryBand() {
  return (
    <section
      aria-labelledby="story-title"
      className="relative flex h-[75svh] max-h-[52rem] min-h-[30rem] items-center justify-center overflow-hidden bg-ink"
    >
      <Image
        src={story.image.src}
        alt={story.image.alt}
        fill
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="container-prose relative flex flex-col items-center gap-5 text-center text-white">
        <p className="type-eyebrow">{story.eyebrow}</p>
        <h2 id="story-title" className="type-h1">
          {story.title}
        </h2>
        <p className="text-md text-white/85">{story.description}</p>
        <Link href="/story" className="btn btn-inverse mt-3">
          Our Craft
        </Link>
      </div>
    </section>
  );
}

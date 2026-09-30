import { CategoryGrid } from "@/components/home/category-grid";
import { CollectionRail } from "@/components/home/collection-rail";
import { EditorialSplit } from "@/components/home/editorial-split";
import { Hero } from "@/components/home/hero";
import { ServicesStrip } from "@/components/home/services-strip";
import { StoryBand } from "@/components/home/story-band";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { categories, editorials, newArrivals, weekendEdit } from "@/lib/catalog";

export default function Home() {
  return (
    <>
      <Hero />

      <section aria-labelledby="new-arrivals-title" className="container-page section-y">
        <SectionHeading
          id="new-arrivals-title"
          eyebrow="Just In"
          title="New Arrivals"
          action={{ label: "View All", href: "/new-in" }}
        />
        {/* Eight fill 2 and 4 columns evenly; the 3-column range shows six. */}
        <ul className="grid-products md:max-xl:[&>li:nth-child(n+7)]:hidden">
          {newArrivals.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>

      <EditorialSplit collections={editorials} />

      <CategoryGrid categories={categories} />

      <StoryBand />

      <CollectionRail
        collection={weekendEdit.collection}
        products={weekendEdit.products}
      />

      <ServicesStrip />
    </>
  );
}

import { services } from "@/lib/catalog";

// Hairline grid: the 1px gap shows the line color between cells.
export function ServicesStrip() {
  return (
    <section aria-label="Our services" className="border-t">
      <ul className="mx-auto grid max-w-page grid-cols-2 gap-px bg-line lg:grid-cols-4">
        {services.map((service) => (
          <li key={service.title} className="space-y-2 bg-paper px-gutter py-10 text-center">
            <h3 className="type-label">{service.title}</h3>
            <p className="type-caption">{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

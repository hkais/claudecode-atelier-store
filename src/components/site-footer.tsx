import Link from "next/link";

import { NewsletterForm } from "@/components/newsletter-form";

const columns = [
  {
    title: "Client Services",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Care Guide", href: "/care" },
    ],
  },
  {
    title: "The House",
    links: [
      { label: "Our Story", href: "/story" },
      { label: "Craftsmanship", href: "/craftsmanship" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Sale", href: "/terms" },
      { label: "Cookie Settings", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-canvas">
      <div className="container-page section-y grid gap-12 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-5">
          <h2 className="type-h3">Letters from the atelier</h2>
          <p className="type-body max-w-md">
            New collections, private appointments and stories from our workshops.
            No more than twice a month.
          </p>
          <div className="max-w-md">
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="type-label mb-5">{column.title}</h2>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="type-caption link-reveal hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-line-strong/40">
        <div className="container-page flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl tracking-widest uppercase">Atelier</p>
          <p className="type-caption">
            &copy; {new Date().getFullYear()} Atelier Store. Sample imagery via Unsplash.
          </p>
        </div>
      </div>
    </footer>
  );
}

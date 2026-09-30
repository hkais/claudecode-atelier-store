import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function StoreLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <p className="type-eyebrow bg-ink px-gutter py-2.5 text-center text-paper">
        Complimentary shipping and returns
      </p>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}

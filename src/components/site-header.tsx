import Link from "next/link";

import { BagIcon, SearchIcon, UserIcon } from "@/components/icons";
import { MobileMenu } from "@/components/mobile-menu";
import { navigation } from "@/lib/catalog";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-paper/95 backdrop-blur-sm">
      <div className="container-page grid h-header grid-cols-[1fr_auto_1fr] items-center">
        {/* Left: menu + search on mobile, primary navigation on desktop. */}
        <div className="-ml-3 flex items-center lg:ml-0">
          <MobileMenu links={navigation} />
          <Link href="/search" className="btn-icon lg:hidden" aria-label="Search">
            <SearchIcon />
          </Link>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="type-label link-reveal">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Link
          href="/"
          className="font-display text-2xl tracking-widest uppercase md:text-3xl"
        >
          Atelier
        </Link>

        <div className="-mr-3 flex items-center justify-end">
          <Link href="/search" className="btn-icon max-lg:hidden" aria-label="Search">
            <SearchIcon />
          </Link>
          <Link href="/account" className="btn-icon" aria-label="Account">
            <UserIcon />
          </Link>
          <Link href="/bag" className="btn-icon" aria-label="Shopping bag">
            <BagIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}

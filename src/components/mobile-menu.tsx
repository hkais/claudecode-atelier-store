"use client";

import Link from "next/link";
import { useRef } from "react";

import { CloseIcon, MenuIcon } from "@/components/icons";

type MobileMenuProps = {
  links: ReadonlyArray<{ label: string; href: string }>;
};

// A native modal <dialog> gives us focus trapping, Escape-to-close and an
// inert background for free.
export function MobileMenu({ links }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        className="btn-icon lg:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
        onClick={open}
      >
        <MenuIcon />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-sm bg-paper p-0 text-ink backdrop:bg-overlay open:flex open:flex-col"
        // Clicking the backdrop (the dialog element itself) closes the menu.
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="flex h-header shrink-0 items-center justify-between border-b px-gutter">
          <span className="type-label">Menu</span>
          <button
            type="button"
            className="btn-icon -mr-3"
            aria-label="Close menu"
            onClick={close}
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-gutter py-6">
          <ul className="divide-y">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="type-h3 flex items-center justify-between py-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t px-gutter py-6">
          <Link href="/account" onClick={close} className="type-label link-reveal">
            Sign in
          </Link>
          <p className="type-caption">Client services, seven days a week.</p>
        </div>
      </dialog>
    </>
  );
}

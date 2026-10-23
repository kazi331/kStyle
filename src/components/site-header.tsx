"use client";

import { useBag } from "@/components/bag";
import { MenuIcon } from "@/components/icons";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#drop", label: "01 New in" },
  { href: "/collections/winter", label: "02 Shop" },
  { href: "/#about", label: "03 Brand" },
] as const;

export function SiteHeader() {
  const { count, bump, open: bagOpen, show: showBag, hide: hideBag } = useBag();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative">
      <header className="flex flex-nowrap items-center justify-between gap-4 px-4 py-2 min-[861px]:flex-wrap min-[861px]:px-8 min-[861px]:py-[18px]">
        <button
          type="button"
          className="-ml-3 flex size-12 cursor-pointer items-center justify-center border-0 bg-transparent min-[861px]:hidden"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <MenuIcon />
        </button>
        <Link
          href="/"
          aria-label="Kstyle home"
          className="cd text-[36px] leading-none min-[861px]:text-[40px]"
        >
          Kstyle<span className="text-accent">.</span>
        </Link>
        <nav className="hidden gap-[30px] min-[861px]:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-bold tracking-[0.1em] uppercase hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="flex min-h-11 cursor-pointer items-center gap-1.5 border-0 bg-ink px-3.5 text-xs font-bold tracking-[0.1em] text-paper uppercase min-[861px]:gap-2.5 min-[861px]:px-5 min-[861px]:text-[13px]"
          aria-label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}
          aria-expanded={bagOpen}
          aria-controls="bag"
          onClick={() => (bagOpen ? hideBag() : showBag())}
        >
          Bag
          <span className="relative inline-flex">
            {bump > 0 ? <span key={bump} aria-hidden="true" className="bag-bubble" /> : null}
            <span
              key={`count-${bump}`}
              className={`bg-accent px-[7px] py-px text-white min-[861px]:px-2 min-[861px]:py-0.5 ${bump > 0 ? "bag-pop" : ""}`}
            >
              {count}
            </span>
          </span>
        </button>
      </header>
      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="absolute inset-x-0 top-full z-20 border-y-2 border-ink bg-canvas px-4 min-[861px]:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cd block border-b-2 border-ink py-4 text-4xl last:border-b-0"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}

"use client";

import { MenuIcon } from "@/components/icons";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/#closet", label: "01 Closet" },
  { href: "/#drop", label: "02 The Drop" },
  { href: "/collections/winter", label: "03 Shop" },
  { href: "/#about", label: "04 Brand" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      setStuck(!entry.isIntersecting);
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const apply = () => {
      document.documentElement.style.setProperty("--header-height", `${bar.offsetHeight}px`);
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--header-height");
    };
  }, [open]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px -mb-px" />
      <div
        ref={barRef}
        className={`sticky top-0 z-30 border-b-2 bg-canvas ${stuck ? "border-ink" : "border-transparent"}`}
      >
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
        </header>
        {open ? (
          <nav
            id="mobile-nav"
            aria-label="Primary"
            className="border-y-2 border-ink bg-canvas px-4 min-[861px]:hidden"
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
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useBag } from "@/components/bag";
import { ArrowIcon, CloseIcon } from "@/components/icons";
import {
  deliveryCharge,
  formatPrice,
  freeDeliveryMinimum,
  getProduct,
} from "@/lib/catalog";

export function FloatingCart() {
  const { count, bump, lines, show: showSideCart } = useBag();
  const [expanded, setExpanded] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [initialEntranceDone, setInitialEntranceDone] = useState(false);
  const prevBump = useRef(bump);
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Entrance animation only plays once on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialEntranceDone(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Listen for throw landing event to trigger basket catch pop bounce
  useEffect(() => {
    const handleLanded = () => {
      setIsPopping(true);
      const timer = setTimeout(() => setIsPopping(false), 550);
      return () => clearTimeout(timer);
    };

    window.addEventListener("kstyle:cart-item-landed", handleLanded);
    return () => window.removeEventListener("kstyle:cart-item-landed", handleLanded);
  }, []);

  // Fallback catch bounce if bump increments
  useEffect(() => {
    if (bump > 0 && bump !== prevBump.current) {
      prevBump.current = bump;
      const landTimer = setTimeout(() => {
        setIsPopping(true);
        const resetTimer = setTimeout(() => setIsPopping(false), 550);
        return () => clearTimeout(resetTimer);
      }, 590);
      return () => clearTimeout(landTimer);
    }
  }, [bump]);

  // Close popup on outside click
  useEffect(() => {
    if (!expanded) return;

    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [expanded]);

  // Get product thumbnails (unique, last 3)
  const thumbnails = lines
    .map((line) => {
      const product = getProduct(line.slug);
      return product
        ? { slug: product.slug, image: product.image, imageFit: product.imageFit }
        : null;
    })
    .filter(Boolean)
    .filter((item, index, self) => self.findIndex((s) => s!.slug === item!.slug) === index)
    .slice(-3) as { slug: string; image: string; imageFit: string }[];

  const items = lines.flatMap((line) => {
    const product = getProduct(line.slug);
    return product ? [{ ...line, product }] : [];
  });

  const subtotal = items.reduce(
    (total, line) => total + line.product.price * line.quantity,
    0,
  );
  const delivery = deliveryCharge(subtotal);
  const total = subtotal + delivery;

  return (
    <div
      ref={popupRef}
      className={`fixed bottom-6 left-1/2 z-40 -translate-x-1/2 ${!initialEntranceDone ? "floating-cart-initial-entrance" : ""
        }`}
      style={{ perspective: "800px" }}
    >
      {/* Expanded cart popup */}
      <div
        className={`absolute bottom-[calc(100%+12px)] left-1/2 z-40 -translate-x-1/2  w-[350px] origin-bottom overflow-hidden rounded-2xl bg-ink text-paper shadow shadow-slate-600 transition-all duration-300 ${expanded
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-95 opacity-0"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-white/10 px-5 pt-4 pb-3">
          <div className="flex items-center gap-2.5">
            <svg
              aria-hidden="true"
              className="size-5 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="cd text-lg tracking-tight text-paper">Your Cart</span>
            <span className="flex size-5 items-center justify-center rounded-full bg-accent text-[11px] font-extrabold text-white">
              {count}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setExpanded(false);
                showSideCart();
              }}
              title="Open full side cart"
              className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-paper transition-colors hover:bg-white/20 hover:text-white cursor-pointer"
            >
              <span>Full Cart</span>
              <span className="text-accent">→</span>
            </button>

            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Close cart popup"
              className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 p-0 text-paper transition-colors hover:bg-white/20 hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="cd m-0 text-2xl text-paper">Cart is empty</p>
            <p className="mt-2 mb-0 text-xs text-steel">
              Add products from the collection to see them here.
            </p>
            <button
              type="button"
              onClick={() => {
                setExpanded(false);
                showSideCart();
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-paper hover:bg-white/20"
            >
              Open side bag →
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent px-4 py-3">
              {items.map((line) => (
                <div
                  key={`${line.slug}-${line.size}`}
                  className="mb-2.5 flex items-center gap-3 rounded-xl border border-white/10 bg-body/50 px-3 py-2.5 last:mb-0"
                >
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-canvas">
                    <Image
                      src={line.product.image}
                      alt=""
                      fill
                      sizes="48px"
                      className={
                        line.product.imageFit === "contain"
                          ? "object-contain mix-blend-multiply"
                          : "object-cover"
                      }
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-accent">
                      {line.product.category}
                    </div>
                    <div className="truncate text-sm font-bold text-paper">
                      {line.product.name}
                    </div>
                    <div className="text-[11px] font-bold text-steel">
                      Size {line.size} · Qty {line.quantity}
                    </div>
                  </div>
                  <div className="shrink-0 text-sm font-black text-paper">
                    {formatPrice(line.product.price * line.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Free delivery info */}
            <div className="mx-4 mb-3 flex items-center justify-between rounded-lg border border-white/10 bg-body/40 px-3.5 py-2.5 text-xs text-steel">
              <span>
                {delivery === 0
                  ? "✓ Free delivery on this order"
                  : `Free delivery over ${formatPrice(freeDeliveryMinimum)}`}
              </span>
              <span className="font-bold text-paper">
                {delivery === 0 ? "FREE" : formatPrice(delivery)}
              </span>
            </div>

            {/* Subtotal */}
            <div className="border-t-2 border-white/10 px-5 py-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.1em] text-steel uppercase">
                  Subtotal
                </span>
                <span className="text-lg font-black text-paper">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            {/* Action Buttons: Checkout + Show Full Cart */}
            <div className="flex flex-col">
              <Link
                href="/checkout"
                onClick={(event) => {
                  if (
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey ||
                    event.button !== 0
                  ) {
                    return;
                  }

                  event.preventDefault();
                  setExpanded(false);
                  router.push("/checkout");
                }}
                className="flex items-center justify-between bg-accent px-5 py-4 text-xs font-extrabold tracking-[0.14em] text-white uppercase transition-colors hover:bg-accent/90"
              >
                <span>Proceed to Checkout</span>
                <span className="flex items-center gap-2">
                  <span>{formatPrice(total)}</span>
                  <ArrowIcon className="size-4" />
                </span>
              </Link>

              {/* Show Full Cart Button */}
              {/* <button
                type="button"
                onClick={() => {
                  setExpanded(false);
                  showSideCart();
                }}
                className="flex w-full items-center justify-center gap-2 border-t border-white/10 bg-body/40 py-2.5 text-xs font-extrabold tracking-[0.12em] uppercase text-paper/80 transition-colors hover:bg-body/70 hover:text-white cursor-pointer"
              >
                <svg
                  className="size-3.5 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                </svg>
                <span>Show full cart</span>
                <span className="text-steel">→</span>
              </button> */}
            </div>
          </>
        )}
      </div>

      {/* Floating pill bar */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={`floating-cart-bar relative flex cursor-pointer items-center gap-3 rounded-full border-2 border-ink bg-ink py-2 pr-2.5 pl-2.5 text-paper shadow-slate-600 shadow-2xl transition-all duration-300 hover:scale-105 ${isPopping ? "cart-pop" : ""
          }`}
      >
        {/* Stacked thumbnails or cart icon if empty */}
        {thumbnails.length > 0 ? (
          <div className="flex -space-x-3">
            {thumbnails.map((thumb, i) => (
              <div
                key={thumb.slug}
                className="relative size-9 overflow-hidden rounded-full border-2 border-ink bg-canvas shadow-sm"
                style={{ zIndex: thumbnails.length - i }}
              >
                <Image
                  src={thumb.image}
                  alt=""
                  fill
                  sizes="36px"
                  className={
                    thumb.imageFit === "contain"
                      ? "object-contain mix-blend-multiply"
                      : "object-cover"
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex size-9 items-center justify-center rounded-full border-2 border-ink bg-white/10 text-paper">
            <svg
              className="size-4 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
        )}

        {/* Text */}
        <div className="flex flex-col items-start pr-1 text-left leading-tight">
          <span className="text-xs font-extrabold tracking-[0.08em] uppercase text-paper">
            View cart
          </span>
          <span className="text-[11px] font-bold text-steel">
            {count} {count === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Arrow Button in accent red */}
        <div className="flex size-7 items-center justify-center rounded-full bg-accent text-white shadow-sm transition-transform group-hover:translate-x-0.5">
          <ArrowIcon className="size-3.5" />
        </div>
      </button>
    </div>
  );
}

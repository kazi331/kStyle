"use client";

import { useBag } from "@/components/bag";
import { ArrowIcon } from "@/components/icons";
import { SizeGuide } from "@/components/size-guide";
import {
  formatPrice,
  galleryViews,
  sizeChart,
  specs,
  type Product,
} from "@/lib/catalog";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useBag();
  const [view, setView] = useState(0);
  const [size, setSize] = useState<string>("M");
  const [guideOpen, setGuideOpen] = useState(false);
  const [addedTick, setAddedTick] = useState(0);
  const added = addedTick > 0;

  useEffect(() => {
    if (addedTick === 0) return;

    const timeout = window.setTimeout(() => setAddedTick(0), 1600);
    return () => window.clearTimeout(timeout);
  }, [addedTick]);
  const active = galleryViews[view] ?? galleryViews[0];

  return (
    <section className="grid grid-cols-1 items-start gap-10 px-8 pb-16 min-[861px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] min-[861px]:gap-14 min-[861px]:pb-[88px]">
      <div className="grid grid-cols-1 gap-4 min-[861px]:grid-cols-[76px_minmax(0,1fr)]">
        <div className="order-2 flex gap-2.5 overflow-x-auto min-[861px]:order-1 min-[861px]:flex-col min-[861px]:overflow-visible">
          {galleryViews.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              aria-pressed={view === index}
              onClick={() => setView(index)}
              className={`relative size-[76px] shrink-0 cursor-pointer overflow-hidden border-2 bg-mist p-0 ${view === index ? "border-ink" : "border-transparent hover:border-ink"
                }`}
            >
              <span className="sr-only">{item.label}</span>
              <span
                className="absolute inset-0"
                style={{
                  transform: item.scale === 1 ? undefined : `scale(${item.scale})`,
                  transformOrigin: item.origin,
                }}
              >
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="76px"
                  className={
                    product.imageFit === "contain"
                      ? "object-contain mix-blend-multiply"
                      : "object-cover"
                  }
                />
              </span>
            </button>
          ))}
        </div>
        <div className="relative order-1 overflow-hidden bg-mist min-[861px]:order-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <div
              className="absolute inset-0 transition-[scale, transform] duration-500"
              style={{
                transform: active.scale === 1 ? undefined : `scale(${active.scale})`,
                transformOrigin: active.origin,
              }}
            >
              <Image
                src={product.image}
                alt={`${product.alt}, ${active.label.toLowerCase()}`}
                fill
                priority
                sizes="(max-width: 860px) 100vw, 50vw"
                className={
                  product.imageFit === "contain"
                    ? "object-contain mix-blend-multiply"
                    : "object-cover"
                }
              />
            </div>
          </div>
          <div className="stripe pointer-events-none absolute inset-y-0 right-0 w-[26px] opacity-90" />
          {"badge" in product && product.badge ? (
            <span className="absolute top-0 left-0 bg-accent px-3.5 py-2 text-xs font-extrabold tracking-[0.14em] text-white uppercase">
              {product.badge}
            </span>
          ) : null}
        </div>
      </div>

      <div>
        <div className="text-xs font-bold tracking-[0.16em] text-muted uppercase">
          {product.eyebrow}
        </div>
        <h1 className="cd product-title mt-2.5 mb-0">{product.name}</h1>
        <div className="mt-[18px] text-[28px] font-extrabold">
          {formatPrice(product.price)}
        </div>
        <p className="mt-4 mb-0 text-[17px] leading-[1.55] text-body">
          {product.description}
        </p>

        <div className="mt-8 text-[13px] font-extrabold tracking-[0.12em] uppercase">
          Colour — {product.colorName}
        </div>
        <div className="mt-3 flex gap-3">
          <button
            type="button"
            aria-label={product.colorName}
            aria-pressed="true"
            className="size-11 cursor-pointer rounded-full border-[3px] border-ink p-0 outline-2 outline-canvas outline-offset-[-6px]"
            style={{ background: product.swatch }}
          />
        </div>

        <div className="mt-7 flex justify-between text-[13px] font-extrabold tracking-[0.12em] uppercase">
          <span>Size</span>
          <button
            type="button"
            className="cursor-pointer border-0 bg-transparent p-0 font-extrabold tracking-[0.12em] uppercase underline"
            onClick={() => setGuideOpen(true)}
          >
            Size guide
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {sizeChart.map((row) => {
            const selected = size === row.size;
            return (
              <button
                key={row.size}
                type="button"
                aria-pressed={selected}
                onClick={() => setSize(row.size)}
                className={`min-h-12 min-w-14 cursor-pointer border-2 border-ink text-[15px] font-extrabold ${selected
                  ? "bg-ink text-paper"
                  : "bg-transparent text-ink hover:bg-ink hover:text-paper"
                  }`}
              >
                {row.size}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            add({ slug: product.slug, size });
            setAddedTick((tick) => tick + 1);
          }}
          className="mt-8 flex min-h-[60px] w-full cursor-pointer items-center justify-between border-0 bg-accent px-6 py-5 text-[15px] font-extrabold tracking-[0.14em] text-white uppercase"
        >
          <span>{added ? `Added — size ${size}` : "Add to bag"}</span>
          <ArrowIcon className="size-[22px]" />
        </button>

        <div className="stripe mt-8 h-4 w-[140px]" />
        <div className="mt-2">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex justify-between gap-4 border-b-2 border-ink py-4"
            >
              <span className="font-extrabold">{spec.label}</span>
              <span className="text-right text-body">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
      <SizeGuide
        open={guideOpen}
        onClose={() => setGuideOpen(false)}
        productName={product.name}
        category={product.category}
      />
    </section>
  );
}

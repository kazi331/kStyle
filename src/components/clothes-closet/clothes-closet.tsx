"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBag } from "@/components/bag";
import { ArrowIcon } from "@/components/icons";
import { SizeGuide } from "@/components/size-guide";
import { throwProductToCart } from "@/lib/throw-to-cart";
import {
  formatPrice,
  products as defaultCatalogProducts,
  sizeChart,
  specs,
  type Product,
} from "@/lib/catalog";
import { ClosetHanger, HangingVariantTags } from "./closet-hanger";
import {
  defaultVariantsMap,
  type ProductColorVariant,
} from "./closet-types";

export function ClothesCloset({
  products = defaultCatalogProducts,
  initialSlug,
  showGridToggle = true,
}: {
  products?: readonly Product[];
  initialSlug?: string;
  showGridToggle?: boolean;
}) {
  const initialIndex = initialSlug
    ? Math.max(
        0,
        products.findIndex((p) => p.slug === initialSlug),
      )
    : 0;

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<"browse" | "detail">("browse");
  const [viewSide, setViewSide] = useState<"front" | "back">("front");
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [guideOpen, setGuideOpen] = useState(false);
  const [addedTick, setAddedTick] = useState(0);
  const [activeVariants, setActiveVariants] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const p of products) {
      const vars = defaultVariantsMap[p.slug];
      if (vars && vars.length > 0) {
        map[p.slug] = vars[0].id;
      }
    }
    return map;
  });

  const { add } = useBag();
  const titleId = useId();
  const closetRef = useRef<HTMLDivElement>(null);
  const activeImageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // In browse mode, activeIndex determines the selected item facing forward
  const currentFocusedIndex = activeIndex;

  const activeProduct = products[currentFocusedIndex] ?? products[0];
  const activeVariantsList = defaultVariantsMap[activeProduct.slug] ?? [];
  const selectedVariantId =
    activeVariants[activeProduct.slug] ?? activeVariantsList[0]?.id ?? "";
  const selectedVariant =
    activeVariantsList.find((v) => v.id === selectedVariantId) ??
    activeVariantsList[0];

  const isDetail = mode === "detail";
  const added = addedTick > 0;

  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);
  if (prevActiveIndex !== activeIndex) {
    setPrevActiveIndex(activeIndex);
    setViewSide("front");
  }

  // Added tick timer
  useEffect(() => {
    if (addedTick === 0) return;
    const timeout = window.setTimeout(() => setAddedTick(0), 1600);
    return () => window.clearTimeout(timeout);
  }, [addedTick]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "Escape") {
        if (guideOpen) {
          setGuideOpen(false);
        } else if (mode === "detail") {
          setMode("browse");
        }
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => Math.min(products.length - 1, prev + 1));
      } else if (e.key === "Enter" && mode === "browse") {
        setMode("detail");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, guideOpen, products.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    touchStartX.current = null;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setActiveIndex((prev) => Math.min(products.length - 1, prev + 1));
      } else {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
    }
  };

  const handleSelectVariant = useCallback(
    (variant: ProductColorVariant) => {
      setActiveVariants((prev) => ({
        ...prev,
        [activeProduct.slug]: variant.id,
      }));
    },
    [activeProduct.slug],
  );

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      add({ slug: activeProduct.slug, size: selectedSize });
      setAddedTick((tick) => tick + 1);

      const sourceElement = activeImageRef.current || (e.currentTarget as HTMLElement);
      throwProductToCart({
        imageSrc: activeProduct.image,
        sourceElement,
      });
    },
    [add, activeProduct.slug, activeProduct.image, selectedSize],
  );

  // Calculate rail positions distributed nicely across the rail
  // e.g. for 4 products: slots spread across -420px to +420px on desktop
  const getProductSlotOffset = (index: number) => {
    const total = products.length;
    if (total <= 1) return 0;
    // Spread evenly across range [-390px, +390px]
    const step = 780 / (total - 1);
    return -390 + index * step;
  };

  return (
    <section
      ref={closetRef}
      id="closet"
      aria-labelledby={titleId}
      className="relative w-full overflow-hidden bg-canvas py-6 sm:py-10 select-none"
    >
      {/* Studio Lighting Radial Vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-radial from-white/80 via-canvas/90 to-canvas"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 sm:pb-6">
          <div className="flex items-center gap-3">
            {isDetail ? (
              <button
                type="button"
                onClick={() => setMode("browse")}
                aria-label="Back to clothing rail"
                className="group flex size-10 items-center justify-center rounded-full border border-ink/20 bg-white/90 text-ink shadow-sm backdrop-blur-sm transition-all hover:border-ink hover:bg-ink hover:text-white"
              >
                <svg
                  className="size-4.5 transition-transform group-hover:-translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
            ) : (
              <span className="flex size-2 rounded-full bg-accent animate-pulse" />
            )}
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-muted">
                {isDetail ? "Focus View" : "Closet Showroom"}
              </span>
              <h2
                id={titleId}
                className="cd text-lg sm:text-xl tracking-tight text-ink m-0"
              >
                {isDetail ? activeProduct.name : "Clothes Closet"}
              </h2>
            </div>
          </div>

          {/* Wordmark in Header */}
          <div className="flex items-center gap-4">
            <span className="cd text-base sm:text-lg tracking-[0.25em] text-ink font-black">
              KSTYLE
            </span>
            {showGridToggle && !isDetail && (
              <span className="hidden sm:inline-block text-xs font-bold tracking-widest text-muted uppercase">
                {String(currentFocusedIndex + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
              </span>
            )}
          </div>
        </div>

        {/* The Closet Showcase Stage */}
        <div
          className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex flex-col items-center justify-start pt-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* The Metal Hanging Rail */}
          <div
            className={`pointer-events-none relative w-full max-w-4xl z-10 transition-all duration-400 ${
              isDetail ? "opacity-0 invisible pointer-events-none" : "opacity-100 visible"
            }`}
          >
            {/* Left Bracket */}
            <div className="closet-rail-bracket absolute -left-3 top-[-3px] size-4 rounded-full" />

            {/* The Chrome Rod */}
            <div className="closet-rail-bar h-2.5 w-full rounded-full" />

            {/* Right Bracket */}
            <div className="closet-rail-bracket absolute -right-3 top-[-3px] size-4 rounded-full" />
          </div>

          {/* Floating Back Button (Mirroring reference video frame 10) */}
          {isDetail && (
            <button
              type="button"
              onClick={() => setMode("browse")}
              aria-label="Back to clothing collection"
              className="absolute left-2 sm:left-6 top-1/3 -translate-y-1/2 z-40 flex size-11 items-center justify-center rounded-full border border-ink/20 bg-white/90 text-ink shadow-md backdrop-blur-sm transition-all hover:bg-ink hover:text-white hover:scale-105 cursor-pointer"
            >
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Garments 3D Stage */}
          <div className="closet-rail-container relative w-full h-[370px] sm:h-[420px] lg:h-[450px] flex items-center justify-center">
            {products.map((product, index) => {
              const isCurrent = index === currentFocusedIndex;
              const slotX = getProductSlotOffset(index);

              // 3D positioning logic
              let transformStyle = "";
              let filterStyle = "blur(0px)";
              let opacityStyle = 1;
              let zIndex = 10;

              if (isDetail) {
                if (isCurrent) {
                  // Active item scales up to center stage
                  transformStyle =
                    "translate3d(0, 10px, 80px) scale(1.36) rotateY(0deg)";
                  opacityStyle = 1;
                  filterStyle = "blur(0px)";
                  zIndex = 30;
                } else {
                  // Surrounding items glide outwards towards screen edges and get depth-of-field blurred
                  const dir = index < currentFocusedIndex ? -1 : 1;
                  const dist = Math.abs(index - currentFocusedIndex);
                  const pushX = slotX + dir * (180 + dist * 50);
                  const rotY = dir * -52;
                  transformStyle = `translate3d(${pushX}px, 30px, -100px) scale(0.68) rotateY(${rotY}deg)`;
                  opacityStyle = 0.2;
                  filterStyle = "blur(8px)";
                  zIndex = 5 - dist;
                }
              } else {
                // In browse mode:
                // Garments hang firmly on the stand stick without popping or zooming on hover
                if (isCurrent) {
                  // Active item faces forward, firmly attached to rail
                  transformStyle = `translate3d(${slotX}px, 0, 0) scale(1) rotateY(0deg)`;
                  opacityStyle = 1;
                  zIndex = 25;
                } else {
                  // Angled on the rack, hook staying locked to the stand stick
                  const isLeft = index < currentFocusedIndex;
                  const rotY = isLeft ? 38 : -38;
                  transformStyle = `translate3d(${slotX}px, 0, 0) scale(1) rotateY(${rotY}deg)`;
                  opacityStyle = 0.85;
                  zIndex = 10 - Math.abs(index - currentFocusedIndex);
                }
              }

              return (
                <div
                  key={product.slug}
                  onMouseEnter={() => {
                    if (!isDetail) setHoveredIndex(index);
                  }}
                  onMouseLeave={() => {
                    if (!isDetail) setHoveredIndex(null);
                  }}
                  onClick={() => {
                    setActiveIndex(index);
                    if (isCurrent && !isDetail) {
                      setMode("detail");
                    }
                  }}
                  className={`closet-garment-card absolute top-[2px] w-[240px] sm:w-[290px] lg:w-[320px] transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isCurrent
                      ? isDetail
                        ? "cursor-default"
                        : "cursor-pointer"
                      : "cursor-pointer hover:opacity-100"
                  }`}
                  style={{
                    transform: transformStyle,
                    filter: filterStyle,
                    opacity: opacityStyle,
                    zIndex,
                  }}
                >
                  {/* Hanger Hook & Wooden Bar: hook top aligns over the rail */}
                  <div className="relative w-full z-20">
                    <ClosetHanger highlighted={isCurrent} />
                  </div>

                  {/* Garment Body (3D Flip for Front/Back) */}
                  <div
                    ref={isCurrent ? activeImageRef : undefined}
                    className="relative -mt-5 sm:-mt-7 aspect-[4/5] w-full"
                  >
                    <div
                      className="closet-flip-inner relative w-full h-full"
                      style={{
                        transform:
                          isCurrent && viewSide === "back"
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                      }}
                    >
                      {/* FRONT SIDE */}
                      <div className="closet-face-front absolute inset-0 flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.alt}
                          fill
                          sizes="(max-width: 860px) 280px, 340px"
                          priority={isCurrent}
                          className="pointer-events-none object-contain mix-blend-multiply drop-shadow-xl"
                          style={
                            product.imageFit !== "contain"
                              ? {
                                  maskImage:
                                    "radial-gradient(ellipse 75% 85% at 50% 48%, black 65%, transparent 100%)",
                                  WebkitMaskImage:
                                    "radial-gradient(ellipse 75% 85% at 50% 48%, black 65%, transparent 100%)",
                                }
                              : undefined
                          }
                        />
                      </div>

                      {/* BACK SIDE */}
                      <div className="closet-face-back absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={product.image}
                            alt={`${product.name} back view`}
                            fill
                            sizes="(max-width: 860px) 280px, 340px"
                            className="pointer-events-none object-contain mix-blend-multiply drop-shadow-xl"
                            style={{
                              transform: "scaleX(-1)",
                              filter: "contrast(1.04) brightness(0.96)",
                              ...(product.imageFit !== "contain"
                                ? {
                                    maskImage:
                                      "radial-gradient(ellipse 75% 85% at 50% 48%, black 65%, transparent 100%)",
                                    WebkitMaskImage:
                                      "radial-gradient(ellipse 75% 85% at 50% 48%, black 65%, transparent 100%)",
                                  }
                                : {}),
                            }}
                          />
                          {/* Rear collar & hood indicator badge */}
                          <div className="absolute top-10 left-1/2 -translate-x-1/2 rounded-full border border-ink/15 bg-white/80 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-muted backdrop-blur-xs">
                            Back Profile
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hanging Variant Tags (only on active garment) */}
                    {isCurrent && (
                      <HangingVariantTags
                        variants={activeVariantsList}
                        selectedVariantId={selectedVariantId}
                        onSelectVariant={handleSelectVariant}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Rail Navigation Controls */}
          {!isDetail && products.length > 1 && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none flex justify-between px-1 sm:px-4 z-20">
              <button
                type="button"
                onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentFocusedIndex === 0}
                aria-label="Previous garment on rack"
                className={`pointer-events-auto flex size-10 sm:size-11 items-center justify-center rounded-full border border-ink/20 bg-white/80 text-ink shadow-md backdrop-blur-sm transition-all hover:bg-ink hover:text-white ${
                  currentFocusedIndex === 0
                    ? "opacity-30 cursor-not-allowed hover:bg-white/80 hover:text-ink"
                    : "opacity-85 hover:opacity-100 hover:scale-105"
                }`}
              >
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) => Math.min(products.length - 1, prev + 1))
                }
                disabled={currentFocusedIndex === products.length - 1}
                aria-label="Next garment on rack"
                className={`pointer-events-auto flex size-10 sm:size-11 items-center justify-center rounded-full border border-ink/20 bg-white/80 text-ink shadow-md backdrop-blur-sm transition-all hover:bg-ink hover:text-white ${
                  currentFocusedIndex === products.length - 1
                    ? "opacity-30 cursor-not-allowed hover:bg-white/80 hover:text-ink"
                    : "opacity-85 hover:opacity-100 hover:scale-105"
                }`}
              >
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}

          {/* BROWSE MODE CONTROLS: Product summary & "SEE AVAILABILITY" button */}
          {!isDetail && (
            <div className="mt-2 flex flex-col items-center text-center transition-all duration-300">
              <div className="text-xs font-semibold tracking-wider text-muted uppercase">
                {activeProduct.eyebrow ?? "Winter collection"} ·{" "}
                <span className="text-ink font-bold">
                  {selectedVariant ? selectedVariant.name : activeProduct.colorName}
                </span>
              </div>
              <h3 className="cd mt-1 text-2xl sm:text-3xl font-black text-ink m-0">
                {activeProduct.name}
              </h3>
              <div className="mt-1 text-base font-extrabold text-ink">
                {formatPrice(activeProduct.price)}
              </div>

              {/* Signature "SEE AVAILABILITY" Pill Button */}
              <button
                type="button"
                onClick={() => setMode("detail")}
                className="mt-4 flex items-center gap-2 rounded-full border-2 border-ink/80 bg-white/80 px-7 py-2.5 text-xs font-black tracking-[0.16em] uppercase text-ink shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-ink hover:text-white"
              >
                <span>See availability</span>
                <svg
                  className="size-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* DETAIL MODE CONTROLS: Coordinated Product Information & Purchasing */}
        <div
          className={`transition-all duration-500 ease-out ${
            isDetail
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-6 pointer-events-none h-0 overflow-hidden"
          }`}
        >
          <div className="mx-auto max-w-xl border-t-2 border-ink/10 pt-6 sm:pt-8 text-center flex flex-col items-center">
            {/* Front / Back View Toggle Pill */}
            <div className="mb-4 inline-flex rounded-full border border-ink/20 bg-white/80 p-1 shadow-xs backdrop-blur-xs">
              <button
                type="button"
                aria-pressed={viewSide === "front"}
                onClick={() => setViewSide("front")}
                className={`rounded-full px-5 py-1.5 text-xs font-extrabold tracking-[0.14em] uppercase transition-all duration-200 ${
                  viewSide === "front"
                    ? "bg-ink text-paper shadow-xs"
                    : "bg-transparent text-muted hover:text-ink"
                }`}
              >
                Front
              </button>
              <button
                type="button"
                aria-pressed={viewSide === "back"}
                onClick={() => setViewSide("back")}
                className={`rounded-full px-5 py-1.5 text-xs font-extrabold tracking-[0.14em] uppercase transition-all duration-200 ${
                  viewSide === "back"
                    ? "bg-ink text-paper shadow-xs"
                    : "bg-transparent text-muted hover:text-ink"
                }`}
              >
                Back
              </button>
            </div>

            {/* Product Title & Brand */}
            <h1 className="cd text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight m-0 uppercase">
              {activeProduct.name}
            </h1>

            {/* Price & Delivery Badge */}
            <div className="mt-2.5 flex items-center justify-center gap-3">
              <span className="text-2xl sm:text-3xl font-black text-ink">
                {formatPrice(activeProduct.price)}
              </span>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-black tracking-wider text-accent uppercase">
                Free delivery over ৳5,000
              </span>
            </div>

            {/* Selected Color Variant Info */}
            <p className="mt-2 text-xs font-bold tracking-widest text-muted uppercase">
              Colour —{" "}
              <span className="text-ink font-black">
                {selectedVariant ? selectedVariant.name : activeProduct.colorName}
              </span>
            </p>

            {/* Size Selector */}
            <div className="mt-5 w-full max-w-md">
              <div className="flex items-center justify-between text-xs font-extrabold tracking-widest uppercase">
                <span>Select Size</span>
                <button
                  type="button"
                  onClick={() => setGuideOpen(true)}
                  className="cursor-pointer border-0 bg-transparent p-0 text-muted underline hover:text-accent font-extrabold"
                >
                  Size guide
                </button>
              </div>

              <div className="mt-2.5 flex justify-center gap-2 sm:gap-2.5">
                {sizeChart.map((row) => {
                  const isSelected = selectedSize === row.size;
                  return (
                    <button
                      key={row.size}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedSize(row.size)}
                      className={`min-h-11 min-w-12 sm:min-w-14 cursor-pointer rounded-lg border-2 text-sm font-black transition-all duration-200 ${
                        isSelected
                          ? "border-ink bg-ink text-paper scale-105 shadow-md"
                          : "border-ink/20 bg-white/70 text-ink hover:border-ink hover:bg-white"
                      }`}
                    >
                      {row.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Button: Add to Bag */}
            <div className="mt-6 w-full max-w-md flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="group relative flex min-h-[58px] w-full cursor-pointer items-center justify-between rounded-xl border-0 bg-accent px-6 py-4 text-sm font-extrabold tracking-[0.14em] text-white uppercase shadow-lg transition-all duration-300 hover:bg-accent/90 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>
                  {added ? `Added — size ${selectedSize} ✓` : "Add to bag"}
                </span>
                <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-between text-[11px] font-bold text-muted px-1">
                <span>✓ 7-day returns</span>
                <span>✓ 100% Genuine product</span>
                <Link
                  href={`/products/${activeProduct.slug}`}
                  className="underline hover:text-ink font-extrabold"
                >
                  Full product page →
                </Link>
              </div>
            </div>

            {/* Structured Specs */}
            <div className="mt-8 w-full max-w-md border-t border-ink/15 text-left text-xs">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between py-3 border-b border-ink/10"
                >
                  <span className="font-extrabold uppercase text-muted tracking-wider">
                    {spec.label}
                  </span>
                  <span className="font-bold text-ink">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Close / Return Button */}
            <button
              type="button"
              onClick={() => setMode("browse")}
              className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.16em] uppercase text-muted hover:text-ink transition-colors pb-4"
            >
              <span>← Return to clothing collection</span>
            </button>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuide
        open={guideOpen}
        onClose={() => setGuideOpen(false)}
        productName={activeProduct.name}
        category={activeProduct.category}
      />
    </section>
  );
}

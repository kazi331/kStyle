"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useBag } from "@/components/bag";
import { throwProductToCart } from "@/lib/throw-to-cart";
import type { Product } from "@/lib/catalog";

export function AddToCartButton({
  product,
  imageRef,
}: {
  product: Product;
  imageRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const { add } = useBag();
  const [added, setAdded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!added) return;
    const timeout = window.setTimeout(() => setAdded(false), 1200);
    return () => window.clearTimeout(timeout);
  }, [added]);

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      add({ slug: product.slug, size: "M" });
      setAdded(true);

      // Launch throw animation from product image or clicked button
      const sourceElement = imageRef?.current || buttonRef.current;
      throwProductToCart({
        imageSrc: product.image,
        sourceElement,
      });
    },
    [add, product, imageRef],
  );

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleAdd}
      className={`add-to-cart-btn flex cursor-pointer items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-all duration-300 ${
        added
          ? "border-accent bg-accent text-white"
          : "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper"
      }`}
    >
      {added ? (
        <>
          <svg
            className="size-3.5 add-check-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          Added
        </>
      ) : (
        <>
          <span className="text-sm leading-none">+</span>
          Add
        </>
      )}
    </button>
  );
}

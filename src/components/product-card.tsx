import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { formatPrice, type Product } from "@/lib/catalog";

export function ProductCard({
  product,
  numbered = false,
  morph = true,
}: {
  product: Product;
  numbered?: boolean;
  morph?: boolean;
}) {
  const photo = (
    <div className="absolute inset-0">
      <Image
        src={product.image}
        alt={product.alt}
        fill
        sizes="(max-width: 860px) 232px, 25vw"
        className={`transition-transform duration-500 group-hover:scale-105 ${product.imageFit === "contain"
            ? "object-contain mix-blend-multiply"
            : "object-cover"
          }`}
      />
    </div>
  );

  return (
    <Link href={`/products/${product.slug}`} prefetch={true} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-canvas">
        {morph ? (
          <ViewTransition
            name={`product-${product.slug}`}
            share="morph"
            default="none"
            exit="none"
            update="none"
          >
            {photo}
          </ViewTransition>
        ) : (
          photo
        )}
        {numbered ? (
          <span
            className={`cd pointer-events-none absolute top-1 left-2.5 text-[44px] min-[861px]:top-1.5 min-[861px]:left-3.5 min-[861px]:text-[56px] ${product.indexTone === "paper" ? "text-paper" : "text-ink"
              }`}
          >
            {product.index}
          </span>
        ) : null}
      </div>
      <div className="flex items-start justify-between gap-2 pt-3 text-[15px] font-bold min-[861px]:gap-3 min-[861px]:pt-3.5 min-[861px]:text-base">
        <span className="min-w-0 flex-1">{product.name}</span>
        <span className="shrink-0 text-steel">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}

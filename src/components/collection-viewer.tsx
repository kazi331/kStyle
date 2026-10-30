import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/catalog";

export function CollectionViewer({ items }: { items: Product[] }) {
  return (
    <section className="bg-ink px-4 py-12 text-paper min-[861px]:px-8 min-[861px]:py-[72px]">
      <div
        className={
          items.length === 1
            ? "grid w-full max-w-[320px] grid-cols-1"
            : "grid grid-cols-2 gap-x-3.5 gap-y-8 min-[861px]:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] min-[861px]:gap-5"
        }
      >
        {items.map((product) => (
          <ProductCard key={product.slug} product={product} numbered />
        ))}
      </div>
    </section>
  );
}

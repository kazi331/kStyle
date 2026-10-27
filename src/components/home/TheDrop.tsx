import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/catalog"

function TheDrop() {
    return (
        <section
            id="drop"
            className="scroll-mt-[calc(var(--header-height,5rem)+1.5rem)] bg-ink px-4 pt-12 pb-10 text-paper min-[861px]:px-8 min-[861px]:py-[88px]"
        >
            <div className="flex items-end justify-between gap-3 border-b-2 border-paper pb-3 min-[861px]:pb-4">
                <h2 className="cd display-xl m-0">The drop<span className="text-accent">.</span></h2>
                <span className="cd text-[28px] text-steel min-[861px]:text-[40px]">
                    (04)
                </span>
            </div>
            <div className="-mx-4 mt-0 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pt-5 pb-2 min-[861px]:mx-0 min-[861px]:mt-8 min-[861px]:grid min-[861px]:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] min-[861px]:gap-5 min-[861px]:overflow-visible min-[861px]:p-0">
                {products.map((product) => (
                    <div
                        key={product.slug}
                        className="w-[232px] shrink-0 snap-start min-[861px]:w-auto"
                    >
                        <ProductCard product={product} numbered />
                    </div>
                ))}
            </div>
            <p className="mt-2 text-[11px] font-bold tracking-[0.14em] text-steel uppercase min-[861px]:hidden">
                Swipe →
            </p>
        </section>
    )
}

export default TheDrop
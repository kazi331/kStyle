import { products } from "@/lib/catalog";
import Image from "next/image";
import Link from "next/link";

const graphic = products[3];
const textured = products[2];
const stripe = products[0];

function CategoryTile({
    href,
    image,
    alt,
    title,
    subtitle,
    className,
    titleClassName,
    captionClassName,
    imageClassName = "",
}: {
    href: string;
    image: string;
    alt: string;
    title: string;
    subtitle?: string;
    className?: string;
    titleClassName: string;
    captionClassName: string;
    imageClassName?: string;
}) {
    return (
        <Link href={href} className={`group relative block overflow-hidden ${className ?? ""}`}>
            <Image
                src={image}
                alt={alt}
                fill
                sizes="(max-width: 860px) 100vw, 40vw"
                className={`object-cover transition-transform duration-500 group-hover:scale-105 ${imageClassName}`}
            />
            <div
                className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-[rgba(11,12,14,0.85)] to-transparent text-white ${captionClassName}`}
            >
                <div className={`cd leading-[0.9] ${titleClassName}`}>{title}</div>
                {subtitle ? <div className="text-sm">{subtitle}</div> : null}
            </div>
        </Link>
    );
}

function ByType() {
    return (
        <section id="cats" className="scroll-mt-[calc(var(--header-height,5rem)+1.5rem)] px-4 pt-12 min-[861px]:px-8 min-[861px]:pt-[88px]">
            <h2 className="cd display-xl m-0 mb-5 min-[861px]:mb-7">
                Shop by <span className="text-accent">type</span>
            </h2>
            <div className="grid grid-cols-2 gap-2.5 min-[861px]:hidden">
                <CategoryTile
                    href="/collections/hoodies"
                    image={textured.image}
                    alt="Hoodies"
                    title="Hoodies"
                    className="col-span-2 h-[220px]"
                    titleClassName="text-[44px]"
                    captionClassName="px-3.5 pt-6 pb-3"
                />
                <CategoryTile
                    href="/collections/sweatshirts"
                    image={graphic.image}
                    alt="Sweatshirts"
                    title="Sweats"
                    className="h-[200px]"
                    titleClassName="text-[34px]"
                    captionClassName="px-3 pt-6 pb-2.5"
                />
                <Link
                    href="/collections/jackets"
                    className="relative block h-[200px] overflow-hidden bg-ink text-white"
                >
                    <div className="stripe-light absolute inset-0 opacity-[0.14]" />
                    <div className="absolute inset-x-0 bottom-0 z-10 px-3 py-2.5 text-white">
                        <div className="inline-block bg-accent px-2 py-[3px] text-[11px] font-extrabold tracking-[0.12em] uppercase">
                            Coming soon
                        </div>
                        <div className="cd mt-1.5 text-[34px] leading-[0.9]">Jackets</div>
                    </div>
                </Link>
            </div>
            <div className="hidden min-[861px]:grid min-[861px]:grid-cols-[1.3fr_1fr_1fr] min-[861px]:grid-rows-[340px_340px] min-[861px]:gap-4">
                <CategoryTile
                    href="/collections/hoodies"
                    image={textured.image}
                    alt="Hoodies"
                    title="Hoodies"
                    subtitle="Pullovers and zips"
                    className="row-span-2"
                    titleClassName="text-[56px]"
                    captionClassName="p-5"
                />
                <CategoryTile
                    href="/collections/sweatshirts"
                    image={graphic.image}
                    alt="Sweatshirts"
                    title="Sweatshirts"
                    subtitle="Relaxed fits, bold graphics"
                    className="col-span-2"
                    titleClassName="text-[56px]"
                    captionClassName="p-5"
                    imageClassName="object-[center_30%]"
                />
                <Link
                    href="/collections/jackets"
                    className="relative block overflow-hidden bg-ink text-white"
                >
                    <div className="stripe-light absolute inset-0 opacity-[0.14]" />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">
                        <div className="inline-block bg-accent px-2.5 py-1 text-xs font-extrabold tracking-[0.12em] uppercase">
                            Coming soon
                        </div>
                        <div className="cd mt-2 text-[56px] leading-[0.9]">Jackets</div>
                    </div>
                </Link>
                <Link
                    href="/collections/zips"
                    className="group relative block overflow-hidden bg-mist"
                >
                    <Image
                        src={stripe.image}
                        alt="Zip hoodies"
                        fill
                        sizes="30vw"
                        className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="cd absolute bottom-4 left-5 text-[56px] leading-[0.9]">
                        Zips
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default ByType
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { Newsletter } from "@/components/newsletter";
import { ProductCard } from "@/components/product-card";
import { SiteHeader } from "@/components/site-header";
import { Ticker } from "@/components/ticker";
import { formatPrice, products } from "@/lib/catalog";

const winterTicker =
  "Winter collection ✦ New drops ✦ Hoodies ✦ Jackets ✦ Sweatshirts ✦ Winter collection ✦ New drops ✦ Hoodies ✦ Jackets ✦ Sweatshirts ✦ ";

const accentTicker =
  "Modern styles ✦ Unique looks ✦ Premium grade ✦ Modern styles ✦ Unique looks ✦ Premium grade ✦ ";

const about = [
  {
    index: "01",
    title: "Premium grade",
    body: "Quality fabrics and finishing in every piece we stock.",
  },
  {
    index: "02",
    title: "Always current",
    body: "The most in-demand, latest styles, refreshed each season.",
  },
  {
    index: "03",
    title: "Your own look",
    body: "From clean essentials to loud graphics, pick a style that is yours.",
  },
];

const graphic = products[3];
const textured = products[2];
const stripe = products[0];

export function HomePage() {
  return (
    <div className="bg-canvas text-ink">
      <Ticker
        text={winterTicker}
        weight={700}
        className="bg-ink py-2.5 text-paper min-[861px]:py-[11px]"
        trackClassName="text-sm leading-none min-[861px]:text-[15px]"
        itemClassName="pr-[30px] min-[861px]:pr-10"
      />
      <SiteHeader />
      <main>
        <section className="relative px-4 pt-4 pb-10 min-[861px]:px-8 min-[861px]:pt-6 min-[861px]:pb-[72px]">
          <div className="flex justify-between text-[11px] font-bold tracking-[0.14em] text-muted uppercase min-[861px]:text-xs min-[861px]:tracking-[0.16em]">
            <span>FW—26 / Menswear</span>
            <span>Winter collection</span>
          </div>
          <h1 className="cd hero-title mt-2.5 mb-0 min-[861px]:mt-3 min-[861px]:mb-3">
            Dress for
            <br />
            the <span className="stroke-hero">cold</span>
            <span className="text-accent">.</span>
          </h1>
          <div className="mt-6 grid grid-cols-1 min-[861px]:-mt-6 min-[861px]:grid-cols-[minmax(0,3fr)_minmax(0,5fr)_minmax(0,3fr)] min-[861px]:items-start min-[861px]:gap-6">
            <div className="order-2 min-[861px]:order-1 min-[861px]:pt-16">
              <p className="mt-5 mb-0 text-base leading-[1.55] text-body min-[861px]:mt-0 min-[861px]:text-lg">
                Premium-grade hoodies, jackets and more. Modern cuts and unique
                looks for a generation that dresses to be seen.
              </p>
              <Link
                href="/#drop"
                className="mt-5 flex min-h-14 items-center justify-between bg-accent px-5 py-[18px] text-sm font-extrabold tracking-[0.12em] text-white uppercase min-[861px]:mt-7 min-[861px]:inline-flex min-[861px]:min-h-0 min-[861px]:justify-start min-[861px]:gap-3.5 min-[861px]:px-7"
              >
                Shop the drop
                <ArrowIcon className="size-5 min-[861px]:size-[18px]" />
              </Link>
            </div>
            <div className="relative order-1 min-[861px]:order-2">
              <Image
                src={graphic.image}
                alt="Model in a black Kstyle graphic sweatshirt"
                width={900}
                height={1125}
                priority
                className="block aspect-[4/5] w-full object-cover"
                sizes="(max-width: 860px) 100vw, 42vw"
              />
              <div className="stripe-light absolute inset-y-0 right-0 w-5 min-[861px]:w-7" />
              <div className="absolute bottom-0 left-0 bg-ink px-3 py-2.5 text-[11px] font-bold tracking-[0.12em] text-paper uppercase min-[861px]:px-4 min-[861px]:py-3 min-[861px]:text-xs">
                Graphic sweatshirt — {formatPrice(graphic.price)}
              </div>
            </div>
            <div className="hidden min-[861px]:order-3 min-[861px]:block min-[861px]:pt-[140px]">
              <Image
                src={textured.image}
                alt="Model in a black textured Kstyle hoodie"
                width={640}
                height={640}
                className="block aspect-square w-full border-[6px] border-canvas object-cover outline-2 outline-ink"
                sizes="25vw"
              />
              <div className="mt-3 text-xs font-bold tracking-[0.12em] text-muted uppercase">
                Textured hoodie — {formatPrice(textured.price)}
              </div>
            </div>
          </div>
        </section>

        <Ticker
          text={accentTicker}
          duration="36s"
          className="bg-accent py-3 text-ink min-[861px]:py-4"
          trackClassName="text-[32px] leading-none min-[861px]:text-[44px]"
          itemClassName="pr-6 min-[861px]:pr-[30px]"
        />

        <section
          id="drop"
          className="scroll-mt-6 bg-ink px-4 pt-12 pb-10 text-paper min-[861px]:px-8 min-[861px]:py-[88px]"
        >
          <div className="flex items-end justify-between gap-3 border-b-2 border-paper pb-3 min-[861px]:pb-4">
            <h2 className="cd display-xl m-0">The drop</h2>
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

        <section id="cats" className="scroll-mt-6 px-4 pt-12 min-[861px]:px-8 min-[861px]:pt-[88px]">
          <h2 className="cd display-xl m-0 mb-5 min-[861px]:mb-7">
            Shop by <span className="text-accent">type</span>
          </h2>
          <div className="grid grid-cols-2 gap-2.5 min-[861px]:hidden">
            <CategoryTile
              href={`/products/${textured.slug}`}
              image={textured.image}
              alt="Hoodies"
              title="Hoodies"
              className="col-span-2 h-[220px]"
              titleClassName="text-[44px]"
              captionClassName="px-3.5 pt-6 pb-3"
            />
            <CategoryTile
              href={`/products/${graphic.slug}`}
              image={graphic.image}
              alt="Sweatshirts"
              title="Sweats"
              className="h-[200px]"
              titleClassName="text-[34px]"
              captionClassName="px-3 pt-6 pb-2.5"
            />
            <Link
              href="/#cats"
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
              href={`/products/${textured.slug}`}
              image={textured.image}
              alt="Hoodies"
              title="Hoodies"
              subtitle="Pullovers and zips"
              className="row-span-2"
              titleClassName="text-[56px]"
              captionClassName="p-5"
            />
            <CategoryTile
              href={`/products/${graphic.slug}`}
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
              href="/#cats"
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
              href={`/products/${stripe.slug}`}
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

        <section
          id="about"
          className="scroll-mt-6 grid grid-cols-1 items-start px-4 py-12 min-[861px]:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] min-[861px]:gap-10 min-[861px]:px-8 min-[861px]:py-[88px]"
        >
          <div>
            <div className="stripe h-[22px] w-[120px] min-[861px]:h-7 min-[861px]:w-40" />
            <h2 className="cd display-about mt-4 mb-5 min-[861px]:mt-5 min-[861px]:mb-0">
              Made for a new generation
            </h2>
          </div>
          <div>
            {about.map((item, index) => (
              <div
                key={item.index}
                className={`flex gap-4 border-t-2 border-ink py-4 min-[861px]:gap-5 min-[861px]:py-5 ${
                  index === about.length - 1 ? "border-b-2" : ""
                }`}
              >
                <span className="cd text-[30px] text-accent min-[861px]:text-[32px]">
                  {item.index}
                </span>
                <div>
                  <div className="text-lg font-extrabold min-[861px]:text-xl">
                    {item.title}
                  </div>
                  <div className="mt-0.5 leading-normal text-body min-[861px]:mt-1 min-[861px]:leading-[1.55]">
                    {item.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="overflow-hidden bg-ink px-4 pt-10 text-paper min-[861px]:px-8 min-[861px]:pt-16">
        <div className="flex flex-col min-[861px]:flex-row min-[861px]:items-end min-[861px]:justify-between min-[861px]:gap-6">
          <div>
            <div className="cd text-[52px] leading-[0.9] min-[861px]:text-[48px]">
              First to know.
            </div>
            <p className="mt-2 mb-0 text-steel">
              Drops and offers, straight to your inbox.
            </p>
          </div>
          <Newsletter />
        </div>
        <div className="cd wordmark stroke-wordmark mt-9 min-[861px]:mt-10">Kstyle</div>
      </footer>
    </div>
  );
}

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

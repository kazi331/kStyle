import { ClothesCloset } from "@/components/clothes-closet/clothes-closet";
import Footer from "@/components/Footer";
import ByType from "@/components/home/ByType";
import MadeFor from "@/components/home/MadeFor";
import TheDrop from "@/components/home/TheDrop";
import { ArrowIcon } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { Ticker } from "@/components/ticker";
import { formatPrice, products } from "@/lib/catalog";
import Image from "next/image";
import Link from "next/link";

const winterTicker =
  "Winter collection ✦ New drops ✦ Hoodies ✦ Jackets ✦ Sweatshirts ✦ Winter collection ✦ New drops ✦ Hoodies ✦ Jackets ✦ Sweatshirts ✦ ";

const accentTicker =
  "Modern styles ✦ Unique looks ✦ Premium grade ✦ Modern styles ✦ Unique looks ✦ Premium grade ✦ ";


const graphic = products[3];
const textured = products[2];

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
          {/* Editorial Content & Fashion Showcase Cards */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-10 lg:grid-cols-12 lg:gap-8 lg:items-stretch">
            {/* Left Editorial Column */}
            <div className="flex flex-col justify-between lg:col-span-5 lg:pr-2">
              <div>
                <p className="m-0 text-base leading-[1.65] text-body sm:text-lg lg:text-xl font-medium">
                  Premium-grade hoodies, jackets and more. Modern cuts and unique
                  looks for a generation that dresses to be seen.
                </p>

                {/* Feature Spec Pills */}
                <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-extrabold uppercase tracking-wider text-muted sm:text-xs">
                  <span className="rounded-full border border-ink/20 bg-paper/80 px-3 py-1.5 shadow-xs">
                    ✦ Heavyweight Fleece
                  </span>
                  <span className="rounded-full border border-ink/20 bg-paper/80 px-3 py-1.5 shadow-xs">
                    ✦ Drop-Shoulder Cut
                  </span>
                  <span className="rounded-full border border-ink/20 bg-paper/80 px-3 py-1.5 shadow-xs">
                    ✦ Limited FW—26
                  </span>
                </div>

                {/* Dual Action Buttons */}
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/collections/winter"
                    className="flex min-h-13 items-center justify-between gap-3 bg-accent px-6 py-3.5 text-xs font-black tracking-[0.14em] text-white uppercase shadow-sm transition-all duration-300 hover:bg-accent/90 hover:scale-[1.02]"
                  >
                    <span>Shop the drop</span>
                    <ArrowIcon className="size-4" />
                  </Link>

                  <a
                    href="#closet"
                    className="flex min-h-13 items-center justify-between gap-3 border-2 border-ink bg-transparent px-6 py-3.5 text-xs font-black tracking-[0.14em] text-ink uppercase transition-all duration-300 hover:bg-ink hover:text-paper"
                  >
                    <span>Explore Closet</span>
                    <svg
                      className="size-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V11L3 17v2h18v-2l-7-6V9.5c1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4Z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quality & Collection Metrics */}
              <div className="mt-8 border-t-2 border-ink/15 pt-5 lg:mt-10">
                <div className="grid grid-cols-3 gap-2 text-ink">
                  <div className="flex flex-col items-start border-r border-ink/15 pr-2">
                    <span className="cd text-xl sm:text-2xl font-black">04</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted">
                      Drop Pieces
                    </span>
                  </div>
                  <div className="flex flex-col items-start border-r border-ink/15 px-2">
                    <span className="cd text-xl sm:text-2xl font-black">100%</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted">
                      Heavy Cotton
                    </span>
                  </div>
                  <div className="flex flex-col items-start pl-2">
                    <span className="cd text-xl sm:text-2xl font-black">FREE</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted">
                      Over ৳5,000
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Primary Hero Look Card */}
            <div className="lg:col-span-4">
              <Link
                href={`/products/${graphic.slug}`}
                className="group relative block aspect-[4/5] w-full overflow-hidden border-2 border-ink bg-canvas shadow-md transition-all duration-500 hover:shadow-xl"
              >
                <Image
                  src={graphic.image}
                  alt={graphic.alt}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 860px) 100vw, 35vw"
                />

                {/* Streetwear Tape Stripe */}
                <div className="stripe-light pointer-events-none absolute inset-y-0 right-0 w-6 opacity-90 transition-opacity group-hover:opacity-100" />

                {/* Look Badge */}
                <div className="absolute top-3 left-3 bg-accent px-3 py-1 text-[11px] font-black tracking-widest text-white uppercase shadow-sm">
                  Look 01 · Feature
                </div>

                {/* Bottom Drawer Overlay */}
                <div className="absolute inset-x-0 bottom-0 border-t-2 border-ink bg-ink/95 px-4 py-3.5 text-paper backdrop-blur-xs transition-colors group-hover:bg-ink">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-extrabold tracking-wide uppercase">
                        {graphic.name}
                      </div>
                      <div className="text-[11px] font-semibold tracking-wider text-steel uppercase">
                        {graphic.crumb} · {formatPrice(graphic.price)}
                      </div>
                    </div>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform group-hover:translate-x-1">
                      <ArrowIcon className="size-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Secondary Look Card */}
            <div className="lg:col-span-3">
              <Link
                href={`/products/${textured.slug}`}
                className="group relative flex h-full min-h-[340px] lg:min-h-0 flex-col justify-between overflow-hidden border-2 border-ink bg-canvas p-4 shadow-md transition-all duration-500 hover:shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-ink/20 pb-2.5">
                  <span className="rounded-full bg-ink px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-paper">
                    Look 02
                  </span>
                  <span className="text-xs font-black text-ink">
                    {formatPrice(textured.price)}
                  </span>
                </div>

                <div className="relative my-3 aspect-square w-full overflow-hidden border border-ink/15 bg-mist">
                  <Image
                    src={textured.image}
                    alt={textured.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    sizes="(max-width: 860px) 100vw, 25vw"
                  />
                  <div className="stripe pointer-events-none absolute inset-y-0 right-0 w-3 opacity-60" />
                </div>

                <div className="pt-1">
                  <div className="text-sm font-black text-ink uppercase tracking-wide group-hover:text-accent transition-colors">
                    {textured.name}
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs font-extrabold text-muted uppercase">
                    <span>{textured.category}</span>
                    <span className="flex items-center gap-1 text-ink group-hover:text-accent font-black">
                      View <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Clothes Closet Interactive Section */}
        <section id="closet" className="border-t-2 border-ink">
          <ClothesCloset products={products} showGridToggle={false} />
        </section>

        <Ticker
          text={accentTicker}
          duration="36s"
          className="bg-accent py-3 text-ink min-[861px]:py-4"
          trackClassName="text-[32px] leading-none min-[861px]:text-[44px]"
          itemClassName="pr-6 min-[861px]:pr-[30px]"
        />

        <TheDrop />
        <ByType />
        <MadeFor />
      </main>

      <Footer />
    </div>
  );
}


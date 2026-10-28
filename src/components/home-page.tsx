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
          <div className="mt-6 grid grid-cols-1 min-[861px]:-mt-6 min-[861px]:grid-cols-[minmax(0,3fr)_minmax(0,5fr)_minmax(0,3fr)] min-[861px]:items-start min-[861px]:gap-6">
            <div className="order-2 min-[861px]:order-1 min-[861px]:pt-16">
              <p className="mt-5 mb-0 text-base leading-[1.55] text-body min-[861px]:mt-0 min-[861px]:text-lg">
                Premium-grade hoodies, jackets and more. Modern cuts and unique
                looks for a generation that dresses to be seen.
              </p>
              <Link
                href="/collections/winter"
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


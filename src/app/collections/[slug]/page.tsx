import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { SiteHeader } from "@/components/site-header";
import {
  collectionProducts,
  collections,
  getCollection,
} from "@/lib/catalog";

type CollectionRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: CollectionRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);

  return {
    title: collection?.name ?? "Collection",
    description: collection?.description,
  };
}

export default function CollectionPage({ params }: CollectionRouteProps) {
  return (
    <div className="bg-canvas text-ink">
      <SiteHeader />
      <Suspense fallback={<div className="min-h-[70vh]" />}>
        <CollectionDetails params={params} />
      </Suspense>
    </div>
  );
}

async function CollectionDetails({ params }: CollectionRouteProps) {
  const { slug } = await params;
  const collection = getCollection(slug);

  if (!collection) notFound();

  const items = collectionProducts(collection);
  const count = String(items.length).padStart(2, "0");

  return (
    <main>
      <div className="px-4 pt-2 pb-10 min-[861px]:px-8 min-[861px]:pb-14">
        <p className="text-xs font-bold tracking-[0.14em] text-muted uppercase">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          {" / "}
          <span className="text-ink">{collection.name}</span>
        </p>
        <div className="mt-8 flex items-end justify-between gap-4 border-b-2 border-ink pb-4">
          <div>
            <div className="text-xs font-bold tracking-[0.16em] text-muted uppercase">
              {collection.eyebrow}
            </div>
            <h1 className="cd display-xl mt-2 mb-0">{collection.name}</h1>
          </div>
          <span className="cd text-[28px] text-muted min-[861px]:text-[40px]">
            ({count})
          </span>
        </div>
        <p className="mt-5 mb-0 max-w-xl text-[17px] leading-[1.55] text-body">
          {collection.description}
        </p>
        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-3" aria-label="Collections">
          {collections.map((item) => (
            <Link
              key={item.slug}
              href={`/collections/${item.slug}`}
              aria-current={item.slug === collection.slug ? "page" : undefined}
              className={`text-[13px] font-bold tracking-[0.1em] uppercase ${
                item.slug === collection.slug ? "text-accent" : "hover:text-accent"
              }`}
            >
              {item.navLabel}
            </Link>
          ))}
        </nav>
      </div>

      {collection.comingSoon ? (
        <section className="relative mx-4 mb-16 min-h-[420px] overflow-hidden bg-ink text-paper min-[861px]:mx-8">
          <div className="stripe-light absolute inset-0 opacity-[0.14]" />
          <div className="relative px-6 py-10 min-[861px]:px-10 min-[861px]:py-14">
            <div className="inline-block bg-accent px-2.5 py-1 text-xs font-extrabold tracking-[0.12em] text-white uppercase">
              Coming soon
            </div>
            <h2 className="cd mt-4 mb-0 text-[56px] leading-[0.9] min-[861px]:text-[84px]">
              Jackets
            </h2>
          </div>
        </section>
      ) : (
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
      )}
    </main>
  );
}

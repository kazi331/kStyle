import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { ProductPurchase } from "@/components/product-purchase";
import { SiteHeader } from "@/components/site-header";
import { collectionPath, getProduct, products } from "@/lib/catalog";

type ProductRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  return {
    title: product?.name ?? "Product",
    description: product?.description,
  };
}

export default function ProductPage({ params }: ProductRouteProps) {
  return (
    <div className="bg-canvas text-ink">
      <SiteHeader />
      <Suspense fallback={<div className="min-h-[70vh]" />}>
        <ProductDetails params={params} />
      </Suspense>
    </div>
  );
}

async function ProductDetails({ params }: ProductRouteProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const related = products.filter((item) => item.slug !== product.slug);

  return (
    <main>
      <p className="px-8 pt-2 pb-5 text-xs font-bold tracking-[0.14em] text-muted uppercase">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        {" / "}
        <Link href={collectionPath(product.category)} className="hover:text-accent">
          {product.category}
        </Link>
        {" / "}
        <span className="text-ink">{product.crumb}</span>
      </p>
      <ProductPurchase product={product} />
      <section className="bg-ink px-8 py-[72px] text-paper">
        <h2 className="cd related-title m-0 border-b-2 border-paper pb-4">
          More from the drop
        </h2>
        <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} morph />
          ))}
        </div>
      </section>
    </main>
  );
}

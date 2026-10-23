import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SizeGuide } from "@/components/size-guide";
import { getProduct, products } from "@/lib/catalog";

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
    title: product ? `Size guide · ${product.name}` : "Size guide",
  };
}

export default function SizeGuidePage({ params }: ProductRouteProps) {
  return (
    <Suspense fallback={<main className="min-h-screen bg-canvas" />}>
      <SizeGuideContent params={params} />
    </Suspense>
  );
}

async function SizeGuideContent({ params }: ProductRouteProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-canvas">
      <SizeGuide
        productName={product.name}
        category={product.category}
        closeHref={`/products/${product.slug}`}
      />
    </main>
  );
}

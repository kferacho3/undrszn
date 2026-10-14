import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { assetUrl, getAsset, getProductByHandle, products } from "@/data/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const p = getProductByHandle(handle);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.color}`,
    description: p.description,
    openGraph: { images: [{ url: assetUrl(getAsset(p.lead), 1200) }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}

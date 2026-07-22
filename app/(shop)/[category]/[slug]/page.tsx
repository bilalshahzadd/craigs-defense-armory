import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/queries";
import { ProductDetail } from "@/components/product/ProductDetail";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name.replace(/™/g, ""),
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const product = await getProduct(params.slug);
  if (!product || product.category !== params.category || !product.isActive) {
    notFound();
  }
  return <ProductDetail product={product} />;
}

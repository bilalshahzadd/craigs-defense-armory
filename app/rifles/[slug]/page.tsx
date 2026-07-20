import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getByCategory } from "@/lib/data";
import { ProductDetail } from "@/components/product/ProductDetail";

export function generateStaticParams() {
  return getByCategory("rifles").map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return { title: product.name.replace(/™/g, ""), description: product.tagline };
}

export default function RifleProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product || product.category !== "rifles") notFound();
  return <ProductDetail product={product} />;
}

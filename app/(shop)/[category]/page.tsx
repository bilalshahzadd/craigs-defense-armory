import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/queries";
import { ProductListing } from "@/components/product/ProductListing";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const cat = await getCategory(params.category);
  if (!cat) return {};
  return { title: cat.name, description: cat.blurb ?? undefined };
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const cat = await getCategory(params.category);
  if (!cat) notFound();
  return <ProductListing category={params.category} />;
}

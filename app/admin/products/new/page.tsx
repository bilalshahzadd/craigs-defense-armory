import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategories } from "@/lib/queries";
import { ProductForm } from "../ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest text-muted transition hover:text-copper"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to products
        </Link>
        <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-wide text-white">
          New Product
        </h1>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2, ExternalLink } from "lucide-react";
import { getCategories, getProductById } from "@/lib/queries";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { ProductForm } from "../ProductForm";
import { deleteProductAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);
  if (!product) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest text-muted transition hover:text-copper"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to products
          </Link>
          <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-wide text-white">
            {product.name}
          </h1>
          <Link
            href={`/${product.category}/${product.slug}`}
            target="_blank"
            className="mt-1 inline-flex items-center gap-1.5 text-xs text-copper hover:text-copper-bright"
          >
            View on store <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        <form action={deleteProductAction}>
          <input type="hidden" name="id" value={product.id} />
          <ConfirmButton
            message={`Delete "${product.name}"? This cannot be undone.`}
            className="inline-flex h-10 items-center gap-2 border border-red-500/40 px-4 font-display text-xs uppercase tracking-widest text-red-400 transition hover:bg-red-500/10"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </ConfirmButton>
        </form>
      </div>

      <ProductForm product={product} categories={categories} />
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { getAllProducts } from "@/lib/queries";
import { formatPrice, cn } from "@/lib/utils";
import { updateStockAction, toggleActiveAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
            Products
          </h1>
          <p className="mt-1 text-sm text-muted">
            {products.length} product{products.length === 1 ? "" : "s"} · edit
            stock inline or open a product to edit everything.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center gap-2 bg-copper px-6 font-display text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-copper-bright clip-slant-br"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      <div className="overflow-x-auto border border-white/10 bg-ink-800">
        <table className="w-full min-w-[880px] text-left">
          <thead className="border-b border-white/10 bg-ink-700">
            <tr className="font-display text-[11px] uppercase tracking-widest2 text-muted">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-14 shrink-0 overflow-hidden bg-ink-600">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm uppercase tracking-wide text-white">
                        {p.name}
                      </p>
                      <p className="truncate text-xs text-muted">/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-light">
                  {p.categoryLabel}
                </td>
                <td className="px-4 py-3 font-display text-sm text-white">
                  {formatPrice(p.price)}
                </td>
                <td className="px-4 py-3">
                  <form action={updateStockAction} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={p.id} />
                    <input
                      name="stock"
                      type="number"
                      min={0}
                      defaultValue={p.stock}
                      className={cn(
                        "h-9 w-20 border bg-ink-600 px-2 text-sm text-white outline-none focus:border-copper",
                        p.stock === 0
                          ? "border-red-500/50"
                          : p.stock <= 5
                            ? "border-amber-500/50"
                            : "border-white/15"
                      )}
                    />
                    <button className="h-9 border border-white/15 px-3 font-display text-[11px] uppercase tracking-widest text-muted-light transition hover:border-copper hover:text-copper">
                      Save
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <form action={toggleActiveAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <input
                      type="hidden"
                      name="is_active"
                      value={(!p.isActive).toString()}
                    />
                    <button
                      className={cn(
                        "h-8 px-3 font-display text-[11px] uppercase tracking-widest transition",
                        p.isActive
                          ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
                          : "bg-white/5 text-muted hover:bg-white/10"
                      )}
                    >
                      {p.isActive ? "Live" : "Hidden"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-widest text-copper hover:text-copper-bright"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-muted">
            No products yet — add your first one.
          </p>
        )}
      </div>
    </div>
  );
}

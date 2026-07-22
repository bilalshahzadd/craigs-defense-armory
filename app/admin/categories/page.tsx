import { Plus, Trash2, Save } from "lucide-react";
import { getCategories } from "@/lib/queries";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { saveCategory, deleteCategoryAction } from "../actions";

export const dynamic = "force-dynamic";

const input =
  "h-11 w-full border border-white/15 bg-ink-600 px-3 text-sm text-white outline-none transition focus:border-copper placeholder:text-muted";
const label =
  "mb-1.5 block font-display text-[11px] uppercase tracking-widest2 text-muted";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
          Categories
        </h1>
        <p className="mt-1 text-sm text-muted">
          Each category becomes a storefront page at <code>/slug</code> and shows
          up in the homepage cards.
        </p>
      </div>

      {/* Existing */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {categories.map((c) => (
          <div key={c.id} className="border border-white/10 bg-ink-800 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
                {c.name}
                <span className="ml-2 text-xs font-normal text-muted">
                  {c.productCount ?? 0} product
                  {c.productCount === 1 ? "" : "s"}
                </span>
              </h2>
              <form action={deleteCategoryAction}>
                <input type="hidden" name="id" value={c.id} />
                <ConfirmButton
                  message={`Delete category "${c.name}"? Products in it will stay in the database but won't have a category page.`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-red-400 transition hover:text-red-300"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </ConfirmButton>
              </form>
            </div>

            <form action={saveCategory} className="space-y-4">
              <input type="hidden" name="id" value={c.id} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={label}>Name</label>
                  <input name="name" defaultValue={c.name} required className={input} />
                </div>
                <div>
                  <label className={label}>Slug</label>
                  <input name="slug" defaultValue={c.slug} className={input} />
                </div>
              </div>
              <div>
                <label className={label}>Blurb</label>
                <textarea
                  name="blurb"
                  rows={2}
                  defaultValue={c.blurb ?? ""}
                  className="w-full border border-white/15 bg-ink-600 p-3 text-sm text-white outline-none focus:border-copper"
                />
              </div>
              <div>
                <label className={label}>Banner image</label>
                <ImageUpload defaultValue={c.image ?? ""} />
              </div>
              <div className="flex items-end justify-between gap-4">
                <div className="w-32">
                  <label className={label}>Sort order</label>
                  <input
                    name="sort_order"
                    type="number"
                    defaultValue={c.sortOrder}
                    className={input}
                  />
                </div>
                <button className="inline-flex h-11 items-center gap-2 bg-copper px-6 font-display text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-copper-bright clip-slant-br">
                  <Save className="h-4 w-4" /> Save
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>

      {/* Add new */}
      <div className="border border-dashed border-white/20 bg-ink-800/50 p-5">
        <h2 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-widest text-copper">
          <Plus className="h-4 w-4" /> Add Category
        </h2>
        <form action={saveCategory} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className={label}>Name *</label>
              <input name="name" required placeholder="Optics" className={input} />
            </div>
            <div>
              <label className={label}>Slug</label>
              <input name="slug" placeholder="optics" className={input} />
            </div>
            <div>
              <label className={label}>Sort order</label>
              <input
                name="sort_order"
                type="number"
                defaultValue={categories.length + 1}
                className={input}
              />
            </div>
          </div>
          <div>
            <label className={label}>Blurb</label>
            <textarea
              name="blurb"
              rows={2}
              placeholder="Short description shown on the category page."
              className="w-full border border-white/15 bg-ink-600 p-3 text-sm text-white outline-none focus:border-copper"
            />
          </div>
          <div>
            <label className={label}>Banner image</label>
            <ImageUpload />
          </div>
          <button className="inline-flex h-11 items-center gap-2 bg-copper px-6 font-display text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-copper-bright clip-slant-br">
            <Plus className="h-4 w-4" /> Create Category
          </button>
        </form>
      </div>
    </div>
  );
}

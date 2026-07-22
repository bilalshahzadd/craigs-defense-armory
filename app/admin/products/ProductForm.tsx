"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { LoaderCircle, Save } from "lucide-react";
import type { Category, Product } from "@/lib/types";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { slugify } from "@/lib/utils";
import { saveProduct } from "../actions";

const input =
  "h-11 w-full border border-white/15 bg-ink-600 px-3 text-sm text-white outline-none transition focus:border-copper placeholder:text-muted";
const label =
  "mb-1.5 block font-display text-[11px] uppercase tracking-widest2 text-muted";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center gap-2 bg-copper px-7 font-display text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-copper-bright clip-slant-br disabled:opacity-60"
    >
      {pending ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" /> Saving…
        </>
      ) : (
        <>
          <Save className="h-4 w-4" /> Save Product
        </>
      )}
    </button>
  );
}

export function ProductForm({
  product,
  categories,
}: {
  product?: Product;
  categories: Category[];
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");

  const specText =
    product?.specGroups
      .map((g) => [g.title, ...g.items.map((i) => `- ${i}`)].join("\n"))
      .join("\n\n") ?? "";

  return (
    <form action={saveProduct} className="space-y-8">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-5 lg:col-span-2">
          <div className="border border-white/10 bg-ink-800 p-5">
            <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-white">
              Basics
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={label}>Product name *</label>
                <input
                  name="name"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!product) setSlug(slugify(e.target.value));
                  }}
                  placeholder="Model 1™ Rifle"
                  className={input}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={label}>URL slug</label>
                <input
                  name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="model-1-rifle"
                  className={input}
                />
                <p className="mt-1 text-xs text-muted">
                  Public URL: /{"{category}"}/{slug || "your-slug"}
                </p>
              </div>

              <div>
                <label className={label}>Category *</label>
                <select
                  name="category_slug"
                  required
                  defaultValue={product?.category ?? categories[0]?.slug}
                  className={input}
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={label}>Display label</label>
                <input
                  name="category_label"
                  defaultValue={product?.categoryLabel ?? ""}
                  placeholder="Rifles / Accessories / Apparel"
                  className={input}
                />
              </div>

              <div>
                <label className={label}>Type</label>
                <select
                  name="kind"
                  defaultValue={product?.kind ?? "accessory"}
                  className={input}
                >
                  <option value="firearm">Firearm</option>
                  <option value="accessory">Accessory</option>
                  <option value="apparel">Apparel</option>
                </select>
              </div>

              <div>
                <label className={label}>Badge</label>
                <input
                  name="badge"
                  defaultValue={product?.badge ?? ""}
                  placeholder="New / Best Seller"
                  className={input}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={label}>Tagline</label>
                <input
                  name="tagline"
                  defaultValue={product?.tagline ?? ""}
                  placeholder="The flagship. Hand-built and guaranteed for life."
                  className={input}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={label}>Description</label>
                <textarea
                  name="description"
                  rows={5}
                  defaultValue={product?.description ?? ""}
                  placeholder="Long-form product description shown on the spec sheet."
                  className="w-full border border-white/15 bg-ink-600 p-3 text-sm text-white outline-none transition focus:border-copper placeholder:text-muted"
                />
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-ink-800 p-5">
            <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-white">
              Specifications
            </h2>
            <label className={label}>
              Spec groups — title on its own line, items starting with “-”
            </label>
            <textarea
              name="spec_groups"
              rows={12}
              defaultValue={specText}
              placeholder={
                "Rifle Specifications\n- Designed & manufactured in the USA\n- Guaranteed for life\n\nUpper Receiver\n- Billet machined 7075-T6"
              }
              className="w-full border border-white/15 bg-ink-600 p-3 font-mono text-xs leading-relaxed text-white outline-none transition focus:border-copper placeholder:text-muted"
            />
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-5">
          <div className="border border-white/10 bg-ink-800 p-5">
            <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-white">
              Image
            </h2>
            <ImageUpload defaultValue={product?.image ?? ""} />
          </div>

          <div className="border border-white/10 bg-ink-800 p-5">
            <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-white">
              Pricing &amp; Stock
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={label}>Price (USD) *</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  min={0}
                  required
                  defaultValue={product?.price ?? 0}
                  className={input}
                />
              </div>
              <div>
                <label className={label}>Stock *</label>
                <input
                  name="stock"
                  type="number"
                  min={0}
                  required
                  defaultValue={product?.stock ?? 0}
                  className={input}
                />
              </div>
              <div className="col-span-2">
                <label className={label}>Lead time</label>
                <input
                  name="lead_time"
                  defaultValue={product?.leadTime ?? ""}
                  placeholder="30 Business Days"
                  className={input}
                />
              </div>
              <div className="col-span-2">
                <label className={label}>Finishes / colors</label>
                <input
                  name="colors"
                  defaultValue={product?.colors.join(", ") ?? ""}
                  placeholder="Black, FDE, Bronze"
                  className={input}
                />
                <p className="mt-1 text-xs text-muted">Comma separated</p>
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="is_active"
                defaultChecked={product?.isActive ?? true}
                className="h-4 w-4 accent-[#B4703F]"
              />
              <span className="font-display text-xs uppercase tracking-widest text-muted-light">
                Visible on storefront
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SaveButton />
        <Link
          href="/admin/products"
          className="font-display text-sm uppercase tracking-widest text-muted transition hover:text-white"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

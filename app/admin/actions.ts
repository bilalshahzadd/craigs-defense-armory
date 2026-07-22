"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as q from "@/lib/queries";
import type { SpecGroup } from "@/lib/types";
import { slugify } from "@/lib/utils";

/* ----------------------------- helpers ----------------------------- */

function parseColors(raw: string): string[] {
  return raw
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
}

/**
 * Spec groups are edited as plain text:
 *
 *   Rifle Specifications
 *   - Designed in the USA
 *   - Guaranteed for life
 *
 *   Upper Receiver
 *   - Billet machined 7075-T6
 */
function parseSpecGroups(raw: string): SpecGroup[] {
  const blocks = raw.split(/\n\s*\n/);
  const groups: SpecGroup[] = [];

  for (const block of blocks) {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) continue;

    const isBullet = (l: string) => /^[-•▷*]\s*/.test(l);
    const titleLine = lines.find((l) => !isBullet(l));
    const items = lines
      .filter(isBullet)
      .map((l) => l.replace(/^[-•▷*]\s*/, "").trim())
      .filter(Boolean);

    if (titleLine && items.length) groups.push({ title: titleLine, items });
  }
  return groups;
}

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}
function num(fd: FormData, key: string): number {
  const n = Number(fd.get(key));
  return Number.isFinite(n) ? n : 0;
}
function bool(fd: FormData, key: string): boolean {
  return fd.get(key) === "on" || fd.get(key) === "true";
}

function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
}

/* ----------------------------- products ---------------------------- */

export async function saveProduct(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  const name = str(formData, "name");
  const slug = slugify(str(formData, "slug") || name);

  const input: q.ProductInput = {
    slug,
    name,
    category_slug: str(formData, "category_slug"),
    category_label: str(formData, "category_label") || str(formData, "category_slug"),
    kind: str(formData, "kind") || "accessory",
    price: num(formData, "price"),
    image_url: str(formData, "image_url") || "/images/rifle-black.png",
    tagline: str(formData, "tagline"),
    description: str(formData, "description"),
    badge: str(formData, "badge") || null,
    lead_time: str(formData, "lead_time") || null,
    colors: parseColors(str(formData, "colors")),
    spec_groups: parseSpecGroups(str(formData, "spec_groups")),
    stock: num(formData, "stock"),
    is_active: bool(formData, "is_active"),
  };

  if (id > 0) {
    await q.updateProduct(id, input);
  } else {
    await q.createProduct(input);
  }

  refresh();
  redirect("/admin/products");
}

export async function deleteProductAction(formData: FormData) {
  await q.deleteProduct(Number(formData.get("id")));
  refresh();
  redirect("/admin/products");
}

export async function updateStockAction(formData: FormData) {
  await q.setStock(Number(formData.get("id")), Number(formData.get("stock")));
  refresh();
}

export async function toggleActiveAction(formData: FormData) {
  await q.toggleActive(
    Number(formData.get("id")),
    formData.get("is_active") === "true"
  );
  refresh();
}

/* ---------------------------- categories --------------------------- */

export async function saveCategory(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  const name = str(formData, "name");
  const payload = {
    slug: slugify(str(formData, "slug") || name),
    name,
    blurb: str(formData, "blurb"),
    image_url: str(formData, "image_url") || "/images/rifle-black.png",
    sort_order: num(formData, "sort_order"),
  };

  if (id > 0) await q.updateCategory(id, payload);
  else await q.createCategory(payload);

  refresh();
  redirect("/admin/categories");
}

export async function deleteCategoryAction(formData: FormData) {
  await q.deleteCategory(Number(formData.get("id")));
  refresh();
  redirect("/admin/categories");
}

/* ------------------------------ orders ----------------------------- */

export async function setOrderStatus(formData: FormData) {
  await q.updateOrderStatus(
    Number(formData.get("id")),
    String(formData.get("status"))
  );
  refresh();
}

import { sql, LOW_STOCK_THRESHOLD } from "./db";
import type {
  Category,
  DashboardStats,
  Order,
  OrderItem,
  Product,
  SpecGroup,
} from "./types";

/* ------------------------------------------------------------------ */
/*  Row mappers                                                        */
/* ------------------------------------------------------------------ */
type Row = Record<string, unknown>;

function toProduct(r: Row): Product {
  return {
    id: Number(r.id),
    slug: String(r.slug),
    name: String(r.name),
    category: String(r.category_slug),
    categoryLabel: (r.category_label as string) ?? "",
    kind: (r.kind as Product["kind"]) ?? "accessory",
    price: Number(r.price),
    image: (r.image_url as string) ?? "/images/rifle-black.png",
    tagline: (r.tagline as string) ?? "",
    badge: (r.badge as string) ?? null,
    leadTime: (r.lead_time as string) ?? null,
    colors: (r.colors as string[]) ?? [],
    description: (r.description as string) ?? null,
    specGroups: (r.spec_groups as SpecGroup[]) ?? [],
    stock: Number(r.stock ?? 0),
    isActive: Boolean(r.is_active),
    sortOrder: Number(r.sort_order ?? 0),
  };
}

function toCategory(r: Row): Category {
  return {
    id: Number(r.id),
    slug: String(r.slug),
    name: String(r.name),
    blurb: (r.blurb as string) ?? null,
    image: (r.image_url as string) ?? null,
    sortOrder: Number(r.sort_order ?? 0),
    productCount:
      r.product_count !== undefined ? Number(r.product_count) : undefined,
  };
}

function toOrder(r: Row): Order {
  return {
    id: Number(r.id),
    orderNumber: String(r.order_number),
    customerName: (r.customer_name as string) ?? null,
    customerEmail: (r.customer_email as string) ?? null,
    status: (r.status as Order["status"]) ?? "pending",
    subtotal: Number(r.subtotal ?? 0),
    items: (r.items as OrderItem[]) ?? [],
    createdAt: new Date(r.created_at as string).toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/*  Storefront                                                         */
/* ------------------------------------------------------------------ */
export async function getCategories(): Promise<Category[]> {
  const rows = await sql`
    select c.*, (
      select count(*)::int from products p
      where p.category_slug = c.slug and p.is_active = true
    ) as product_count
    from categories c
    order by c.sort_order asc, c.name asc`;
  return rows.map(toCategory);
}

export async function getCategory(slug: string): Promise<Category | null> {
  const rows = await sql`select * from categories where slug = ${slug} limit 1`;
  return rows.length ? toCategory(rows[0]) : null;
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const rows = await sql`
    select * from products
    where category_slug = ${categorySlug} and is_active = true
    order by sort_order asc, id asc`;
  return rows.map(toProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const rows = await sql`select * from products where slug = ${slug} limit 1`;
  return rows.length ? toProduct(rows[0]) : null;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const rows = await sql`
    select * from products
    where is_active = true
    order by (badge is null) asc, sort_order asc
    limit ${limit}`;
  return rows.map(toProduct);
}

export async function getRelatedProducts(
  categorySlug: string,
  excludeSlug: string,
  limit = 4
): Promise<Product[]> {
  const rows = await sql`
    select * from products
    where category_slug = ${categorySlug}
      and slug <> ${excludeSlug}
      and is_active = true
    order by sort_order asc
    limit ${limit}`;
  return rows.map(toProduct);
}

/* ------------------------------------------------------------------ */
/*  Admin — products                                                   */
/* ------------------------------------------------------------------ */
export async function getAllProducts(): Promise<Product[]> {
  const rows = await sql`select * from products order by sort_order asc, id asc`;
  return rows.map(toProduct);
}

export async function getProductById(id: number): Promise<Product | null> {
  const rows = await sql`select * from products where id = ${id} limit 1`;
  return rows.length ? toProduct(rows[0]) : null;
}

export interface ProductInput {
  slug: string;
  name: string;
  category_slug: string;
  category_label: string;
  kind: string;
  price: number;
  image_url: string;
  tagline: string;
  description: string;
  badge: string | null;
  lead_time: string | null;
  colors: string[];
  spec_groups: SpecGroup[];
  stock: number;
  is_active: boolean;
}

export async function createProduct(p: ProductInput) {
  await sql`
    insert into products (
      slug, name, category_slug, category_label, kind, price, image_url,
      tagline, description, badge, lead_time, colors, spec_groups, stock, is_active
    ) values (
      ${p.slug}, ${p.name}, ${p.category_slug}, ${p.category_label}, ${p.kind},
      ${p.price}, ${p.image_url}, ${p.tagline}, ${p.description}, ${p.badge},
      ${p.lead_time}, ${JSON.stringify(p.colors)}::jsonb,
      ${JSON.stringify(p.spec_groups)}::jsonb, ${p.stock}, ${p.is_active}
    )`;
}

export async function updateProduct(id: number, p: ProductInput) {
  await sql`
    update products set
      slug = ${p.slug},
      name = ${p.name},
      category_slug = ${p.category_slug},
      category_label = ${p.category_label},
      kind = ${p.kind},
      price = ${p.price},
      image_url = ${p.image_url},
      tagline = ${p.tagline},
      description = ${p.description},
      badge = ${p.badge},
      lead_time = ${p.lead_time},
      colors = ${JSON.stringify(p.colors)}::jsonb,
      spec_groups = ${JSON.stringify(p.spec_groups)}::jsonb,
      stock = ${p.stock},
      is_active = ${p.is_active},
      updated_at = now()
    where id = ${id}`;
}

export async function deleteProduct(id: number) {
  await sql`delete from products where id = ${id}`;
}

export async function setStock(id: number, stock: number) {
  await sql`update products set stock = ${stock}, updated_at = now() where id = ${id}`;
}

export async function toggleActive(id: number, isActive: boolean) {
  await sql`update products set is_active = ${isActive}, updated_at = now() where id = ${id}`;
}

/** Reduce stock when an order is placed (never below zero). */
export async function decrementStock(slug: string, qty: number) {
  await sql`
    update products
    set stock = greatest(0, stock - ${qty}), updated_at = now()
    where slug = ${slug}`;
}

/* ------------------------------------------------------------------ */
/*  Admin — categories                                                 */
/* ------------------------------------------------------------------ */
export async function createCategory(c: {
  slug: string;
  name: string;
  blurb: string;
  image_url: string;
  sort_order: number;
}) {
  await sql`
    insert into categories (slug, name, blurb, image_url, sort_order)
    values (${c.slug}, ${c.name}, ${c.blurb}, ${c.image_url}, ${c.sort_order})`;
}

export async function updateCategory(
  id: number,
  c: { slug: string; name: string; blurb: string; image_url: string; sort_order: number }
) {
  await sql`
    update categories set
      slug = ${c.slug}, name = ${c.name}, blurb = ${c.blurb},
      image_url = ${c.image_url}, sort_order = ${c.sort_order}
    where id = ${id}`;
}

export async function deleteCategory(id: number) {
  await sql`delete from categories where id = ${id}`;
}

/* ------------------------------------------------------------------ */
/*  Admin — orders                                                     */
/* ------------------------------------------------------------------ */
export async function getOrders(): Promise<Order[]> {
  const rows = await sql`select * from orders order by created_at desc limit 200`;
  return rows.map(toOrder);
}

export async function updateOrderStatus(id: number, status: string) {
  await sql`update orders set status = ${status} where id = ${id}`;
}

export async function createOrder(o: {
  customer_name: string;
  customer_email: string;
  subtotal: number;
  items: OrderItem[];
}) {
  const orderNumber = `CDA-${Date.now().toString(36).toUpperCase()}`;
  await sql`
    insert into orders (order_number, customer_name, customer_email, subtotal, items)
    values (${orderNumber}, ${o.customer_name}, ${o.customer_email}, ${o.subtotal},
            ${JSON.stringify(o.items)}::jsonb)`;
  return orderNumber;
}

/* ------------------------------------------------------------------ */
/*  Admin — dashboard                                                  */
/* ------------------------------------------------------------------ */
export async function getDashboardStats(): Promise<DashboardStats> {
  const [p] = await sql`
    select
      count(*)::int as total,
      count(*) filter (where is_active)::int as active,
      count(*) filter (where stock = 0)::int as out_of_stock,
      count(*) filter (where stock > 0 and stock <= ${LOW_STOCK_THRESHOLD})::int as low_stock,
      coalesce(sum(price * stock), 0)::float as inventory_value
    from products`;
  const [c] = await sql`select count(*)::int as total from categories`;
  const [o] = await sql`
    select
      count(*)::int as total,
      count(*) filter (where status = 'pending')::int as pending,
      coalesce(sum(subtotal) filter (where status <> 'cancelled'), 0)::float as revenue
    from orders`;

  return {
    totalProducts: Number(p.total),
    activeProducts: Number(p.active),
    outOfStock: Number(p.out_of_stock),
    lowStock: Number(p.low_stock),
    totalCategories: Number(c.total),
    totalOrders: Number(o.total),
    pendingOrders: Number(o.pending),
    revenue: Number(o.revenue),
    inventoryValue: Number(p.inventory_value),
  };
}

export async function getLowStockProducts(): Promise<Product[]> {
  const rows = await sql`
    select * from products
    where stock <= ${LOW_STOCK_THRESHOLD}
    order by stock asc
    limit 8`;
  return rows.map(toProduct);
}

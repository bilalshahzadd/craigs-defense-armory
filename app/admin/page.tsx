import Link from "next/link";
import Image from "next/image";
import {
  Package,
  AlertTriangle,
  XCircle,
  FolderTree,
  ReceiptText,
  Boxes,
  Plus,
  ArrowRight,
} from "lucide-react";
import { getDashboardStats, getLowStockProducts } from "@/lib/queries";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

function Stat({
  Icon,
  label,
  value,
  tone = "default",
  href,
}: {
  Icon: typeof Package;
  label: string;
  value: string | number;
  tone?: "default" | "warn" | "danger" | "good";
  href?: string;
}) {
  const toneClass = {
    default: "text-copper",
    warn: "text-amber-400",
    danger: "text-red-400",
    good: "text-emerald-400",
  }[tone];

  const body = (
    <div className="border border-white/10 bg-ink-800 p-5 transition-colors hover:border-copper/40">
      <div className="flex items-center justify-between">
        <span className="font-display text-[11px] uppercase tracking-widest2 text-muted">
          {label}
        </span>
        <Icon className={`h-4 w-4 ${toneClass}`} />
      </div>
      <p className="mt-3 font-display text-3xl font-bold text-white">{value}</p>
    </div>
  );

  return href ? <Link href={href}>{body}</Link> : body;
}

export default async function AdminDashboard() {
  const [stats, lowStock] = await Promise.all([
    getDashboardStats(),
    getLowStockProducts(),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted">
            Overview of your store inventory and orders.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center gap-2 bg-copper px-6 font-display text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-copper-bright clip-slant-br"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat Icon={Package} label="Products" value={stats.totalProducts} href="/admin/products" />
        <Stat Icon={Boxes} label="Active" value={stats.activeProducts} tone="good" />
        <Stat Icon={AlertTriangle} label="Low Stock" value={stats.lowStock} tone="warn" />
        <Stat Icon={XCircle} label="Out of Stock" value={stats.outOfStock} tone="danger" />
        <Stat Icon={FolderTree} label="Categories" value={stats.totalCategories} href="/admin/categories" />
        <Stat Icon={ReceiptText} label="Orders" value={stats.totalOrders} href="/admin/orders" />
        <Stat Icon={ReceiptText} label="Pending Orders" value={stats.pendingOrders} tone="warn" />
        <Stat
          Icon={Boxes}
          label="Inventory Value"
          value={formatPrice(stats.inventoryValue)}
        />
      </div>

      {/* Low stock */}
      <section className="border border-white/10 bg-ink-800">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-widest text-white">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            Low / Out of Stock
          </h2>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-widest text-copper hover:text-copper-bright"
          >
            All products <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {lowStock.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted">
            Everything is well stocked. 👍
          </p>
        ) : (
          <ul className="divide-y divide-white/8">
            {lowStock.map((p) => (
              <li key={p.id} className="flex items-center gap-4 px-5 py-3">
                <div className="relative h-12 w-16 shrink-0 overflow-hidden bg-ink-600">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm uppercase tracking-wide text-white">
                    {p.name}
                  </p>
                  <p className="text-xs text-muted">{p.categoryLabel}</p>
                </div>
                <span
                  className={`font-display text-sm font-semibold ${
                    p.stock === 0 ? "text-red-400" : "text-amber-400"
                  }`}
                >
                  {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                </span>
                <Link
                  href={`/admin/products/${p.id}`}
                  className="font-display text-xs uppercase tracking-widest text-copper hover:text-copper-bright"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

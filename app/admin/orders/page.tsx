import { ReceiptText } from "lucide-react";
import { getOrders } from "@/lib/queries";
import { formatPrice, formatDate, cn } from "@/lib/utils";
import { setOrderStatus } from "../actions";

export const dynamic = "force-dynamic";

const STATUSES = ["pending", "paid", "shipped", "cancelled"] as const;

const statusClass: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-400",
  paid: "bg-sky-500/15 text-sky-400",
  shipped: "bg-emerald-500/15 text-emerald-400",
  cancelled: "bg-red-500/15 text-red-400",
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
          Orders
        </h1>
        <p className="mt-1 text-sm text-muted">
          {orders.length} order{orders.length === 1 ? "" : "s"} placed through the
          storefront checkout.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="border border-white/10 bg-ink-800 px-6 py-16 text-center">
          <ReceiptText className="mx-auto h-8 w-8 text-ink-400" />
          <p className="mt-4 font-display text-sm uppercase tracking-widest text-muted">
            No orders yet
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Orders placed through the storefront checkout will appear here, where
            you can update their status.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-white/10 bg-ink-800">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-white/10 bg-ink-700">
              <tr className="font-display text-[11px] uppercase tracking-widest2 text-muted">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {orders.map((o) => (
                <tr key={o.id} className="align-top hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-display text-sm text-white">
                    {o.orderNumber}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <p className="text-white">{o.customerName ?? "—"}</p>
                    <p className="text-xs text-muted">{o.customerEmail ?? ""}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-light">
                    {o.items.map((it) => (
                      <div key={`${it.slug}-${it.variant ?? ""}`}>
                        {it.qty}× {it.name}
                        {it.variant ? ` (${it.variant})` : ""}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 font-display text-sm text-white">
                    {formatPrice(o.subtotal)}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">
                    {formatDate(o.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-2">
                      <span
                        className={cn(
                          "inline-block w-fit px-2 py-1 font-display text-[10px] uppercase tracking-widest",
                          statusClass[o.status]
                        )}
                      >
                        {o.status}
                      </span>
                      <form action={setOrderStatus} className="flex gap-1.5">
                        <input type="hidden" name="id" value={o.id} />
                        <select
                          name="status"
                          defaultValue={o.status}
                          className="h-8 border border-white/15 bg-ink-600 px-2 text-xs text-white outline-none focus:border-copper"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <button className="h-8 border border-white/15 px-2.5 font-display text-[10px] uppercase tracking-widest text-muted-light transition hover:border-copper hover:text-copper">
                          Set
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, LoaderCircle, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/utils";
import { AngularButton } from "@/components/ui/AngularButton";
import { placeOrder, type CheckoutState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-14 w-full items-center justify-center gap-2 bg-copper font-display font-semibold uppercase tracking-widest text-white transition hover:bg-copper-bright clip-slant-br disabled:opacity-60"
    >
      {pending ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" /> Placing order…
        </>
      ) : (
        "Place Order"
      )}
    </button>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [state, formAction] = useFormState<CheckoutState, FormData>(
    placeOrder,
    {}
  );

  // Clear the cart once the order is confirmed
  useEffect(() => {
    if (state.orderNumber) clear();
  }, [state.orderNumber, clear]);

  if (state.orderNumber) {
    return (
      <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <CheckCircle2 className="h-14 w-14 text-emerald-400" />
        <h1 className="mt-6 font-display text-4xl font-bold uppercase tracking-wide text-white">
          Order Confirmed
        </h1>
        <p className="mt-3 text-muted-light">
          Thanks — your order{" "}
          <span className="font-display text-copper">{state.orderNumber}</span>{" "}
          has been received.
        </p>
        <div className="mt-8">
          <AngularButton href="/">Back to Store</AngularButton>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <ShoppingCart className="h-12 w-12 text-ink-400" />
        <h1 className="mt-6 font-display text-3xl font-bold uppercase tracking-wide text-white">
          Your cart is empty
        </h1>
        <div className="mt-8">
          <AngularButton href="/rifles">Shop Rifles</AngularButton>
        </div>
      </section>
    );
  }

  return (
    <section className="container-site py-14 lg:py-20">
      <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-white">
        Checkout
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5">
        {/* Details */}
        <form action={formAction} className="lg:col-span-3">
          <input type="hidden" name="items" value={JSON.stringify(items)} />

          <div className="border border-white/10 bg-ink-800 p-6">
            <h2 className="mb-5 font-display text-sm font-semibold uppercase tracking-widest text-white">
              Your details
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block font-display text-[11px] uppercase tracking-widest2 text-muted">
                  Full name *
                </label>
                <input
                  name="name"
                  required
                  className="h-12 w-full border border-white/15 bg-ink-600 px-4 text-white outline-none focus:border-copper"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block font-display text-[11px] uppercase tracking-widest2 text-muted">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="h-12 w-full border border-white/15 bg-ink-600 px-4 text-white outline-none focus:border-copper"
                />
              </div>
            </div>

            {state.error && (
              <p className="mt-4 border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                {state.error}
              </p>
            )}

            <p className="mt-5 text-xs text-muted">
              Firearms ship to a licensed FFL dealer. We&apos;ll contact you to
              arrange the transfer after your order is placed.
            </p>

            <div className="mt-6">
              <SubmitButton />
            </div>
          </div>
        </form>

        {/* Summary */}
        <aside className="lg:col-span-2">
          <div className="border border-white/10 bg-ink-800 p-6">
            <h2 className="mb-5 font-display text-sm font-semibold uppercase tracking-widest text-white">
              Order summary
            </h2>
            <ul className="divide-y divide-white/8">
              {items.map((item) => (
                <li
                  key={`${item.slug}-${item.variant ?? ""}`}
                  className="flex gap-3 py-3"
                >
                  <div className="relative h-14 w-16 shrink-0 overflow-hidden bg-ink-600">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm uppercase text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted">
                      {item.qty} × {formatPrice(item.price)}
                      {item.variant ? ` · ${item.variant}` : ""}
                    </p>
                  </div>
                  <span className="font-display text-sm text-copper">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-display uppercase tracking-widest text-muted">
                Subtotal
              </span>
              <span className="font-display text-xl font-semibold text-white">
                {formatPrice(subtotal)}
              </span>
            </div>
            <Link
              href="/rifles"
              className="mt-4 inline-block font-display text-xs uppercase tracking-widest text-muted transition hover:text-copper"
            >
              ← Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}

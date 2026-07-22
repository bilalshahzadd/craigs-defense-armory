"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/utils";
import { AngularButton } from "@/components/ui/AngularButton";

export function CartDrawer() {
  const { items, isOpen, close, subtotal, remove, setQty, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-ink-800"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-5 w-5 text-gold" />
                <h2 className="font-display text-lg font-semibold uppercase tracking-widest">
                  Cart{" "}
                  <span className="text-muted">({count})</span>
                </h2>
              </div>
              <button
                onClick={close}
                aria-label="Close cart"
                className="text-muted transition hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingCart className="h-10 w-10 text-ink-400" />
                  <p className="font-display uppercase tracking-widest text-muted">
                    Your cart is empty
                  </p>
                  <AngularButton href="/rifles" size="sm" onClick={close}>
                    Shop Rifles
                  </AngularButton>
                </div>
              ) : (
                <ul className="divide-y divide-white/8">
                  {items.map((item) => (
                    <li
                      key={`${item.slug}-${item.variant ?? ""}`}
                      className="flex gap-4 py-4"
                    >
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden bg-ink-600">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <p className="font-display text-sm font-semibold uppercase leading-tight tracking-wide">
                            {item.name}
                          </p>
                          <button
                            onClick={() => remove(item.slug, item.variant)}
                            aria-label="Remove item"
                            className="text-muted transition hover:text-gold"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {item.variant && (
                          <p className="mt-0.5 text-xs text-muted">{item.variant}</p>
                        )}
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center border border-white/15">
                            <button
                              onClick={() =>
                                setQty(item.slug, item.variant, item.qty - 1)
                              }
                              aria-label="Decrease quantity"
                              className="grid h-8 w-8 place-items-center text-muted transition hover:text-white"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center font-display text-sm">
                              {item.qty}
                            </span>
                            <button
                              onClick={() =>
                                setQty(item.slug, item.variant, item.qty + 1)
                              }
                              aria-label="Increase quantity"
                              className="grid h-8 w-8 place-items-center text-muted transition hover:text-white"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-display text-sm font-semibold text-gold">
                            {formatPrice(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display uppercase tracking-widest text-muted">
                    Subtotal
                  </span>
                  <span className="font-display text-xl font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <AngularButton
                  href="/checkout"
                  size="lg"
                  className="w-full"
                  onClick={close}
                >
                  Checkout
                </AngularButton>
                <p className="mt-3 text-center text-xs text-muted">
                  Shipping &amp; taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice, cn } from "@/lib/utils";
import { swatch } from "./ProductCard";

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [color, setColor] = useState(product.colors?.[0]);
  const [qty, setQty] = useState(1);

  const soldOut = product.stock <= 0;
  const maxQty = Math.max(1, product.stock);

  return (
    <div className="w-full border border-white/10 bg-ink-800/95 p-6 shadow-panel backdrop-blur clip-notch">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-3xl font-bold text-white">
          {formatPrice(product.price)}
        </span>
        {product.leadTime && (
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Truck className="h-4 w-4 text-copper" />
            Ships in {product.leadTime}
          </span>
        )}
      </div>

      {product.colors.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 font-display text-[11px] uppercase tracking-widest2 text-muted">
            Finish: <span className="text-white">{color}</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                title={c}
                aria-label={c}
                className={cn(
                  "h-9 w-9 rounded-full border-2 transition",
                  color === c
                    ? "border-copper ring-2 ring-copper/30"
                    : "border-white/20 hover:border-white/50"
                )}
                style={{ background: swatch(c) }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-stretch gap-3">
        <div className="flex items-center border border-white/15">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={soldOut}
            aria-label="Decrease quantity"
            className="grid h-12 w-11 place-items-center text-muted transition hover:text-white disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-display text-lg">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
            disabled={soldOut || qty >= maxQty}
            aria-label="Increase quantity"
            className="grid h-12 w-11 place-items-center text-muted transition hover:text-white disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          disabled={soldOut}
          onClick={() =>
            add(
              {
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
                variant: color,
              },
              qty
            )
          }
          className="flex h-12 flex-1 items-center justify-center bg-copper font-display font-semibold uppercase tracking-widest text-white transition hover:bg-copper-bright hover:shadow-copper clip-slant-br disabled:cursor-not-allowed disabled:bg-ink-500 disabled:text-muted disabled:shadow-none"
        >
          {soldOut ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>

      {!soldOut && product.stock <= 5 && (
        <p className="mt-3 font-display text-xs uppercase tracking-widest text-amber-400">
          Only {product.stock} left in stock
        </p>
      )}

      <div className="mt-5 flex items-center gap-2 border-t border-white/8 pt-4 text-xs text-muted">
        <ShieldCheck className="h-4 w-4 text-copper" />
        Guaranteed for life · Free returns within 30 days
      </div>
    </div>
  );
}

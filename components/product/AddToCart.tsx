"use client";

import { useState } from "react";
import { Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import type { Product } from "@/lib/data";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice, cn } from "@/lib/utils";

const swatchMap: Record<string, string> = {
  Black: "#151515",
  FDE: "#b8956a",
  Sand: "#cdb894",
  Tungsten: "#6d6f73",
  Grey: "#7c7c80",
  Charcoal: "#3a3a3d",
  Bronze: "#a9713b",
  Olive: "#5c5f3a",
  Multicam: "#8a7f5c",
  "Black/Gold": "#151515",
};

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [color, setColor] = useState(product.colors?.[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="w-full border border-white/10 bg-ink-800/95 p-6 shadow-panel backdrop-blur clip-notch">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-3xl font-bold text-white">
          {formatPrice(product.price)}
        </span>
        {product.leadTime && (
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Truck className="h-4 w-4 text-gold" />
            Ships in {product.leadTime}
          </span>
        )}
      </div>

      {product.colors && product.colors.length > 0 && (
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
                    ? "border-gold ring-2 ring-gold/30"
                    : "border-white/20 hover:border-white/50"
                )}
                style={{ background: swatchMap[c] ?? "#888" }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-stretch gap-3">
        <div className="flex items-center border border-white/15">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="grid h-12 w-11 place-items-center text-muted transition hover:text-white"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-display text-lg">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="grid h-12 w-11 place-items-center text-muted transition hover:text-white"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
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
          className="flex h-12 flex-1 items-center justify-center bg-gold font-display font-semibold uppercase tracking-widest text-ink transition hover:bg-gold-bright hover:shadow-gold clip-slant-br"
        >
          Add to Cart
        </button>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-white/8 pt-4 text-xs text-muted">
        <ShieldCheck className="h-4 w-4 text-gold" />
        Guaranteed for life · Free returns within 30 days
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;

  return (
    <Link
      href={`/${product.category}/${product.slug}`}
      className="group relative flex flex-col border border-white/8 bg-ink-700 transition-colors duration-300 hover:border-copper/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-ink-600 to-ink-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.badge && !soldOut && (
          <span className="absolute left-0 top-4 bg-copper px-3 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-white clip-slant-br">
            {product.badge}
          </span>
        )}
        {soldOut && (
          <>
            <span className="absolute inset-0 bg-ink/60" />
            <span className="absolute left-0 top-4 bg-red-600 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-white clip-slant-br">
              Sold Out
            </span>
          </>
        )}
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center bg-ink/70 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 clip-slant-br">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="font-display text-[10px] font-semibold uppercase tracking-widest2 text-copper">
          {product.categoryLabel}
        </span>
        <h3 className="mt-1.5 font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white transition-colors group-hover:text-copper-light">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{product.tagline}</p>
        <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
          <span className="font-display text-lg font-semibold text-white">
            {formatPrice(product.price)}
          </span>
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c}
                  title={c}
                  className="h-3 w-3 rounded-full border border-white/25"
                  style={{ background: swatch(c) }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export function swatch(name: string): string {
  const map: Record<string, string> = {
    Black: "#151515",
    FDE: "#b8956a",
    Sand: "#cdb894",
    Tungsten: "#6d6f73",
    Grey: "#7c7c80",
    Charcoal: "#3a3a3d",
    Bronze: "#a9713b",
    Copper: "#b4703f",
    Olive: "#5c5f3a",
    Multicam: "#8a7f5c",
    "Black/Gold": "#151515",
  };
  return map[name] ?? "#888";
}

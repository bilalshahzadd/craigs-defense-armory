import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/queries";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export async function FeaturedProducts() {
  const list = await getFeaturedProducts(4);
  if (list.length === 0) return null;

  return (
    <section className="bg-ink py-20 lg:py-28">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-display text-xs font-semibold uppercase tracking-widest2 text-copper">
              Best Sellers
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-white lg:text-5xl">
              Featured Gear
            </h2>
          </div>
          <Link
            href="/rifles"
            className="group inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-widest text-copper"
          >
            Shop All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((product, i) => (
            <Reveal key={product.slug} delayIndex={i}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

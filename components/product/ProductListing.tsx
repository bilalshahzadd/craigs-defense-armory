import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { getCategory, getProductsByCategory } from "@/lib/queries";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export async function ProductListing({ category }: { category: string }) {
  const meta = await getCategory(category);
  if (!meta) notFound();

  const items = await getProductsByCategory(category);

  return (
    <>
      {/* Page hero */}
      <section className="relative flex h-[300px] items-end overflow-hidden md:h-[360px]">
        <Image
          src={meta.image ?? "/images/rifle-black.png"}
          alt={meta.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="absolute inset-0 diag-lines opacity-20" />
        <div className="container-site relative z-10 pb-10">
          <nav className="flex items-center gap-2 font-display text-xs uppercase tracking-widest text-muted">
            <Link href="/" className="hover:text-copper">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{meta.name}</span>
          </nav>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase tracking-wide text-white lg:text-6xl">
            {meta.name}
          </h1>
          {meta.blurb && (
            <p className="mt-3 max-w-xl text-muted-light">{meta.blurb}</p>
          )}
        </div>
      </section>

      {/* Toolbar */}
      <div className="border-y border-white/10 bg-ink-800">
        <div className="container-site flex items-center justify-between py-4">
          <span className="font-display text-sm uppercase tracking-widest text-muted">
            {items.length} Product{items.length === 1 ? "" : "s"}
          </span>
          <button className="flex items-center gap-2 font-display text-sm uppercase tracking-widest text-muted-light transition hover:text-copper">
            <SlidersHorizontal className="h-4 w-4" />
            Filter &amp; Sort
          </button>
        </div>
      </div>

      {/* Grid */}
      <section className="bg-ink py-14 lg:py-20">
        <div className="container-site">
          {items.length === 0 ? (
            <p className="py-16 text-center text-muted">
              No products in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((product, i) => (
                <Reveal key={product.slug} delayIndex={i % 4}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

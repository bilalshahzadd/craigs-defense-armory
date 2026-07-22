import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Wrench, Flag } from "lucide-react";
import { getCategory, getRelatedProducts } from "@/lib/queries";
import type { Product } from "@/lib/types";
import { AddToCart } from "./AddToCart";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export async function ProductDetail({ product }: { product: Product }) {
  const meta = await getCategory(product.category);
  const related = await getRelatedProducts(product.category, product.slug, 4);

  const stockLabel =
    product.stock <= 0
      ? "Out of Stock"
      : product.stock <= 5
        ? `Only ${product.stock} left`
        : "In Stock";

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-white/10 bg-ink-800">
        <div className="container-site py-4">
          <nav className="flex items-center gap-2 font-display text-xs uppercase tracking-widest text-muted">
            <Link href="/" className="hover:text-copper">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/${product.category}`} className="hover:text-copper">
              {meta?.name ?? product.categoryLabel}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero — centred title + large product shot, buy panel floats bottom-right */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ink-700 to-ink">
        <div className="absolute inset-0 bg-hero-vignette" />

        <div className="container-site relative pt-12 text-center lg:pt-16">
          <div className="flex items-center justify-center gap-3">
            <span className="font-display text-[11px] font-semibold uppercase tracking-widest2 text-copper">
              {product.categoryLabel}
            </span>
            <span
              className={cn(
                "font-display text-[11px] font-semibold uppercase tracking-widest",
                product.stock <= 0
                  ? "text-red-400"
                  : product.stock <= 5
                    ? "text-amber-400"
                    : "text-emerald-400"
              )}
            >
              • {stockLabel}
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-light uppercase leading-none tracking-wide text-white sm:text-5xl lg:text-6xl">
            {product.name}
          </h1>

          {/* Reference's small downward triangle */}
          <svg
            viewBox="0 0 24 16"
            className="mx-auto mt-6 h-4 w-6 text-copper"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M1.5 1.5 L22.5 1.5 L12 14.5 Z" />
          </svg>

          <p className="mx-auto mt-6 max-w-xl text-muted-light">
            {product.tagline}
          </p>
        </div>

        <div className="container-site relative pb-14 pt-8 lg:pb-20">
          <div className="relative">
            <div className="relative aspect-[16/9] overflow-hidden border border-white/8 bg-gradient-to-b from-ink-600 to-ink-800">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute left-5 top-5 h-14 w-14 border-l-2 border-t-2 border-copper/50" />
              <div className="pointer-events-none absolute bottom-5 left-5 h-14 w-14 border-b-2 border-l-2 border-copper/50" />
            </div>

            {/* Floating buy panel */}
            <div className="mt-6 lg:absolute lg:bottom-8 lg:right-8 lg:mt-0 lg:w-[380px]">
              <AddToCart product={product} />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 lg:max-w-xl">
            {[
              { Icon: ShieldCheck, label: "Lifetime Warranty" },
              { Icon: Wrench, label: "Hand Assembled" },
              { Icon: Flag, label: "Made in USA" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 border border-white/8 bg-ink-800/60 py-4 text-center"
              >
                <Icon className="h-5 w-5 text-copper" />
                <span className="font-display text-[10px] uppercase leading-tight tracking-widest text-muted">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spec sheet */}
      {product.specGroups.length > 0 && (
        <section className="relative bg-white text-ink">
          <div className="container-site grid grid-cols-1 gap-10 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                About the {product.name}
              </h2>
              {product.leadTime && (
                <p className="mt-5 font-display text-lg font-semibold">
                  These products are built to order and have a lead time of{" "}
                  {product.leadTime.toLowerCase()}.
                </p>
              )}
              {product.description && (
                <p className="mt-5 leading-relaxed text-ink/75">
                  {product.description}
                </p>
              )}

              <div className="mt-10 space-y-9">
                {product.specGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide">
                      {group.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-ink/80">
                          <span className="mt-1 text-copper-dark">▷</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="lg:sticky lg:top-28">
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-neutral-100 to-neutral-200">
                  <Image
                    src={product.image}
                    alt={`${product.name} detail`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-ink py-16 lg:py-20">
          <div className="container-site">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
              You May Also Like
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <Reveal key={p.slug} delayIndex={i}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

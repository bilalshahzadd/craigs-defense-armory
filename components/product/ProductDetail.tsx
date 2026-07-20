import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Wrench, Flag } from "lucide-react";
import { getByCategory, categoryMeta, type Product } from "@/lib/data";
import { AddToCart } from "./AddToCart";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export function ProductDetail({ product }: { product: Product }) {
  const meta = categoryMeta[product.category];
  const related = getByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-white/10 bg-ink-800">
        <div className="container-site py-4">
          <nav className="flex items-center gap-2 font-display text-xs uppercase tracking-widest text-muted">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/${product.category}`} className="hover:text-gold">
              {meta.label}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ink-700 to-ink">
        <div className="absolute inset-0 bg-hero-vignette" />
        <div className="container-site relative grid grid-cols-1 gap-10 py-12 lg:grid-cols-3 lg:py-16">
          <div className="lg:col-span-2">
            <span className="font-display text-xs font-semibold uppercase tracking-widest2 text-gold">
              {product.categoryLabel}
            </span>
            <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-none tracking-wide text-white sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>
            <p className="mt-3 max-w-xl text-lg text-muted-light">
              {product.tagline}
            </p>

            <div className="relative mt-6 aspect-[16/10] overflow-hidden border border-white/8 bg-gradient-to-b from-ink-600 to-ink-800">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute left-4 top-4 h-12 w-12 border-l-2 border-t-2 border-gold/50" />
              <div className="pointer-events-none absolute bottom-4 right-4 h-12 w-12 border-b-2 border-r-2 border-gold/50" />
            </div>
          </div>

          {/* Buy box */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <AddToCart product={product} />
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { Icon: ShieldCheck, label: "Lifetime\nWarranty" },
                  { Icon: Wrench, label: "Hand\nAssembled" },
                  { Icon: Flag, label: "Made in\nUSA" },
                ].map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 border border-white/8 bg-ink-800 py-4"
                  >
                    <Icon className="h-5 w-5 text-gold" />
                    <span className="whitespace-pre-line font-display text-[10px] uppercase leading-tight tracking-widest text-muted">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spec sheet — light section, mirrors the reference product page */}
      {product.specGroups && (
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
              <p className="mt-5 leading-relaxed text-ink/75">
                {product.description}
              </p>

              <div className="mt-10 space-y-9">
                {product.specGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide">
                      {group.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-ink/80">
                          <span className="mt-1 text-gold-dark">▷</span>
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

import Image from "next/image";
import { Check } from "lucide-react";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { FeatureStrip } from "@/components/home/FeatureStrip";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryCards } from "@/components/home/CategoryCards";
import { Reveal } from "@/components/ui/Reveal";
import { AngularButton } from "@/components/ui/AngularButton";
import { IMG } from "@/lib/data";

export const dynamic = "force-dynamic";

const promises = [
  "Assembled by hand, one at a time",
  "Test-fired & inspected by a gunsmith",
  "Sub-MOA accuracy guarantee",
  "Lifetime warranty on every build",
];

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <FeatureStrip />
      <FeaturedProducts />

      {/* Brand story band */}
      <section className="relative overflow-hidden bg-ink-800">
        <div className="container-site grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden clip-slant-br">
              <Image
                src={IMG.rifleDesert}
                alt="Precision-built rifle in the field"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
              <div className="pointer-events-none absolute left-5 top-5 h-16 w-16 border-l-2 border-t-2 border-gold" />
              <div className="pointer-events-none absolute bottom-5 right-5 h-16 w-16 border-b-2 border-r-2 border-gold" />
            </div>
          </Reveal>

          <Reveal delayIndex={1}>
            <div>
              <span className="font-display text-xs font-semibold uppercase tracking-widest2 text-gold">
                Our Promise
              </span>
              <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-tight tracking-wide text-white lg:text-5xl">
                Built by hand.
                <br />
                Backed for life.
              </h2>
              <p className="mt-5 max-w-lg text-muted-light">
                The design philosophy is simple: the highest quality raw
                materials, the most precise CNC machining, and the best
                components available — brought together into a weapon that
                seamlessly blends form and function. No detail is overlooked.
              </p>
              <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {promises.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-muted-light">
                    <span className="grid h-5 w-5 shrink-0 place-items-center bg-gold text-ink">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <AngularButton href="/rifles" size="lg">
                  Explore Rifles
                </AngularButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CategoryCards />
    </>
  );
}

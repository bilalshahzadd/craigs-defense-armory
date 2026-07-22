import Image from "next/image";
import { Factory, Hammer, Target, Award } from "lucide-react";
import { IMG } from "@/lib/data";
import { AngularButton } from "@/components/ui/AngularButton";
import { Reveal } from "@/components/ui/Reveal";

const reasons = [
  {
    Icon: Factory,
    title: "Built In-House",
    text: "Every receiver, handguard and control is machined under our own roof — so tolerances stay ours to control, never a supplier's.",
  },
  {
    Icon: Hammer,
    title: "One Builder, One Rifle",
    text: "No production line. A single trained gunsmith owns your build from first pin to final inspection, and signs off on it.",
  },
  {
    Icon: Target,
    title: "Proven Before It Ships",
    text: "Each weapon is live-fired, function-checked and accuracy-verified — then stripped, cleaned and packed by hand.",
  },
  {
    Icon: Award,
    title: "Backed for Life",
    text: "A lifetime guarantee on everything we make, with US-based support that actually picks up the phone.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={IMG.rifleDesert}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-ink/88" />
      <div className="absolute inset-0 bg-hex opacity-50" />

      <div className="container-site relative py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-display text-xs font-semibold uppercase tracking-widest2 text-copper">
            The Difference
          </span>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-white lg:text-5xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-muted-light">
            Anyone can assemble parts. We machine, build, and prove every weapon
            ourselves — and stand behind it for as long as you own it.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delayIndex={i}>
              <div className="group h-full border border-white/10 bg-ink-800/70 p-7 backdrop-blur-sm transition-colors hover:border-copper/50">
                <span className="grid h-12 w-12 place-items-center bg-copper/15 text-copper transition-colors clip-slant-br group-hover:bg-copper group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold uppercase tracking-wide text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <AngularButton href="/rifles" size="lg">
            See What We Build
          </AngularButton>
        </div>
      </div>
    </section>
  );
}

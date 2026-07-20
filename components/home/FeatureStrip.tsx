import { ShieldCheck, Crosshair, Flag, Repeat } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Guaranteed for Life",
    text: "Every product backed by our lifetime warranty.",
  },
  {
    icon: Crosshair,
    title: "Sub-MOA Accuracy",
    text: "Guaranteed with match-grade ammunition.",
  },
  {
    icon: Repeat,
    title: "Fully Ambidextrous",
    text: "Controls built for left and right-handed shooters.",
  },
  {
    icon: Flag,
    title: "American Made",
    text: "Designed, machined & assembled in the USA.",
  },
];

export function FeatureStrip() {
  return (
    <section className="border-y border-white/10 bg-ink-800">
      <div className="container-site grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {features.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex items-start gap-4 px-2 py-8 lg:px-8"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center bg-gold/10 text-gold clip-slant-br">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white">
                {title}
              </h3>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    n: "01",
    title: "Machined",
    text: "Billet 7075-T6 aluminium cut on precision CNC equipment, in-house, to tolerances measured in ten-thousandths.",
  },
  {
    n: "02",
    title: "Assembled",
    text: "Every rifle is built by hand, one at a time, by a single trained gunsmith who owns it start to finish.",
  },
  {
    n: "03",
    title: "Test Fired",
    text: "Each weapon is live-fired and function-checked, then stripped, inspected and cleaned before it ships.",
  },
  {
    n: "04",
    title: "Guaranteed",
    text: "It leaves with a lifetime guarantee. If it ever fails, we repair or replace it — no questions asked.",
  },
];

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 lg:py-28">
      <div className="absolute inset-0 bg-hex opacity-60" />
      <div className="container-site relative">
        <div className="max-w-2xl">
          <span className="font-display text-xs font-semibold uppercase tracking-widest2 text-copper">
            The Process
          </span>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-white lg:text-5xl">
            How It&apos;s Built
          </h2>
          <p className="mt-4 text-muted-light">
            No production lines. No shortcuts. Four stages, and a name attached
            to every one of them.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delayIndex={i}>
              <div className="group h-full bg-ink-800 p-7 transition-colors hover:bg-ink-700">
                <span className="font-display text-5xl font-bold leading-none text-copper/25 transition-colors group-hover:text-copper/50">
                  {s.n}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

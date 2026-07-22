const items = [
  "Precision Built",
  "American Made",
  "Guaranteed for Life",
  "Fully Ambidextrous",
  "Sub-MOA Accuracy",
  "Hand Assembled",
];

export function MarqueeStrip() {
  // rendered twice so the -50% translate loops seamlessly
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-ink-800 py-4">
      <div className="flex w-max animate-marquee items-center gap-10">
        {loop.map((label, i) => (
          <span key={`${label}-${i}`} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-sm font-medium uppercase tracking-widest2 text-muted-light">
              {label}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-copper" />
          </span>
        ))}
      </div>
    </div>
  );
}

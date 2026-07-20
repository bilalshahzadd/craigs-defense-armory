import { ShieldCheck, Truck, MapPin } from "lucide-react";

const items = [
  { icon: Truck, label: "Free shipping on orders over $150" },
  { icon: ShieldCheck, label: "Guaranteed for life" },
  { icon: MapPin, label: "Designed & built in the USA" },
];

export function AnnouncementBar() {
  return (
    <div className="relative z-[60] border-b border-white/5 bg-ink-800">
      <div className="container-site flex h-9 items-center justify-center gap-8 overflow-hidden">
        {items.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-2 whitespace-nowrap font-display text-[10px] font-medium uppercase tracking-widest text-muted last:flex sm:text-[11px] [&:not(:first-child)]:hidden md:[&:not(:first-child)]:flex"
          >
            <Icon className="h-3.5 w-3.5 text-gold" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

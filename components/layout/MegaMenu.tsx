"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { NavItem } from "@/lib/data";

export function MegaMenu({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  return (
    <div className="container-site grid grid-cols-1 gap-10 py-10 lg:grid-cols-12">
      {/* Link columns */}
      <div className="grid grid-cols-3 gap-8 lg:col-span-7">
        {item.columns.map((col) => (
          <div key={col.heading}>
            <h3 className="mb-5 font-display text-xs font-semibold uppercase tracking-widest2 text-gold">
              {col.heading}
            </h3>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={onNavigate}
                    className="group inline-flex items-center gap-2 text-[15px] text-muted-light transition-colors hover:text-white"
                  >
                    <span>{l.label}</span>
                    {l.badge && (
                      <span className="bg-gold px-1.5 py-0.5 font-display text-[9px] font-bold uppercase tracking-wider text-ink">
                        {l.badge}
                      </span>
                    )}
                    <ChevronRight className="h-3.5 w-3.5 -translate-x-1 text-gold opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Feature card */}
      <div className="lg:col-span-5">
        <Link
          href={item.feature.href}
          onClick={onNavigate}
          className="group relative block h-full min-h-[240px] overflow-hidden clip-slant-br"
        >
          <Image
            src={item.feature.image}
            alt={item.feature.title}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
          <div className="absolute inset-0 diag-lines opacity-30 mix-blend-overlay" />
          <div className="relative flex h-full flex-col justify-end p-7">
            <span className="font-display text-[11px] uppercase tracking-widest2 text-gold">
              {item.feature.eyebrow}
            </span>
            <h4 className="mt-2 font-display text-2xl font-bold uppercase leading-none text-white">
              {item.feature.title}
            </h4>
            <p className="mt-2 max-w-xs text-sm text-muted-light">
              {item.feature.subtitle}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-widest text-gold">
              {item.feature.cta}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

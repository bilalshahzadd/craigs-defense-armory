"use client";

import { Triangle } from "lucide-react";

export function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group mx-auto flex flex-col items-center gap-2 py-8"
      aria-label="Back to top"
    >
      <Triangle className="h-5 w-5 fill-gold text-gold transition-transform group-hover:-translate-y-1" />
      <span className="font-display text-xs font-semibold uppercase tracking-widest2 text-gold">
        Back to Top
      </span>
    </button>
  );
}

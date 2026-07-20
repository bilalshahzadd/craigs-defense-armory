"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

const popular = [
  { label: "Model 1 Rifle", href: "/rifles/model-1-rifle" },
  { label: "Vertex Trigger", href: "/apparel-gear/vertex-cbx-trigger" },
  { label: "Raptor Charging Handle", href: "/apparel-gear/raptor-charging-handle" },
  { label: "Pistols", href: "/pistols" },
  { label: "Apparel", href: "/apparel-gear" },
];

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => {
        clearTimeout(t);
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] bg-ink/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="container-site pt-28">
            <div className="flex items-center justify-between">
              <p className="font-display text-xs uppercase tracking-widest2 text-gold">
                Search
              </p>
              <button
                onClick={onClose}
                aria-label="Close search"
                className="text-muted transition hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex items-center gap-4 border-b-2 border-white/20 pb-4 focus-within:border-gold"
            >
              <Search className="h-7 w-7 text-gold" />
              <input
                ref={inputRef}
                type="search"
                placeholder="Search rifles, triggers, apparel…"
                className="w-full bg-transparent font-display text-2xl uppercase tracking-wide text-white outline-none placeholder:text-muted md:text-4xl"
              />
            </motion.form>
            <div className="mt-8">
              <p className="mb-4 font-display text-[11px] uppercase tracking-widest2 text-muted">
                Popular
              </p>
              <div className="flex flex-wrap gap-3">
                {popular.map((p) => (
                  <Link
                    key={p.label}
                    href={p.href}
                    onClick={onClose}
                    className="border border-white/15 px-4 py-2 font-display text-sm uppercase tracking-wide text-muted-light transition hover:border-gold hover:text-gold clip-slant-br"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { nav } from "@/lib/data";
import { brand } from "@/lib/config";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-black/70 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed left-0 top-0 z-[90] flex h-full w-[86%] max-w-sm flex-col bg-ink-800 lg:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <span className="grid h-9 w-9 place-items-center bg-gold text-ink clip-slant-br">
                  <LogoMark className="h-5 w-5" />
                </span>
                <span className="font-display text-lg font-bold uppercase tracking-widest">
                  {brand.name}
                </span>
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="text-muted hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-3">
              {nav.map((item, i) => {
                const isOpen = expanded === i;
                return (
                  <div key={item.label} className="border-b border-white/8">
                    <button
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="flex w-full items-center justify-between px-3 py-4 text-left font-display text-base font-semibold uppercase tracking-widest text-white"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-gold transition-transform",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-4 px-3 pb-5">
                            {item.columns.map((col) => (
                              <div key={col.heading}>
                                <p className="mb-2 font-display text-[10px] uppercase tracking-widest2 text-gold">
                                  {col.heading}
                                </p>
                                <ul className="space-y-2">
                                  {col.links.map((l) => (
                                    <li key={l.label}>
                                      <Link
                                        href={l.href}
                                        onClick={onClose}
                                        className="text-sm text-muted-light hover:text-white"
                                      >
                                        {l.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="border-t border-white/10 px-5 py-4 text-xs text-muted">
              <p className="font-display uppercase tracking-widest text-gold">
                {brand.phone}
              </p>
              <p className="mt-1">{brand.email}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

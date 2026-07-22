"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Crosshair, Menu, Search, ShoppingCart, User } from "lucide-react";
import { nav } from "@/lib/data";
import { brand } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { SearchOverlay } from "./SearchOverlay";

export function Header() {
  const [active, setActive] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { count, open: openCart } = useCart();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-shadow duration-300",
          scrolled && "shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]"
        )}
        onMouseLeave={() => setActive(null)}
      >
        <div
          className={cn(
            "relative border-b border-white/10 bg-ink/95 backdrop-blur transition-colors",
            active !== null && "bg-ink"
          )}
        >
          <div className="flex h-[72px] items-stretch">
            {/* Brand block */}
            <Link
              href="/"
              className="relative z-10 flex shrink-0 items-center pl-5 pr-6 sm:pr-10"
              aria-label={brand.fullName}
            >
              <Logo priority className="h-9 w-auto sm:h-11" />
            </Link>

            <div className="flex flex-1 items-center pl-6 pr-4 sm:pr-6 lg:pl-10">
              {/* Desktop nav */}
              <nav className="hidden items-center gap-8 lg:flex">
                {nav.map((item, i) => (
                  <div
                    key={item.label}
                    onMouseEnter={() => setActive(i)}
                    className="py-6"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "relative font-display text-sm font-semibold uppercase tracking-widest transition-colors",
                        active === i ? "text-gold" : "text-white hover:text-gold"
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute -bottom-2 left-0 h-0.5 bg-gold transition-all duration-300",
                          active === i ? "w-full" : "w-0"
                        )}
                      />
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Right icons */}
              <div className="ml-auto flex items-center gap-4 text-white sm:gap-5">
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  className="transition hover:text-gold"
                >
                  <Search className="h-[22px] w-[22px]" />
                </button>
                <button
                  onClick={openCart}
                  aria-label="Cart"
                  className="relative transition hover:text-gold"
                >
                  <ShoppingCart className="h-[22px] w-[22px]" />
                  {mounted && count > 0 && (
                    <span className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold px-1 font-display text-[10px] font-bold text-ink">
                      {count}
                    </span>
                  )}
                </button>
                <Link
                  href="/support"
                  aria-label="Dealer locator"
                  className="hidden transition hover:text-gold sm:block"
                >
                  <Crosshair className="h-[22px] w-[22px]" />
                </Link>
                <Link
                  href="/support"
                  aria-label="Account"
                  className="hidden transition hover:text-gold sm:block"
                >
                  <User className="h-[22px] w-[22px]" />
                </Link>
                <button
                  onClick={() => setMobileOpen(true)}
                  aria-label="Menu"
                  className="transition hover:text-gold lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Mega menu panel */}
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-0 right-0 top-full hidden border-t border-gold/25 bg-ink-800 shadow-panel lg:block"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                <MegaMenu item={nav[active]} onNavigate={() => setActive(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </>
  );
}

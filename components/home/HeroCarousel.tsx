"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/data";
import { cn } from "@/lib/utils";

const AUTOPLAY = 6500;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY);
    return () => clearInterval(t);
  }, [paused, count]);

  const slide = heroSlides[index];

  return (
    <section
      className="relative h-[82vh] min-h-[560px] max-h-[880px] overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Background image crossfade */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.9 }, scale: { duration: 7, ease: "linear" } }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-[75%_center]"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20 md:to-transparent" />
      <div className="absolute inset-0 bg-hero-vignette" />

      {/* Decorative gold bracket */}
      <div className="pointer-events-none absolute right-[8%] top-1/2 hidden h-[46%] w-[34%] -translate-y-1/2 border-r-2 border-t-2 border-gold/40 lg:block" />

      {/* Content */}
      <div className="container-site relative z-10 flex h-full flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="font-display text-sm font-medium uppercase tracking-widest2 text-gold">
              {slide.eyebrow}
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              {slide.title}
              {slide.titleAccent && (
                <sup className="ml-1 align-super text-2xl text-gold">
                  {slide.titleAccent}
                </sup>
              )}
            </h1>
            <p className="mt-4 font-display text-xl uppercase tracking-wide text-muted-light sm:text-2xl">
              {slide.subtitle}
            </p>
            {slide.detail && (
              <div className="mt-5 flex items-center gap-4">
                <span className="h-px w-10 bg-gold" />
                <p className="text-sm text-muted-light">{slide.detail}</p>
              </div>
            )}
            <Link
              href={slide.href}
              className="mt-9 inline-flex h-14 items-center bg-gold px-10 font-display font-semibold uppercase tracking-widest text-ink transition hover:bg-gold-bright hover:shadow-gold clip-slant-br"
            >
              {slide.cta}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 p-2 text-white/60 transition hover:text-gold md:block"
      >
        <ChevronLeft className="h-9 w-9" strokeWidth={1.5} />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 p-2 text-white/60 transition hover:text-gold md:block"
      >
        <ChevronRight className="h-9 w-9" strokeWidth={1.5} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-3 w-3 rounded-full border border-white/50 transition-all",
              i === index ? "border-gold bg-gold" : "bg-transparent hover:border-gold"
            )}
          />
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { categoryCards } from "@/lib/data";

export function CategoryCards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3">
      {categoryCards.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className="group relative flex h-[340px] items-center justify-center overflow-hidden md:h-[420px]"
        >
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-ink/40 transition-colors duration-500 group-hover:bg-ink/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          <div className="relative flex flex-col items-center text-center">
            <h3 className="font-display text-4xl font-bold uppercase tracking-wide text-gold drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] lg:text-5xl">
              {card.title}
            </h3>
            <span className="mt-3 inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
              Shop Now <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <span className="absolute bottom-0 left-0 h-1 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
        </Link>
      ))}
    </section>
  );
}

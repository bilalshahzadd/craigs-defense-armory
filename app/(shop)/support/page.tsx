import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  LifeBuoy,
  ShieldCheck,
  MapPin,
  Truck,
  Mail,
  Phone,
} from "lucide-react";
import { brand } from "@/lib/config";
import { AngularButton } from "@/components/ui/AngularButton";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Warranty, shipping, dealer locator, and everything you need to get help with your gear.",
};

const cards = [
  {
    Icon: ShieldCheck,
    title: "Warranty",
    text: "Every product is guaranteed for life. Register yours or file a claim.",
  },
  {
    Icon: Truck,
    title: "Shipping & Returns",
    text: "Built-to-order lead times, tracking, and 30-day returns.",
  },
  {
    Icon: MapPin,
    title: "Dealer Locator",
    text: "Find an authorized dealer near you to handle your transfer.",
  },
  {
    Icon: LifeBuoy,
    title: "Product Support",
    text: "Manuals, install guides, and troubleshooting for every product.",
  },
];

const faqs = [
  {
    q: "What is the lead time on firearms?",
    a: "Complete rifles and pistols are built to order and ship in approximately 30 business days. Accessories and apparel typically ship within 2–3 business days.",
  },
  {
    q: "How does the lifetime warranty work?",
    a: "Every product we make is guaranteed for life against defects in materials and workmanship. If anything ever fails, we'll repair or replace it — just reach out to our support team.",
  },
  {
    q: "Do you ship firearms directly to me?",
    a: "Firearms ship to a licensed FFL dealer of your choice, who will handle the required background check and transfer. Use the dealer locator to find one near you.",
  },
  {
    q: "Can I customize my build?",
    a: "Many configurations — caliber, finish, and barrel length — are selectable at checkout. For fully custom work, contact our team for a build consultation.",
  },
  {
    q: "What is your return policy?",
    a: "Unfired firearms and unused accessories may be returned within 30 days. Apparel can be returned within 30 days if unworn with tags attached.",
  },
];

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-ink-800">
        <div className="absolute inset-0 diag-lines opacity-10" />
        <div className="container-site relative py-16 lg:py-20">
          <nav className="flex items-center gap-2 font-display text-xs uppercase tracking-widest text-muted">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">Support</span>
          </nav>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase tracking-wide text-white lg:text-6xl">
            How can we help?
          </h1>
          <p className="mt-3 max-w-xl text-muted-light">
            Warranty claims, shipping questions, dealer transfers, and product
            support — the team is standing by.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-ink py-14 lg:py-20">
        <div className="container-site grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="group border border-white/10 bg-ink-700 p-6 transition-colors hover:border-gold/40"
            >
              <span className="grid h-12 w-12 place-items-center bg-gold/10 text-gold clip-slant-br">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold uppercase tracking-wide text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-white/10 bg-ink-800 py-16 lg:py-24">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div>
            <span className="font-display text-xs font-semibold uppercase tracking-widest2 text-gold">
              FAQ
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-white">
              Common Questions
            </h2>
            <p className="mt-4 text-muted">
              Can&apos;t find what you&apos;re looking for? Reach out and
              we&apos;ll get you sorted.
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="font-display text-lg font-medium uppercase tracking-wide text-white">
                      {f.q}
                    </span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-gold transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted-light">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-ink py-16 lg:py-24">
        <div className="container-site grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-wide text-white">
              Still need a hand?
            </h2>
            <p className="mt-4 max-w-md text-muted-light">
              Our US-based support team is available Monday–Friday, 8am–5pm PT.
            </p>
            <div className="mt-8 space-y-4">
              <a
                href={`tel:${brand.phone}`}
                className="flex items-center gap-4 text-white transition hover:text-gold"
              >
                <span className="grid h-11 w-11 place-items-center border border-white/15 clip-slant-br">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="font-display text-lg tracking-wide">
                  {brand.phone}
                </span>
              </a>
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-4 text-white transition hover:text-gold"
              >
                <span className="grid h-11 w-11 place-items-center border border-white/15 clip-slant-br">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="font-display text-lg tracking-wide">
                  {brand.email}
                </span>
              </a>
            </div>
          </div>

          <div className="border border-white/10 bg-ink-700 p-8 clip-notch">
            <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-white">
              Send a message
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                placeholder="First name"
                className="h-12 border border-white/15 bg-ink-600 px-4 text-white outline-none placeholder:text-muted focus:border-gold"
              />
              <input
                placeholder="Last name"
                className="h-12 border border-white/15 bg-ink-600 px-4 text-white outline-none placeholder:text-muted focus:border-gold"
              />
              <input
                placeholder="Email"
                className="h-12 border border-white/15 bg-ink-600 px-4 text-white outline-none placeholder:text-muted focus:border-gold sm:col-span-2"
              />
              <textarea
                placeholder="How can we help?"
                rows={4}
                className="border border-white/15 bg-ink-600 px-4 py-3 text-white outline-none placeholder:text-muted focus:border-gold sm:col-span-2"
              />
            </div>
            <div className="mt-6">
              <AngularButton className="w-full sm:w-auto">
                Submit Request
              </AngularButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

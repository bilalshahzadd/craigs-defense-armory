import Link from "next/link";
import { brand } from "@/lib/config";
import { nav } from "@/lib/data";
import { Logo } from "@/components/ui/Logo";
import { Newsletter } from "./Newsletter";
import { BackToTop } from "./BackToTop";

type IconProps = { className?: string };

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.8c-3.15 0-3.5.01-4.74.07-.89.04-1.38.19-1.7.32-.43.17-.73.36-1.05.68-.32.32-.51.62-.68 1.05-.13.32-.28.81-.32 1.7-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.89.19 1.38.32 1.7.17.43.36.73.68 1.05.32.32.62.51 1.05.68.32.13.81.28 1.7.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.89-.04 1.38-.19 1.7-.32.43-.17.73-.36 1.05-.68.32-.32.51-.62.68-1.05.13-.32.28-.81.32-1.7.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.89-.19-1.38-.32-1.7a2.8 2.8 0 0 0-.68-1.05 2.8 2.8 0 0 0-1.05-.68c-.32-.13-.81-.28-1.7-.32-1.24-.06-1.59-.07-4.74-.07Zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96Zm0 1.8a3.18 3.18 0 1 0 0 6.36 3.18 3.18 0 0 0 0-6.36Zm6.34-.32a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0Z" />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M23.5 6.5a3.02 3.02 0 0 0-2.12-2.14C19.5 3.85 12 3.85 12 3.85s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.6 24 12 24 12s0-3.6-.5-5.5ZM9.6 15.57V8.43L15.82 12 9.6 15.57Z" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.24 2.25h6.83l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
    </svg>
  );
}

const companyLinks = [
  { label: "Our Story", href: "/support" },
  { label: "Careers", href: "/support" },
  { label: "Dealer Locator", href: "/support" },
  { label: "Warranty", href: "/support" },
  { label: "Contact", href: "/support" },
];

const socials = [
  { Icon: InstagramIcon, href: brand.social.instagram, label: "Instagram" },
  { Icon: YoutubeIcon, href: brand.social.youtube, label: "YouTube" },
  { Icon: FacebookIcon, href: brand.social.facebook, label: "Facebook" },
  { Icon: XIcon, href: brand.social.x, label: "X" },
];

export function Footer() {
  return (
    <footer className="bg-ink-800">
      <Newsletter />
      <BackToTop />

      <div className="container-site pb-10 pt-4">
        <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex">
              <Logo className="h-14 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">
              {brand.tagline} Every product hand-inspected, test-fired, and
              guaranteed for life.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center border border-white/15 text-muted-light transition hover:border-gold hover:text-gold"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {nav.map((item) => (
            <div key={item.label}>
              <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-widest2 text-gold">
                {item.label}
              </h3>
              <ul className="space-y-2.5">
                {item.columns[0].links.slice(0, 5).map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-widest2 text-gold">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.legal}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/support" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/support" className="hover:text-white">
              Terms of Use
            </Link>
            <Link href="/support" className="hover:text-white">
              Accessibility
            </Link>
            <span className="hidden sm:inline">
              You must be 18+ to purchase. Comply with all local, state &amp;
              federal laws.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

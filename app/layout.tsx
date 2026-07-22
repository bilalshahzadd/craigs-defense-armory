import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/config";

const display = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://craigs-defense-armory.vercel.app"),
  title: {
    default: `${brand.fullName} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Precision-built rifles, pistols, and firearm accessories. Hand-assembled in the USA, fully ambidextrous, and guaranteed for life.",
  openGraph: {
    title: `${brand.fullName} — ${brand.tagline}`,
    description:
      "Precision-built rifles, pistols, and firearm accessories. Guaranteed for life.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-ink text-white antialiased">{children}</body>
    </html>
  );
}

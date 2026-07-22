import { brand } from "./config";

/**
 * Static marketing content (navigation + hero). Products, categories and
 * orders now live in Postgres — see `lib/queries.ts`.
 */

export type { Product, SpecGroup, Category } from "./types";

/* ------------------------------------------------------------------ */
/*  Imagery                                                            */
/* ------------------------------------------------------------------ */
export const IMG = {
  trigger: "/images/trigger-hero.png",
  rifleDesert: "/images/rifle-desert.png",
  rifleBlack: "/images/rifle-black.png",
  pistolBlack: "/images/pistol-black.png",
  charging: "/images/charging-handles.png",
  apparel: "/images/apparel.png",
} as const;

/* ------------------------------------------------------------------ */
/*  Navigation + Mega Menu                                             */
/* ------------------------------------------------------------------ */
export interface MegaLink {
  label: string;
  href: string;
  badge?: string;
}
export interface MegaColumn {
  heading: string;
  links: MegaLink[];
}
export interface NavItem {
  label: string;
  href: string;
  columns: MegaColumn[];
  feature: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    href: string;
    image: string;
  };
}

export const nav: NavItem[] = [
  {
    label: "Rifles",
    href: "/rifles",
    columns: [
      {
        heading: "Complete Rifles",
        links: [
          { label: "Model 1 Rifle", href: "/rifles/model-1-rifle" },
          { label: "Model 1 SBR", href: "/rifles/model-1-sbr" },
          { label: "Model 1 Ultralight", href: "/rifles/model-1-ultralight", badge: "New" },
          { label: "Model 1 · 6mm ARC", href: "/rifles/model-1-6arc" },
          { label: "Model 1 · 300 BLK", href: "/rifles/model-1-300blk" },
        ],
      },
      {
        heading: "Upper Receivers",
        links: [
          { label: "Complete Uppers", href: "/rifles" },
          { label: "Barreled Uppers", href: "/rifles" },
          { label: "Stripped Uppers", href: "/rifles" },
        ],
      },
      {
        heading: "By Caliber",
        links: [
          { label: ".223 Wylde", href: "/rifles" },
          { label: "300 Blackout", href: "/rifles" },
          { label: "6mm ARC", href: "/rifles" },
        ],
      },
    ],
    feature: {
      eyebrow: "Flagship",
      title: "Model 1™ Rifle",
      subtitle: "Hand-built, one at a time. Guaranteed for life.",
      cta: "Shop Rifles",
      href: "/rifles/model-1-rifle",
      image: IMG.rifleBlack,
    },
  },
  {
    label: "Pistols",
    href: "/pistols",
    columns: [
      {
        heading: "Complete Pistols",
        links: [
          { label: "Model 1 Pistol", href: "/pistols/model-1-pistol" },
          { label: "Model 1 PDW", href: "/pistols/model-1-pdw", badge: "New" },
          { label: "Model 1 · 300 BLK", href: "/pistols/model-1-pistol-300" },
        ],
      },
      {
        heading: "Upper Receivers",
        links: [
          { label: "Pistol Uppers", href: "/pistols" },
          { label: "Barreled Uppers", href: "/pistols" },
        ],
      },
      {
        heading: "By Caliber",
        links: [
          { label: "300 Blackout", href: "/pistols" },
          { label: ".223 Wylde", href: "/pistols" },
          { label: "9mm", href: "/pistols" },
        ],
      },
    ],
    feature: {
      eyebrow: "Compact",
      title: "Model 1™ Pistol",
      subtitle: "Full-size performance in a compact platform.",
      cta: "Shop Pistols",
      href: "/pistols/model-1-pistol",
      image: IMG.pistolBlack,
    },
  },
  {
    label: "Apparel & Gear",
    href: "/apparel-gear",
    columns: [
      {
        heading: "Accessories",
        links: [
          { label: "Charging Handles", href: "/apparel-gear/raptor-charging-handle" },
          { label: "Triggers", href: "/apparel-gear/vertex-cbx-trigger", badge: "New" },
          { label: "Muzzle Devices", href: "/apparel-gear/afterburner-brake" },
          { label: "Safety Selectors", href: "/apparel-gear/talon-safety" },
          { label: "Bolt Catches", href: "/apparel-gear" },
        ],
      },
      {
        heading: "Apparel",
        links: [
          { label: "T-Shirts", href: "/apparel-gear/standard-issue-tee" },
          { label: "Hoodies", href: "/apparel-gear/tactical-hoodie" },
          { label: "Headwear", href: "/apparel-gear/flag-snapback" },
          { label: "Outerwear", href: "/apparel-gear" },
        ],
      },
      {
        heading: "Gear",
        links: [
          { label: "Range Bags", href: "/apparel-gear" },
          { label: "Patches", href: "/apparel-gear" },
          { label: "Stickers", href: "/apparel-gear" },
          { label: "Gift Cards", href: "/apparel-gear" },
        ],
      },
    ],
    feature: {
      eyebrow: "Best Seller",
      title: "Raptor™ Charging Handles",
      subtitle: "Ambidextrous. Machined. Bombproof.",
      cta: "Shop Accessories",
      href: "/apparel-gear/raptor-charging-handle",
      image: IMG.charging,
    },
  },
  {
    label: "Support",
    href: "/support",
    columns: [
      {
        heading: "Help",
        links: [
          { label: "Contact Us", href: "/support" },
          { label: "FAQ", href: "/support" },
          { label: "Shipping Info", href: "/support" },
          { label: "Returns", href: "/support" },
        ],
      },
      {
        heading: "Warranty",
        links: [
          { label: "Guaranteed for Life", href: "/support" },
          { label: "Register Product", href: "/support" },
          { label: "Service Request", href: "/support" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "Our Story", href: "/support" },
          { label: "Dealer Locator", href: "/support" },
          { label: "Blog", href: "/support" },
          { label: "Careers", href: "/support" },
        ],
      },
    ],
    feature: {
      eyebrow: "Our Promise",
      title: "Guaranteed for Life",
      subtitle: `Every ${brand.name} product, backed forever.`,
      cta: "Learn More",
      href: "/support",
      image: IMG.rifleDesert,
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Hero carousel                                                     */
/* ------------------------------------------------------------------ */
export interface HeroSlide {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  detail?: string;
  cta: string;
  href: string;
  image: string;
}

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Now Available",
    title: `${brand.name} VERTEX`,
    titleAccent: "™",
    subtitle: "Single Stage CBX & FBX",
    detail: "Featuring Zero-Creep Technology",
    cta: "Shop Triggers",
    href: "/apparel-gear/vertex-cbx-trigger",
    image: IMG.trigger,
  },
  {
    eyebrow: "Precision Built",
    title: "MODEL 1 RIFLE",
    subtitle: "Fully Ambidextrous. Guaranteed for Life.",
    detail: "Hand-assembled, test-fired, and inspected by a gunsmith",
    cta: "Shop Rifles",
    href: "/rifles/model-1-rifle",
    image: IMG.rifleBlack,
  },
  {
    eyebrow: "Ambi Controls",
    title: "RAPTOR HANDLES",
    subtitle: "Ambidextrous. Machined. Bombproof.",
    detail: "The charging handle that started it all",
    cta: "Shop Accessories",
    href: "/apparel-gear/raptor-charging-handle",
    image: IMG.charging,
  },
  {
    eyebrow: "Field Tested",
    title: "BUILT FOR THE FIGHT",
    subtitle: "From the range to the backcountry.",
    detail: "American made. Life guaranteed.",
    cta: "Explore Rifles",
    href: "/rifles",
    image: IMG.rifleDesert,
  },
];

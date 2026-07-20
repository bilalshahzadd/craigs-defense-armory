import { brand } from "./config";

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
  align?: "left" | "center";
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

/* ------------------------------------------------------------------ */
/*  Category cards (home)                                             */
/* ------------------------------------------------------------------ */
export const categoryCards = [
  { title: "Rifles", href: "/rifles", image: IMG.rifleDesert },
  { title: "Accessories", href: "/apparel-gear", image: IMG.charging },
  { title: "Apparel & Gear", href: "/apparel-gear", image: IMG.apparel },
];

/* ------------------------------------------------------------------ */
/*  Products                                                          */
/* ------------------------------------------------------------------ */
export type Category = "rifles" | "pistols" | "apparel-gear";

export interface SpecGroup {
  title: string;
  items: string[];
}
export interface Product {
  slug: string;
  name: string;
  category: Category;
  categoryLabel: string;
  kind: "firearm" | "accessory" | "apparel";
  price: number;
  image: string;
  tagline: string;
  badge?: string;
  leadTime?: string;
  colors?: string[];
  description?: string;
  specGroups?: SpecGroup[];
}

const rifleSpecs: SpecGroup[] = [
  {
    title: "Rifle Specifications",
    items: [
      "Designed & Manufactured in the USA",
      "Upper Receiver, Lower Receiver and Hand Guard Cerakoted together for a perfect color match",
      "Weight: 6.0–8.0 lbs depending on configuration",
      "Guaranteed for Life",
    ],
  },
  {
    title: "Upper Receiver",
    items: [
      "Sub-MOA Accuracy Guarantee w/ match grade ammunition",
      "Billet Machined 7075-T6 Upper Receiver w/ M4 Feed Ramps",
      "Proprietary Extended Aluminum Hand Guard w/ M-LOK® Modular Mounting System",
      "Match Grade 416R Stainless Steel Barrel, chambered in .223 Wylde",
      "Threaded 1/2 x 28, ships with an ambidextrous muzzle brake",
      "Low-mass ambidextrous charging handle",
    ],
  },
  {
    title: "Lower Receiver",
    items: [
      "Billet Machined 7075-T6 Lower Receiver",
      "Fully ambidextrous controls: safety, bolt catch, and magazine release",
      "Single-stage flat trigger, tuned to 3.5 lbs",
      "Magpul® MOE® grip and adjustable stock",
      "Accepts all standard AR-15 magazines",
    ],
  },
];

export const products: Product[] = [
  /* -------------------------------- Rifles ------------------------------- */
  {
    slug: "model-1-rifle",
    name: "Model 1™ Rifle",
    category: "rifles",
    categoryLabel: "Rifles",
    kind: "firearm",
    price: 2400,
    image: IMG.rifleBlack,
    tagline: "The flagship. Hand-built and guaranteed for life.",
    badge: "Built to Order",
    leadTime: "30 Business Days",
    colors: ["Black", "FDE", "Tungsten"],
    description:
      "The design philosophy behind the Model 1 is simple: use the highest quality raw materials, the most precise CNC machining, and the best components available to create a weapon that seamlessly blends form and function. Every Model 1 is assembled by hand, one at a time, by a trained gunsmith who inspects, test-fires, and cleans the weapon to personally guarantee it meets the most rigid quality standards.",
    specGroups: rifleSpecs,
  },
  {
    slug: "model-1-sbr",
    name: "Model 1™ SBR",
    category: "rifles",
    categoryLabel: "Rifles",
    kind: "firearm",
    price: 2550,
    image: IMG.rifleBlack,
    tagline: "Short-barreled precision for close quarters.",
    badge: "Built to Order",
    leadTime: "30 Business Days",
    colors: ["Black", "FDE"],
    description:
      "A short-barreled configuration of the Model 1 platform, purpose-built for maneuverability without sacrificing the accuracy or reliability the Model 1 is known for.",
    specGroups: rifleSpecs,
  },
  {
    slug: "model-1-ultralight",
    name: "Model 1™ Ultralight",
    category: "rifles",
    categoryLabel: "Rifles",
    kind: "firearm",
    price: 2650,
    image: IMG.rifleBlack,
    tagline: "Every ounce, engineered out.",
    badge: "New",
    leadTime: "30 Business Days",
    colors: ["Black", "Tungsten"],
    description:
      "Weight-reducing fluted barrel, skeletonized components, and a lightweight hand guard bring the Model 1 down to its fighting weight — without compromising durability.",
    specGroups: rifleSpecs,
  },
  {
    slug: "model-1-6arc",
    name: "Model 1™ 6mm ARC",
    category: "rifles",
    categoryLabel: "Rifles",
    kind: "firearm",
    price: 2700,
    image: IMG.rifleBlack,
    tagline: "Extended range in an AR-15 footprint.",
    badge: "Built to Order",
    leadTime: "30 Business Days",
    colors: ["Black", "FDE"],
    description:
      "Chambered in 6mm ARC for flatter trajectories and more energy on target at distance, while retaining the compact AR-15 platform.",
    specGroups: rifleSpecs,
  },
  {
    slug: "model-1-300blk",
    name: "Model 1™ 300 BLK",
    category: "rifles",
    categoryLabel: "Rifles",
    kind: "firearm",
    price: 2450,
    image: IMG.rifleBlack,
    tagline: "Suppressor-ready. Subsonic-friendly.",
    badge: "Built to Order",
    leadTime: "30 Business Days",
    colors: ["Black", "FDE"],
    description:
      "Chambered in 300 Blackout and optimized for suppressed shooting, cycling reliably across supersonic and subsonic loads.",
    specGroups: rifleSpecs,
  },

  /* -------------------------------- Pistols ------------------------------ */
  {
    slug: "model-1-pistol",
    name: "Model 1™ Pistol",
    category: "pistols",
    categoryLabel: "Pistols",
    kind: "firearm",
    price: 2300,
    image: IMG.pistolBlack,
    tagline: "Full-size performance, compact platform.",
    badge: "Built to Order",
    leadTime: "30 Business Days",
    colors: ["Black", "FDE"],
    description:
      "The Model 1 Pistol packs the same fully ambidextrous controls and match-grade internals into a compact, brace-equipped package built for close quarters.",
    specGroups: rifleSpecs,
  },
  {
    slug: "model-1-pdw",
    name: "Model 1™ PDW",
    category: "pistols",
    categoryLabel: "Pistols",
    kind: "firearm",
    price: 2450,
    image: IMG.pistolBlack,
    tagline: "The smallest fighting platform we build.",
    badge: "New",
    leadTime: "30 Business Days",
    colors: ["Black", "Tungsten"],
    description:
      "An ultra-compact personal defense weapon configuration with a collapsing brace, tuned to run reliably at the shortest barrel lengths.",
    specGroups: rifleSpecs,
  },
  {
    slug: "model-1-pistol-300",
    name: "Model 1™ Pistol · 300 BLK",
    category: "pistols",
    categoryLabel: "Pistols",
    kind: "firearm",
    price: 2400,
    image: IMG.pistolBlack,
    tagline: "Compact and suppressor-ready.",
    badge: "Built to Order",
    leadTime: "30 Business Days",
    colors: ["Black", "FDE"],
    description:
      "300 Blackout in the compact Model 1 Pistol platform — purpose-built for a short, suppressed, hard-hitting package.",
    specGroups: rifleSpecs,
  },

  /* ------------------------------ Accessories ---------------------------- */
  {
    slug: "raptor-charging-handle",
    name: "Raptor™ Charging Handle",
    category: "apparel-gear",
    categoryLabel: "Accessories",
    kind: "accessory",
    price: 95,
    image: IMG.charging,
    tagline: "The original ambidextrous charging handle.",
    badge: "Best Seller",
    colors: ["Black", "FDE", "Bronze", "Grey"],
    description:
      "Machined from 7075-T6 aluminum and hard-coat anodized, the Raptor's dual full-length latches let you run the gun from either side with total control.",
    specGroups: [
      {
        title: "Specifications",
        items: [
          "7075-T6 aluminum, Type III hard-coat anodized",
          "Fully ambidextrous dual latches",
          "Gas-deflecting geometry for suppressed use",
          "Drop-in install, no gunsmithing required",
          "Made in the USA · Guaranteed for Life",
        ],
      },
    ],
  },
  {
    slug: "vertex-cbx-trigger",
    name: "Vertex™ CBX Trigger",
    category: "apparel-gear",
    categoryLabel: "Accessories",
    kind: "accessory",
    price: 240,
    image: IMG.trigger,
    tagline: "Single-stage, curved-bow, zero creep.",
    badge: "New",
    colors: ["Black"],
    description:
      "A drop-in single-stage trigger with a fixed 3.5 lb pull and Zero-Creep technology for an immediate, glass-rod break and a positive reset.",
    specGroups: [
      {
        title: "Specifications",
        items: [
          "Fixed 3.5 lb single-stage pull",
          "Curved-bow (CBX) trigger shoe",
          "Zero-Creep break with positive reset",
          "Fully self-contained drop-in cassette",
          "Made in the USA · Guaranteed for Life",
        ],
      },
    ],
  },
  {
    slug: "afterburner-brake",
    name: "Afterburner™ Muzzle Brake",
    category: "apparel-gear",
    categoryLabel: "Accessories",
    kind: "accessory",
    price: 159,
    image: IMG.charging,
    tagline: "Flat recoil. Minimal rise.",
    colors: ["Black", "Bronze"],
    description:
      "A three-port muzzle brake tuned to flatten recoil and keep the sight picture flat, so follow-up shots stay on target.",
    specGroups: [
      {
        title: "Specifications",
        items: [
          "Heat-treated 17-4 stainless steel",
          "1/2 x 28 threading (.223 / 5.56)",
          "Three-chamber recoil mitigation",
          "Timing shims included",
          "Made in the USA",
        ],
      },
    ],
  },
  {
    slug: "talon-safety",
    name: "Talon™ Safety Selector",
    category: "apparel-gear",
    categoryLabel: "Accessories",
    kind: "accessory",
    price: 65,
    image: IMG.charging,
    tagline: "Ambidextrous. 45° or 90° throw.",
    colors: ["Black", "FDE"],
    description:
      "A fully ambidextrous safety selector with swappable levers and a configurable 45° or 90° throw for a fast, intuitive manual of arms.",
    specGroups: [
      {
        title: "Specifications",
        items: [
          "Fully ambidextrous",
          "Configurable 45° / 90° throw",
          "Two lever lengths included",
          "Stainless detent hardware",
          "Made in the USA",
        ],
      },
    ],
  },

  /* -------------------------------- Apparel ------------------------------ */
  {
    slug: "standard-issue-tee",
    name: "Standard Issue Tee",
    category: "apparel-gear",
    categoryLabel: "Apparel",
    kind: "apparel",
    price: 32,
    image: IMG.apparel,
    tagline: "Ring-spun cotton. Broken-in feel.",
    colors: ["Olive", "Black", "Sand", "Grey"],
    description:
      "A heavyweight ring-spun cotton tee with a screen-printed logo, built to hold up wash after wash.",
  },
  {
    slug: "tactical-hoodie",
    name: "Tactical Hoodie",
    category: "apparel-gear",
    categoryLabel: "Apparel",
    kind: "apparel",
    price: 68,
    image: IMG.apparel,
    tagline: "Midweight fleece. Everyday carry.",
    colors: ["Black", "Olive", "Charcoal"],
    description:
      "A midweight fleece pullover hoodie with a kangaroo pocket and an embroidered mark on the chest.",
  },
  {
    slug: "flag-snapback",
    name: "Flag Snapback",
    category: "apparel-gear",
    categoryLabel: "Headwear",
    kind: "apparel",
    price: 28,
    image: IMG.apparel,
    tagline: "Structured six-panel. Adjustable fit.",
    colors: ["Black/Gold", "Olive", "Multicam"],
    description:
      "A structured six-panel snapback with an embroidered mark and a subdued flag patch on the side.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
export function getByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}
export const categoryMeta: Record<
  Category,
  { title: string; label: string; blurb: string; image: string }
> = {
  rifles: {
    title: "Rifles",
    label: "Rifles",
    blurb:
      "Hand-built, fully ambidextrous, and guaranteed for life. Every rifle is assembled and test-fired one at a time.",
    image: IMG.rifleBlack,
  },
  pistols: {
    title: "Pistols",
    label: "Pistols",
    blurb:
      "Compact platforms with full-size performance and the same match-grade internals as our rifles.",
    image: IMG.pistolBlack,
  },
  "apparel-gear": {
    title: "Apparel & Gear",
    label: "Apparel & Gear",
    blurb:
      "Precision accessories, everyday carry, and represent-the-brand apparel — engineered and tested like everything we make.",
    image: IMG.charging,
  },
};

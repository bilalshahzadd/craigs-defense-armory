import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const IMG = {
  trigger: "/images/trigger-hero.png",
  rifleDesert: "/images/rifle-desert.png",
  rifleBlack: "/images/rifle-black.png",
  pistolBlack: "/images/pistol-black.png",
  charging: "/images/charging-handles.png",
  apparel: "/images/apparel.png",
};

const rifleSpecs = [
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

const accSpecs = (items) => [{ title: "Specifications", items }];

const categories = [
  {
    slug: "rifles",
    name: "Rifles",
    blurb:
      "Hand-built, fully ambidextrous, and guaranteed for life. Every rifle is assembled and test-fired one at a time.",
    image_url: IMG.rifleBlack,
    sort_order: 1,
  },
  {
    slug: "pistols",
    name: "Pistols",
    blurb:
      "Compact platforms with full-size performance and the same match-grade internals as our rifles.",
    image_url: IMG.pistolBlack,
    sort_order: 2,
  },
  {
    slug: "apparel-gear",
    name: "Apparel & Gear",
    blurb:
      "Precision accessories, everyday carry, and represent-the-brand apparel — engineered and tested like everything we make.",
    image_url: IMG.charging,
    sort_order: 3,
  },
];

const products = [
  // Rifles
  { slug: "model-1-rifle", name: "Model 1™ Rifle", category_slug: "rifles", category_label: "Rifles", kind: "firearm", price: 2400, image_url: IMG.rifleBlack, tagline: "The flagship. Hand-built and guaranteed for life.", badge: "Built to Order", lead_time: "30 Business Days", colors: ["Black", "FDE", "Tungsten"], stock: 8, description: "The design philosophy behind the Model 1 is simple: use the highest quality raw materials, the most precise CNC machining, and the best components available to create a weapon that seamlessly blends form and function. Every Model 1 is assembled by hand, one at a time, by a trained gunsmith who inspects, test-fires, and cleans the weapon to personally guarantee it meets the most rigid quality standards.", spec_groups: rifleSpecs },
  { slug: "model-1-sbr", name: "Model 1™ SBR", category_slug: "rifles", category_label: "Rifles", kind: "firearm", price: 2550, image_url: IMG.rifleBlack, tagline: "Short-barreled precision for close quarters.", badge: "Built to Order", lead_time: "30 Business Days", colors: ["Black", "FDE"], stock: 5, description: "A short-barreled configuration of the Model 1 platform, purpose-built for maneuverability without sacrificing the accuracy or reliability the Model 1 is known for.", spec_groups: rifleSpecs },
  { slug: "model-1-ultralight", name: "Model 1™ Ultralight", category_slug: "rifles", category_label: "Rifles", kind: "firearm", price: 2650, image_url: IMG.rifleBlack, tagline: "Every ounce, engineered out.", badge: "New", lead_time: "30 Business Days", colors: ["Black", "Tungsten"], stock: 3, description: "Weight-reducing fluted barrel, skeletonized components, and a lightweight hand guard bring the Model 1 down to its fighting weight — without compromising durability.", spec_groups: rifleSpecs },
  { slug: "model-1-6arc", name: "Model 1™ 6mm ARC", category_slug: "rifles", category_label: "Rifles", kind: "firearm", price: 2700, image_url: IMG.rifleBlack, tagline: "Extended range in an AR-15 footprint.", badge: "Built to Order", lead_time: "30 Business Days", colors: ["Black", "FDE"], stock: 4, description: "Chambered in 6mm ARC for flatter trajectories and more energy on target at distance, while retaining the compact AR-15 platform.", spec_groups: rifleSpecs },
  { slug: "model-1-300blk", name: "Model 1™ 300 BLK", category_slug: "rifles", category_label: "Rifles", kind: "firearm", price: 2450, image_url: IMG.rifleBlack, tagline: "Suppressor-ready. Subsonic-friendly.", badge: "Built to Order", lead_time: "30 Business Days", colors: ["Black", "FDE"], stock: 6, description: "Chambered in 300 Blackout and optimized for suppressed shooting, cycling reliably across supersonic and subsonic loads.", spec_groups: rifleSpecs },
  // Pistols
  { slug: "model-1-pistol", name: "Model 1™ Pistol", category_slug: "pistols", category_label: "Pistols", kind: "firearm", price: 2300, image_url: IMG.pistolBlack, tagline: "Full-size performance, compact platform.", badge: "Built to Order", lead_time: "30 Business Days", colors: ["Black", "FDE"], stock: 7, description: "The Model 1 Pistol packs the same fully ambidextrous controls and match-grade internals into a compact, brace-equipped package built for close quarters.", spec_groups: rifleSpecs },
  { slug: "model-1-pdw", name: "Model 1™ PDW", category_slug: "pistols", category_label: "Pistols", kind: "firearm", price: 2450, image_url: IMG.pistolBlack, tagline: "The smallest fighting platform we build.", badge: "New", lead_time: "30 Business Days", colors: ["Black", "Tungsten"], stock: 2, description: "An ultra-compact personal defense weapon configuration with a collapsing brace, tuned to run reliably at the shortest barrel lengths.", spec_groups: rifleSpecs },
  { slug: "model-1-pistol-300", name: "Model 1™ Pistol · 300 BLK", category_slug: "pistols", category_label: "Pistols", kind: "firearm", price: 2400, image_url: IMG.pistolBlack, tagline: "Compact and suppressor-ready.", badge: "Built to Order", lead_time: "30 Business Days", colors: ["Black", "FDE"], stock: 5, description: "300 Blackout in the compact Model 1 Pistol platform — purpose-built for a short, suppressed, hard-hitting package.", spec_groups: rifleSpecs },
  // Accessories
  { slug: "raptor-charging-handle", name: "Raptor™ Charging Handle", category_slug: "apparel-gear", category_label: "Accessories", kind: "accessory", price: 95, image_url: IMG.charging, tagline: "The original ambidextrous charging handle.", badge: "Best Seller", lead_time: null, colors: ["Black", "FDE", "Bronze", "Grey"], stock: 120, description: "Machined from 7075-T6 aluminum and hard-coat anodized, the Raptor's dual full-length latches let you run the gun from either side with total control.", spec_groups: accSpecs(["7075-T6 aluminum, Type III hard-coat anodized", "Fully ambidextrous dual latches", "Gas-deflecting geometry for suppressed use", "Drop-in install, no gunsmithing required", "Made in the USA · Guaranteed for Life"]) },
  { slug: "vertex-cbx-trigger", name: "Vertex™ CBX Trigger", category_slug: "apparel-gear", category_label: "Accessories", kind: "accessory", price: 240, image_url: IMG.trigger, tagline: "Single-stage, curved-bow, zero creep.", badge: "New", lead_time: null, colors: ["Black"], stock: 64, description: "A drop-in single-stage trigger with a fixed 3.5 lb pull and Zero-Creep technology for an immediate, glass-rod break and a positive reset.", spec_groups: accSpecs(["Fixed 3.5 lb single-stage pull", "Curved-bow (CBX) trigger shoe", "Zero-Creep break with positive reset", "Fully self-contained drop-in cassette", "Made in the USA · Guaranteed for Life"]) },
  { slug: "afterburner-brake", name: "Afterburner™ Muzzle Brake", category_slug: "apparel-gear", category_label: "Accessories", kind: "accessory", price: 159, image_url: IMG.charging, tagline: "Flat recoil. Minimal rise.", badge: null, lead_time: null, colors: ["Black", "Bronze"], stock: 48, description: "A three-port muzzle brake tuned to flatten recoil and keep the sight picture flat, so follow-up shots stay on target.", spec_groups: accSpecs(["Heat-treated 17-4 stainless steel", "1/2 x 28 threading (.223 / 5.56)", "Three-chamber recoil mitigation", "Timing shims included", "Made in the USA"]) },
  { slug: "talon-safety", name: "Talon™ Safety Selector", category_slug: "apparel-gear", category_label: "Accessories", kind: "accessory", price: 65, image_url: IMG.charging, tagline: "Ambidextrous. 45° or 90° throw.", badge: null, lead_time: null, colors: ["Black", "FDE"], stock: 87, description: "A fully ambidextrous safety selector with swappable levers and a configurable 45° or 90° throw for a fast, intuitive manual of arms.", spec_groups: accSpecs(["Fully ambidextrous", "Configurable 45° / 90° throw", "Two lever lengths included", "Stainless detent hardware", "Made in the USA"]) },
  // Apparel
  { slug: "standard-issue-tee", name: "Standard Issue Tee", category_slug: "apparel-gear", category_label: "Apparel", kind: "apparel", price: 32, image_url: IMG.apparel, tagline: "Ring-spun cotton. Broken-in feel.", badge: null, lead_time: null, colors: ["Olive", "Black", "Sand", "Grey"], stock: 140, description: "A heavyweight ring-spun cotton tee with a screen-printed logo, built to hold up wash after wash.", spec_groups: [] },
  { slug: "tactical-hoodie", name: "Tactical Hoodie", category_slug: "apparel-gear", category_label: "Apparel", kind: "apparel", price: 68, image_url: IMG.apparel, tagline: "Midweight fleece. Everyday carry.", badge: null, lead_time: null, colors: ["Black", "Olive", "Charcoal"], stock: 75, description: "A midweight fleece pullover hoodie with a kangaroo pocket and an embroidered mark on the chest.", spec_groups: [] },
  { slug: "flag-snapback", name: "Flag Snapback", category_slug: "apparel-gear", category_label: "Headwear", kind: "apparel", price: 28, image_url: IMG.apparel, tagline: "Structured six-panel. Adjustable fit.", badge: null, lead_time: null, colors: ["Black/Gold", "Olive", "Multicam"], stock: 96, description: "A structured six-panel snapback with an embroidered mark and a subdued flag patch on the side.", spec_groups: [] },
];

async function main() {
  console.log("→ creating tables…");

  await sql`
    create table if not exists categories (
      id serial primary key,
      slug text unique not null,
      name text not null,
      blurb text,
      image_url text,
      sort_order int default 0,
      created_at timestamptz default now()
    )`;

  await sql`
    create table if not exists products (
      id serial primary key,
      slug text unique not null,
      name text not null,
      category_slug text not null,
      category_label text,
      kind text default 'accessory',
      price numeric(10,2) not null default 0,
      image_url text,
      tagline text,
      description text,
      badge text,
      lead_time text,
      colors jsonb default '[]'::jsonb,
      spec_groups jsonb default '[]'::jsonb,
      stock int not null default 0,
      is_active boolean not null default true,
      sort_order int default 0,
      created_at timestamptz default now(),
      updated_at timestamptz default now()
    )`;

  await sql`
    create table if not exists orders (
      id serial primary key,
      order_number text unique not null,
      customer_name text,
      customer_email text,
      status text not null default 'pending',
      subtotal numeric(10,2) default 0,
      items jsonb default '[]'::jsonb,
      created_at timestamptz default now()
    )`;

  // Uploaded product images live in Postgres and are served via /api/images/:id
  await sql`
    create table if not exists product_images (
      id serial primary key,
      filename text not null,
      mime text not null,
      data text not null,
      created_at timestamptz default now()
    )`;

  await sql`create index if not exists products_category_idx on products (category_slug)`;
  await sql`create index if not exists products_active_idx on products (is_active)`;

  console.log("→ seeding categories…");
  for (const c of categories) {
    await sql`
      insert into categories (slug, name, blurb, image_url, sort_order)
      values (${c.slug}, ${c.name}, ${c.blurb}, ${c.image_url}, ${c.sort_order})
      on conflict (slug) do update set
        name = excluded.name,
        blurb = excluded.blurb,
        image_url = excluded.image_url,
        sort_order = excluded.sort_order`;
  }

  console.log("→ seeding products…");
  let i = 0;
  for (const p of products) {
    await sql`
      insert into products (
        slug, name, category_slug, category_label, kind, price, image_url,
        tagline, description, badge, lead_time, colors, spec_groups, stock,
        is_active, sort_order
      ) values (
        ${p.slug}, ${p.name}, ${p.category_slug}, ${p.category_label}, ${p.kind},
        ${p.price}, ${p.image_url}, ${p.tagline}, ${p.description}, ${p.badge},
        ${p.lead_time}, ${JSON.stringify(p.colors)}::jsonb,
        ${JSON.stringify(p.spec_groups)}::jsonb, ${p.stock}, true, ${i++}
      )
      on conflict (slug) do nothing`;
  }

  const [{ count: catCount }] = await sql`select count(*)::int from categories`;
  const [{ count: prodCount }] = await sql`select count(*)::int from products`;
  console.log(`✓ done — ${catCount} categories, ${prodCount} products`);
}

main().catch((e) => {
  console.error("MIGRATION FAILED:", e.message);
  process.exit(1);
});

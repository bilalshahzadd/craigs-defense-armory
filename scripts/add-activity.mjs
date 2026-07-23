import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`
  create table if not exists login_events (
    id serial primary key,
    success boolean not null default true,
    ip text,
    city text,
    region text,
    country text,
    user_agent text,
    created_at timestamptz default now()
  )`;

await sql`create index if not exists login_events_created_idx on login_events (created_at desc)`;

console.log("✓ login_events table ready");

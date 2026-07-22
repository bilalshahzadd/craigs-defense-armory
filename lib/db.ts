import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env.local (local) and to the Vercel project env vars (production)."
  );
}

export const sql = neon(connectionString);

/** Threshold under which a product is flagged as "low stock" in the admin. */
export const LOW_STOCK_THRESHOLD = 5;

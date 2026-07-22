/**
 * Minimal signed-cookie session for the admin area.
 * There are no customer accounts — only a single admin password — so this
 * keeps things dependency-free and Edge-compatible (uses Web Crypto, which
 * works in both middleware and server actions).
 */

export const COOKIE = "cda_session";
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const encoder = new TextEncoder();

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return s;
}

async function hmacKey() {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Constant-time-ish comparison of two hex strings. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createToken(ttlMs = SESSION_TTL_MS): Promise<string> {
  const payload = String(Date.now() + ttlMs);
  const sig = await crypto.subtle.sign(
    "HMAC",
    await hmacKey(),
    encoder.encode(payload)
  );
  return `${payload}.${toHex(sig)}`;
}

export async function verifyToken(token?: string | null): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const exp = Number(payload);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;

  const expected = await crypto.subtle.sign(
    "HMAC",
    await hmacKey(),
    encoder.encode(payload)
  );
  return safeEqual(toHex(expected), sig);
}

"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, SESSION_TTL_MS, createToken } from "@/lib/auth";
import { logLoginEvent } from "@/lib/queries";

export interface LoginState {
  error?: string;
}

function decode(v: string | null): string | null {
  if (!v) return null;
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

/** Record a login attempt with IP + geo (Vercel headers). Never throws. */
async function record(success: boolean) {
  try {
    const h = headers();
    const fwd = h.get("x-forwarded-for");
    const ip = (fwd ? fwd.split(",")[0].trim() : h.get("x-real-ip")) || null;
    await logLoginEvent({
      success,
      ip,
      city: decode(h.get("x-vercel-ip-city")),
      region: decode(h.get("x-vercel-ip-country-region")),
      country: h.get("x-vercel-ip-country"),
      userAgent: h.get("user-agent"),
    });
  } catch {
    // logging must never block sign-in
  }
}

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return { error: "ADMIN_PASSWORD is not configured on the server." };

  if (password !== expected) {
    await record(false);
    return { error: "Incorrect password. Try again." };
  }

  await record(true);

  cookies().set(COOKIE, await createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  cookies().delete(COOKIE);
  redirect("/login");
}

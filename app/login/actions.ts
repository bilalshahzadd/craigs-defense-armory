"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, SESSION_TTL_MS, createToken } from "@/lib/auth";

export interface LoginState {
  error?: string;
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
    return { error: "Incorrect password. Try again." };
  }

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

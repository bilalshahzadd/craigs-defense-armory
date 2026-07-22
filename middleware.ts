import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE, verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE)?.value;
  const authed = await verifyToken(token);

  if (!authed) {
    // API calls get a 401 rather than an HTML redirect
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = new URL("/login", req.url);
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/upload"],
};

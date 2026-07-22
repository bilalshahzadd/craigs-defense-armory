import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const runtime = "nodejs";

/** Max base64 payload (~4.5 MB of binary). */
const MAX_BASE64 = 6_000_000;

export async function POST(req: Request) {
  try {
    const { filename, mime, data } = await req.json();

    if (typeof data !== "string" || typeof mime !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    if (!mime.startsWith("image/")) {
      return NextResponse.json({ error: "Only images allowed" }, { status: 400 });
    }
    if (data.length > MAX_BASE64) {
      return NextResponse.json(
        { error: "Image too large — keep it under ~4MB" },
        { status: 413 }
      );
    }

    const rows = await sql`
      insert into product_images (filename, mime, data)
      values (${String(filename ?? "upload")}, ${mime}, ${data})
      returning id`;

    return NextResponse.json({ url: `/api/images/${rows[0].id}` });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

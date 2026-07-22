import { sql } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return new Response("Not found", { status: 404 });

  const rows = await sql`
    select mime, data from product_images where id = ${id} limit 1`;

  if (rows.length === 0) return new Response("Not found", { status: 404 });

  const buffer = Buffer.from(String(rows[0].data), "base64");

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": String(rows[0].mime),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

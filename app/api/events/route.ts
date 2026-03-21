import { NextResponse } from "next/server";
import { incrementEvent } from "../../../src/lib/analyticsStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (
      body &&
      (body.type === "page_view" || body.type === "affiliate_click") &&
      typeof body.categorySlug === "string"
    ) {
      incrementEvent({
        type: body.type,
        categorySlug: body.categorySlug,
      });
    }
    // Best-effort: for MVP we rely on localStorage, but server-side logging
    // helps when testing.
    console.log("[pokemon:events]", body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}


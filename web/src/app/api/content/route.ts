import { NextResponse } from "next/server";
import { getPageContent } from "@/lib/content/getContent";

/**
 * Public read API for portal-managed frontend texts.
 * Used by client components that can't call the server helper directly.
 * GET /api/content?page=contact → { hero_title: "...", hero_sub: "..." }
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = (searchParams.get("page") || "home").slice(0, 60);
  const data = await getPageContent(page);
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}

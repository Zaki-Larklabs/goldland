import { db } from "@/lib/db";
import { contentBlocks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { CONTENT_REGISTRY } from "./registry";

async function fetchPageContent(page: string): Promise<Record<string, string>> {
  try {
    const rows = await db.select().from(contentBlocks).where(eq(contentBlocks.page, page));
    const out: Record<string, string> = {};
    for (const r of rows) {
      if (r.value != null && r.value !== "") out[r.key] = r.value;
    }
    return out;
  } catch {
    return {};
  }
}

const getCachedPageContent = unstable_cache(fetchPageContent, ["content-blocks"], {
  revalidate: 3600,
  tags: ["content"],
});

/**
 * All portal overrides for a page as { key: value }.
 * Missing keys simply aren't present — callers must fall back to defaults.
 */
export async function getPageContent(page: string): Promise<Record<string, string>> {
  return getCachedPageContent(page.trim() || "home");
}

/**
 * Single editable text with hardcoded fallback.
 * Usage in pages: {await getContent("home", "hero_sub", "Default copy…")}
 * Prefer getPageContent() once per page over many getContent() calls.
 */
export async function getContent(page: string, key: string, fallback = ""): Promise<string> {
  const all = await getPageContent(page);
  return all[key] ?? fallback;
}

/** Registry default for a (page, key) — used by the admin tab. */
export function registryDefault(page: string, key: string): string {
  return CONTENT_REGISTRY.find((e) => e.page === page && e.key === key)?.default ?? "";
}

/** All rows (for admin) merged with registry so defaults are editable pre-save. */
export async function getContentAdminList(): Promise<
  { page: string; key: string; label: string; value: string; isDefault: boolean; updatedAt: Date | null }[]
> {
  let rows: any[] = [];
  try {
    rows = await db.select().from(contentBlocks);
  } catch {
    rows = [];
  }
  const byKey = new Map(rows.map((r: any) => [`${r.page}::${r.key}`, r]));
  const out = CONTENT_REGISTRY.map((e) => {
    const row = byKey.get(`${e.page}::${e.key}`);
    byKey.delete(`${e.page}::${e.key}`);
    return {
      page: e.page,
      key: e.key,
      label: e.label,
      value: row?.value ?? e.default,
      isDefault: !row || row.value == null || row.value === "",
      updatedAt: row?.updatedAt ?? null,
    };
  });
  // Custom rows not in registry (added via "new block" form)
  for (const r of byKey.values()) {
    out.push({
      page: r.page,
      key: r.key,
      label: r.label || `${r.page} › ${r.key}`,
      value: r.value ?? "",
      isDefault: false,
      updatedAt: r.updatedAt ?? null,
    });
  }
  return out.sort((a, b) => (a.page + a.key).localeCompare(b.page + b.key));
}

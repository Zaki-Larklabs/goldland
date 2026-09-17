"use server";
import { db } from "@/lib/db";
import { contentBlocks } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";

function pageToPath(page: string): string {
  const p = page.trim() || "home";
  return p === "home" ? "/" : p.startsWith("/") ? p : `/${p}`;
}

// Pages rendered inside shared chrome (header/footer) live on every route —
// bust the root layout cache so all pages pick up the change at once.
const SHARED_PAGES = new Set(["footer", "header", "site"]);

export async function upsertContent(formData: FormData) {
  const page = ((formData.get("page") as string) || "home").trim();
  const key = ((formData.get("key") as string) || "").trim();
  const value = (formData.get("value") as string) ?? "";
  const label = ((formData.get("label") as string) || "").trim() || null;
  if (!key) return { success: false, error: "Key is required" };
  const id = `content-${Date.now()}`;
  try {
    const existing = await db
      .select()
      .from(contentBlocks)
      .where(and(eq(contentBlocks.page, page), eq(contentBlocks.key, key)))
      .limit(1);
    if (existing.length) {
      await db
        .update(contentBlocks)
        .set({ value, label: label ?? existing[0].label, updatedAt: new Date() })
        .where(and(eq(contentBlocks.page, page), eq(contentBlocks.key, key)));
    } else {
      await db.insert(contentBlocks).values({ id, page, key, label, value, updatedAt: new Date() });
    }
    revalidatePath("/admin");
    revalidatePath(pageToPath(page));
    if (SHARED_PAGES.has(page.trim())) revalidatePath("/", "layout");
    revalidateTag("content", "max");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, error: String(e) };
  }
}

export async function resetContent(page: string, key: string) {
  try {
    await db
      .delete(contentBlocks)
      .where(and(eq(contentBlocks.page, page), eq(contentBlocks.key, key)));
    revalidatePath("/admin");
    revalidatePath(pageToPath(page));
    if (SHARED_PAGES.has(page.trim())) revalidatePath("/", "layout");
    revalidateTag("content", "max");
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

"use server";
import { db } from "@/lib/db";
import { guides } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";

export async function upsertBlog(formData: FormData) {
  const id = (formData.get("id") as string) || `guide-${Date.now()}`;
  const slug = (formData.get("slug") as string)?.trim().toLowerCase().replace(/\s+/g, "-");
  const title = (formData.get("title") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string) || null;
  const content = (formData.get("content") as string) || null;
  const coverImage = (formData.get("coverImage") as string) || null;
  const category = (formData.get("category") as string) || null;
  const status = (formData.get("status") as string) || "draft";
  const tagsRaw = (formData.get("tags") as string) || "";
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : null;
  const publishedAt = status === "published" ? new Date() : null;
  if (!slug || !title) return { success: false, error: "Slug and title required" };
  try {
    const existing = await db.select().from(guides).where(eq(guides.slug, slug)).limit(1);
    if (existing.length && existing[0].id !== id) return { success: false, error: "Slug already exists" };
    const byId = await db.select().from(guides).where(eq(guides.id, id)).limit(1);
    if (byId.length) {
      await db.update(guides).set({ slug, title, excerpt, content, coverImage, category, status, tags, publishedAt, updatedAt: new Date() }).where(eq(guides.id, id));
    } else {
      await db.insert(guides).values({ id, slug, title, excerpt, content, coverImage, category, status, tags, publishedAt, updatedAt: new Date() });
    }
    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/guides");
    revalidatePath(`/guides/${slug}`);
    revalidatePath("/");
    revalidateTag("seo", "max");
    return { success: true };
  } catch (e) { console.error(e); return { success: false, error: String(e) }; }
}

export async function deleteBlog(id: string) {
  try { await db.delete(guides).where(eq(guides.id, id)); revalidatePath("/admin"); revalidatePath("/blog"); return { success: true }; } catch (e) { return { success: false, error: String(e) }; }
}

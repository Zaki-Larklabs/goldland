"use server";
import { db } from "@/lib/db";
import { seoRecords, redirects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";

export async function upsertSeo(formData: FormData) {
  const routeRaw = (formData.get("route") as string) || "";
  let route = routeRaw.trim();
  if (!route.startsWith("/")) route = "/" + route;
  if (route.length > 1 && route.endsWith("/")) route = route.slice(0, -1);
  const title = (formData.get("title") as string) || null;
  const description = (formData.get("description") as string) || null;
  const keywords = (formData.get("keywords") as string) || null;
  const h1 = ((formData.get("h1") as string) || "").trim() || null;
  const h2 = ((formData.get("h2") as string) || "").trim() || null;
  const ogImage = (formData.get("ogImage") as string) || null;
  const canonical = (formData.get("canonical") as string) || null;
  const noindex = formData.get("noindex") === "on";
  const robots = (formData.get("robots") as string) || null;
  const id = `seo-${Date.now()}`;
  try {
    const existing = await db.select().from(seoRecords).where(eq(seoRecords.route, route)).limit(1);
    if (existing.length) {
      await db.update(seoRecords).set({ title, description, keywords, h1, h2, ogImage, canonical, noindex, robots, updatedAt: new Date() }).where(eq(seoRecords.route, route));
    } else {
      await db.insert(seoRecords).values({ id, route, title, description, keywords, h1, h2, ogImage, canonical, noindex, robots, updatedAt: new Date() });
    }
    revalidatePath("/admin");
    revalidatePath(route);
    revalidateTag("seo", "max");
    return { success: true };
  } catch (e) { console.error(e); return { success: false, error: String(e) }; }
}

export async function deleteSeo(route: string) {
  try {
    await db.delete(seoRecords).where(eq(seoRecords.route, route));
    revalidatePath("/admin");
    revalidateTag("seo", "max");
    return { success: true };
  } catch (e) { return { success: false, error: String(e) }; }
}

export async function upsertRedirect(formData: FormData) {
  const source = (formData.get("source") as string)?.trim();
  const destination = (formData.get("destination") as string)?.trim();
  const statusCode = parseInt((formData.get("statusCode") as string) || "301");
  if (!source || !destination) return { success: false, error: "Source/destination required" };
  const id = `redir-${Date.now()}`;
  try {
    const existing = await db.select().from(redirects).where(eq(redirects.source, source)).limit(1);
    if (existing.length) await db.update(redirects).set({ destination, statusCode }).where(eq(redirects.source, source));
    else await db.insert(redirects).values({ id, source, destination, statusCode });
    revalidatePath("/admin");
    return { success: true };
  } catch (e) { return { success: false, error: String(e) }; }
}

export async function deleteRedirect(id: string) {
  try { await db.delete(redirects).where(eq(redirects.id, id)); revalidatePath("/admin"); return { success: true }; } catch (e) { return { success: false, error: String(e) }; }
}

import { db } from "@/lib/db";
import { authorities, projects, services, reviews, faqs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createAuthority(formData: FormData) {
  "use server";
  
  const id = `auth-${Date.now()}`;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const jurisdiction = formData.get("jurisdiction") as string;

  try {
    await db.insert(authorities).values({
      id,
      name,
      slug,
      jurisdiction,
      isVerified: true
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to create authority", error);
    return { success: false, error: "Failed to create authority" };
  }
}

export async function deleteAuthority(id: string) {
  "use server";
  try {
    await db.delete(authorities).where(eq(authorities.id, id));
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete authority" };
  }
}


export async function createService(formData: FormData) {
  "use server";
  const id = `svc-${Date.now()}`;
  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string)?.toLowerCase().replace(/\s+/g,"-");
  const category = (formData.get("category") as string) || "Engineering";
  const description = formData.get("description") as string;
  try { await db.insert(services).values({ id, name, slug, category, description }); revalidatePath("/admin"); return { success: true }; } catch(e){ return { success:false, error:String(e)}; }
}
export async function deleteService(id: string) {
  "use server"; try { await db.delete(services).where(eq(services.id, id)); revalidatePath("/admin"); return { success:true }; } catch(e){ return {success:false, error:String(e)}; }
}
export async function createProject(formData: FormData) {
  "use server";
  const id = `proj-${Date.now()}`;
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string)?.toLowerCase().replace(/\s+/g,"-");
  const location = formData.get("location") as string;
  const approvalStatus = formData.get("approvalStatus") as string;
  try { await db.insert(projects).values({ id, title, slug, location, approvalStatus, publishedAt: new Date() }); revalidatePath("/admin"); return { success:true }; } catch(e){ return {success:false, error:String(e)}; }
}
export async function deleteProject(id: string) {
  "use server"; try { await db.delete(projects).where(eq(projects.id, id)); revalidatePath("/admin"); return { success:true }; } catch(e){ return {success:false, error:String(e)}; }
}
export async function createReview(formData: FormData) {
  "use server";
  const id = `rev-${Date.now()}`;
  const reviewerName = formData.get("reviewerName") as string;
  const rating = parseInt((formData.get("rating") as string)||"5");
  const content = formData.get("content") as string;
  try { await db.insert(reviews).values({ id, reviewerName, rating, content, isVerified:true }); revalidatePath("/admin"); return { success:true }; } catch(e){ return {success:false, error:String(e)}; }
}
export async function deleteReview(id: string) {
  "use server"; try { await db.delete(reviews).where(eq(reviews.id, id)); revalidatePath("/admin"); return { success:true }; } catch(e){ return {success:false, error:String(e)}; }
}

export async function seedDefaultAuthorities() {
  "use server";
  
  const authoritiesToInsert = [
    { id: "auth_dda", name: "DDA", slug: "dda", jurisdiction: "Dubai, UAE", isVerified: true, shortDescription: "Dubai Development Authority" },
    { id: "auth_dcd", name: "DCD", slug: "dcd", jurisdiction: "Dubai, UAE", isVerified: true, shortDescription: "Dubai Civil Defence" },
    { id: "auth_dm", name: "Dubai Municipality", slug: "dm", jurisdiction: "Dubai, UAE", isVerified: true, shortDescription: "Dubai Municipality" },
    { id: "auth_trakhees", name: "Trakhees", slug: "trakhees", jurisdiction: "Dubai, UAE", isVerified: true, shortDescription: "Trakhees" },
    { id: "auth_dewa", name: "DEWA", slug: "dewa", jurisdiction: "Dubai, UAE", isVerified: true, shortDescription: "DEWA" },
    { id: "auth_jafza", name: "JAFZA", slug: "jafza", jurisdiction: "Jebel Ali, Dubai", isVerified: true, shortDescription: "JAFZA" },
  ];

  try {
    for (const auth of authoritiesToInsert) {
      try {
        await db.insert(authorities).values(auth);
      } catch (err: any) {
        // Ignore duplicates
      }
    }
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true, message: "Authorities seeded successfully" };
  } catch (error) {
    console.error("Seed failed:", error);
    return { success: false, error: String(error) };
  }
}

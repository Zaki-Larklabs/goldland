import { MetadataRoute } from 'next'
import { db } from "@/lib/db";
import { authorities, services, projects, guides, seoRecords } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { siteConfig } from '@/lib/seo/config';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // 1. Static Core Pages — expanded for DAEM parity + SEO hubs
  const staticPages = [
    '',
    '/about',
    '/team',
    '/reviews',
    '/credentials',
    '/authority-approvals',
    '/services',
    '/projects',
    '/blog',
    '/guides',
    '/project-types',
    '/project-approvals',
    '/contact',
    '/faqs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Dynamic Authorities — verified + extended coordinated (16, complete, honest)
  const extendedSlugs = ["dewa","rta","trakhees","jafza","dubai-south","emaar","nakheel","tecom","concordia","sharjah","solar","fire-systems","diez"];
  let publishedAuthorities: any[] = [];
  try { publishedAuthorities = await db.select().from(authorities).where(eq(authorities.isVerified, true)); } catch {}
  const seen = new Set(publishedAuthorities.map((a:any) => a.slug));
  const extra = extendedSlugs.filter(s => !seen.has(s)).map(slug => ({ slug, updatedAt: new Date() }));
  const allAuthorities = [...publishedAuthorities, ...extra];
  const authorityUrls = allAuthorities.map((auth: any) => ({
    url: `${baseUrl}/authority-approvals/${auth.slug}`,
    lastModified: auth.updatedAt ? new Date(auth.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: auth.isVerified === false ? 0.6 : 0.9,
  }));

  // 3. Dynamic Services + Project Types (crash-safe — sitemap must never break the build)
  let allServices: any[] = [];
  try { allServices = await db.select().from(services); } catch {}
  let allProjectTypes: any[] = [];
  try { allProjectTypes = await db.select().from((await import("@/lib/db/schema")).projectTypes); } catch {}
  const projectTypeUrls = allProjectTypes.map((pt: any) => ({
    url: `${baseUrl}/project-types/${pt.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75 as const,
  }));
  const serviceUrls = allServices.map((srv) => ({
    url: `${baseUrl}/services/${srv.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 4. Dynamic Projects (crash-safe)
  let publishedProjects: any[] = [];
  try { publishedProjects = await db.select().from(projects).where(eq(projects.approvalStatus, 'Completed')); } catch {}
  const projectUrls = publishedProjects.map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug}`,
    lastModified: proj.publishedAt ? new Date(proj.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 5. Dynamic Guides + Blogs (same table, both routes) (crash-safe)
  let publishedGuides: any[] = [];
  try { publishedGuides = await db.select().from(guides).where(eq(guides.status, 'published')); } catch {}
  const guideUrls = publishedGuides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: guide.updatedAt ? new Date(guide.updatedAt as any) : guide.publishedAt ? new Date(guide.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  const blogUrls = publishedGuides.map((guide) => ({
    url: `${baseUrl}/blog/${guide.slug}`,
    lastModified: guide.updatedAt ? new Date(guide.updatedAt as any) : guide.publishedAt ? new Date(guide.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // 6. Filter by SEO noindex — exclude routes marked noindex
  let noindexSet = new Set<string>();
  try {
    const seoRows = await db.select().from(seoRecords).where(eq(seoRecords.noindex, true));
    noindexSet = new Set(seoRows.map((r: any) => r.route));
  } catch {}
  const all = [...staticPages, ...authorityUrls, ...serviceUrls, ...projectTypeUrls, ...projectUrls, ...guideUrls, ...blogUrls];
  return all.filter(entry => {
    try { const p = new URL(entry.url).pathname; return !noindexSet.has(p); } catch { return true; }
  });
}

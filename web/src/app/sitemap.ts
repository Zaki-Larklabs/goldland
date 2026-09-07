import { MetadataRoute } from 'next'
import { db } from "@/lib/db";
import { authorities, services, projects, guides } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { siteConfig } from '@/lib/seo/config';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // 1. Static Core Pages
  const staticPages = [
    '',
    '/about',
    '/team',
    '/reviews',
    '/credentials',
    '/authority-approvals',
    '/services',
    '/projects',
    '/guides'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Dynamic Authorities
  const publishedAuthorities = await db.select().from(authorities).where(eq(authorities.isVerified, true));
  const authorityUrls = publishedAuthorities.map((auth) => ({
    url: `${baseUrl}/authority-approvals/${auth.slug}`,
    lastModified: auth.updatedAt ? new Date(auth.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // 3. Dynamic Services
  const allServices = await db.select().from(services);
  const serviceUrls = allServices.map((srv) => ({
    url: `${baseUrl}/services/${srv.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 4. Dynamic Projects
  const publishedProjects = await db.select().from(projects).where(eq(projects.approvalStatus, 'Completed'));
  const projectUrls = publishedProjects.map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug}`,
    lastModified: proj.publishedAt ? new Date(proj.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 5. Dynamic Guides
  const publishedGuides = await db.select().from(guides).where(eq(guides.status, 'published'));
  const guideUrls = publishedGuides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: guide.publishedAt ? new Date(guide.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...authorityUrls, ...serviceUrls, ...projectUrls, ...guideUrls];
}

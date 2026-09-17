import { db } from "@/lib/db";
import { authorities, services, projects, projectTypes, guides } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export type SiteRouteGroup = { label: string; routes: string[] };

export const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/authority-approvals",
  "/projects",
  "/blog",
  "/guides",
  "/project-types",
  "/project-approvals",
  "/contact",
  "/faqs",
  "/team",
  "/reviews",
  "/credentials",
];

// Fallback slugs mirror sitemap.ts so the picker works even if DB is down.
const FALLBACK_AUTHORITY_SLUGS = [
  "dubai-municipality", "dcd", "dda", "dewa", "trakhees", "jafza", "diez",
  "concordia", "dubai-south", "rta", "emaar", "nakheel", "tecom",
  "solar", "fire-systems",
];

async function fetchSiteRoutes(): Promise<SiteRouteGroup[]> {
  let authoritySlugs: string[] = [...FALLBACK_AUTHORITY_SLUGS];
  let serviceSlugs: string[] = [];
  let projectSlugs: string[] = [];
  let projectTypeSlugs: string[] = [];
  let guideSlugs: string[] = [];

  try {
    const rows = await db.select({ slug: authorities.slug }).from(authorities);
    if (rows.length) authoritySlugs = Array.from(new Set([...rows.map((r) => r.slug), ...FALLBACK_AUTHORITY_SLUGS]));
  } catch { /* keep fallbacks */ }
  try {
    serviceSlugs = (await db.select({ slug: services.slug }).from(services)).map((r) => r.slug);
  } catch { /* keep empty */ }
  try {
    projectSlugs = (await db.select({ slug: projects.slug }).from(projects)).map((r) => r.slug);
  } catch { /* keep empty */ }
  try {
    projectTypeSlugs = (await db.select({ slug: projectTypes.slug }).from(projectTypes)).map((r) => r.slug);
  } catch { /* keep empty */ }
  try {
    guideSlugs = (await db.select({ slug: guides.slug }).from(guides).where(eq(guides.status, "published"))).map((r) => r.slug);
  } catch { /* keep empty */ }

  return [
    { label: "Pages", routes: STATIC_ROUTES },
    { label: "Authority approvals", routes: authoritySlugs.map((s) => `/authority-approvals/${s}`) },
    { label: "Services", routes: serviceSlugs.map((s) => `/services/${s}`) },
    { label: "Projects", routes: projectSlugs.map((s) => `/projects/${s}`) },
    { label: "Project approvals", routes: projectTypeSlugs.map((s) => `/project-approvals/${s}`) },
    { label: "Blog posts", routes: guideSlugs.map((s) => `/blog/${s}`) },
    { label: "Guides", routes: guideSlugs.map((s) => `/guides/${s}`) },
  ];
}

/**
 * Live inventory of every public route on the website, grouped for the
 * SEO portal picker. Cached 1h and tagged "seo" so blog/SEO saves refresh
 * it instantly — the portal always offers relevant, real routes.
 */
export const getSiteRoutes = unstable_cache(fetchSiteRoutes, ["site-routes"], {
  revalidate: 3600,
  tags: ["seo"],
});

export async function getFlatSiteRoutes(): Promise<string[]> {
  try {
    const groups = await getSiteRoutes();
    return Array.from(new Set(groups.flatMap((g) => g.routes)));
  } catch {
    return [...STATIC_ROUTES];
  }
}

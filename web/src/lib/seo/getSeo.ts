import { db } from "@/lib/db";
import { seoRecords } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { siteConfig, generateMetadataCore } from "./config";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";

async function fetchSeoForRoute(route: string) {
  try {
    const rows = await db.select().from(seoRecords).where(eq(seoRecords.route, route)).limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

const getCachedSeo = unstable_cache(fetchSeoForRoute, ["seo-records"], { revalidate: 3600, tags: ["seo"] });

export async function getSeoForRoute(route: string) {
  // normalize: ensure leading slash, no trailing slash except root
  let norm = route.trim();
  if (!norm.startsWith("/")) norm = "/" + norm;
  if (norm.length > 1 && norm.endsWith("/")) norm = norm.slice(0, -1);
  return getCachedSeo(norm);
}

/**
 * On-page headings override (H1/H2) managed through the SEO portal.
 * Returns nulls when no portal row exists — pages must fall back to
 * their hardcoded headings so nothing ever renders empty.
 */
export async function getPageHeadings(route: string): Promise<{ h1: string | null; h2: string | null }> {
  try {
    const seo = await getSeoForRoute(route);
    return { h1: seo?.h1?.trim() ? (seo.h1 as string) : null, h2: seo?.h2?.trim() ? (seo.h2 as string) : null };
  } catch {
    return { h1: null, h2: null };
  }
}

export async function generateSeoMetadata(route: string, fallback: { title: string; description: string; noindex?: boolean; keywords?: string[] }): Promise<Metadata> {
  const seo = await getSeoForRoute(route);
  if (!seo) {
    return generateMetadataCore(fallback.title, fallback.description, route, fallback.noindex, fallback.keywords);
  }
  const title = seo.title || fallback.title;
  const description = seo.description || fallback.description;
  const canonical = seo.canonical || `${siteConfig.url}${route}`;
  const noindex = seo.noindex ?? fallback.noindex ?? false;
  const keywords = seo.keywords
    ? seo.keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
    : fallback.keywords;
  const ogImage = seo.ogImage || siteConfig.ogImage;

  // Parse custom robots string (e.g. "index,follow,max-image-preview:large") if provided,
  // otherwise fall back to noindex flag.
  let robots: Metadata["robots"];
  if (seo.robots && typeof seo.robots === "string" && seo.robots.trim()) {
    const parts = seo.robots.toLowerCase().split(",").map((s: string) => s.trim());
    const index = !parts.includes("noindex") && !noindex;
    const follow = !parts.includes("nofollow") && !noindex;
    robots = noindex
      ? { index: false, follow: false }
      : {
          index,
          follow,
          googleBot: {
            index,
            follow,
            "max-image-preview": parts.includes("noimageindex") ? "none" as const : "large" as const,
            "max-snippet": -1,
          },
        };
  } else {
    robots = noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" as const, "max-snippet": -1 } };
  }

  return {
    title: { default: title, template: "%s | Goldland Contracting" },
    description,
    keywords,
    alternates: { canonical },
    robots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "en_AE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: siteConfig.twitterHandle,
    },
  };
}

import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { guides, seoRecords } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlobalCta } from "@/components/layout/GlobalCta";
import { getSeoForRoute } from "@/lib/seo/getSeo";
import { siteConfig } from "@/lib/seo/config";

import { FallbackImage } from "@/components/ui/FallbackImage";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const rows = await db.select().from(guides).where(eq(guides.status, "published"));
    return rows.map(r => ({ slug: r.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seo = await getSeoForRoute(`/blog/${slug}`);
  const data = await db.select().from(guides).where(eq(guides.slug, slug)).limit(1);
  const g = data[0];
  if (!g && !seo) return { title: "Blog Not Found" };
  const title = seo?.title || (g ? `${g.title} | Goldland Blog` : "Goldland Blog");
  const description = seo?.description || g?.excerpt || g?.content?.substring(0, 160) || siteConfig.description;
  const canonical = seo?.canonical || `${siteConfig.url}/blog/${slug}`;
  const ogImage = seo?.ogImage || g?.coverImage || siteConfig.ogImage;
  const keywords = seo?.keywords ? seo.keywords.split(",").map((k: string) => k.trim()).filter(Boolean) : g?.tags && Array.isArray(g.tags) ? g.tags : undefined;
  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article", images: [{ url: ogImage, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
    robots: seo?.noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rows = await db.select().from(guides).where(eq(guides.slug, slug)).limit(1);
  const guide: any = rows[0];
  if (!guide) notFound();

  const readingTime = guide.content ? Math.max(1, Math.round(guide.content.split(/\s+/).length / 200)) : 2;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt || guide.content?.substring(0, 160) || "",
    image: guide.coverImage || siteConfig.ogImage,
    datePublished: guide.publishedAt ? new Date(guide.publishedAt).toISOString() : undefined,
    dateModified: guide.updatedAt ? new Date(guide.updatedAt).toISOString() : undefined,
    author: guide.authorId ? { "@type": "Person", name: guide.authorId } : { "@type": "Organization", name: "Goldland Contracting LLC" },
    publisher: { "@type": "Organization", name: "Goldland Contracting LLC", logo: { "@type": "ImageObject", url: siteConfig.ogImage } },
    mainEntityOfPage: `${siteConfig.url}/blog/${slug}`,
  };

  return (
    <div className="bg-[#FDFBF6] dark:bg-[#050A14] min-h-screen flex flex-col">
      <Script id={`jsonld-blog-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative bg-[#070C1C] text-white pt-32 pb-24 px-4 overflow-hidden border-b border-white/10">
        {/* Subtle background effects */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(201,165,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,68,1) 1px, transparent 1px)", backgroundSize: "64px 64px" }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/50 via-transparent to-[#070C1C]" aria-hidden />
        
        <div className="relative container mx-auto max-w-4xl z-10">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: guide.title }]} className="mb-10 text-white/50 [&_a]:text-white/60 [&_span]:text-white/90 [&_a:hover]:text-[#C9A544] transition-colors" />
          
          <div className="flex flex-wrap items-center gap-3 text-xs tracking-widest uppercase font-bold text-[#C9A544] mb-6">
            <span className="px-3 py-1.5 rounded-md bg-[#C9A544]/10 border border-[#C9A544]/20 shadow-[0_0_15px_rgba(201,165,68,0.1)]">{guide.category || "Blog"}</span>
            <span className="text-white/30 tracking-normal">•</span>
            <span className="text-white/50 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {readingTime} min read
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
            {guide.title}
          </h1>
          
          {guide.excerpt && <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light mb-10 max-w-3xl border-l-2 border-[#C9A544]/50 pl-6">{guide.excerpt}</p>}
          
          <div className="flex items-center gap-4 text-sm border-t border-white/10 pt-8 mt-4 max-w-3xl">
            <div className="w-10 h-10 rounded-full bg-[#C9A544]/20 border border-[#C9A544]/40 flex items-center justify-center shrink-0">
              <img src="/images/goldland-logo.png" alt="Goldland" className="w-6 opacity-80" />
            </div>
            <div>
              <p className="font-semibold text-white/90">Editorial Team</p>
              <div className="flex items-center gap-2 text-white/50 mt-0.5">
                <span>{guide.publishedAt ? new Date(guide.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "Draft"}</span>
                {guide.tags && Array.isArray(guide.tags) && guide.tags.length ? (
                  <>
                    <span>•</span>
                    <span className="truncate">{guide.tags.join(", ")}</span>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          
          <div className="mt-14 relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#C9A544]/5 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
            <FallbackImage 
              src={guide.coverImage || ""} 
              alt={guide.title} 
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" 
            />
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-white dark:bg-[#0A0A0A] flex-grow">
        <div className="container mx-auto max-w-3xl prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: guide.content || "" }} />
        </div>
        <div className="container mx-auto max-w-3xl mt-12 flex gap-3">
          <Link href="/blog" className="px-5 py-2.5 rounded-lg border border-black/10 dark:border-white/10 text-sm font-semibold hover:border-[#C9A544]/40">← Back to Blog</Link>
          <Link href="/#assessment" className="px-5 py-2.5 rounded-lg bg-[#C9A544] text-black text-sm font-bold hover:bg-[#D9B96A]">Start Project Assessment →</Link>
        </div>
      </section>
      <section className="py-16 px-4 bg-[#070C1C] text-center border-t border-white/10">
        <div className="container mx-auto max-w-3xl"><GlobalCta /></div>
      </section>
    </div>
  );
}

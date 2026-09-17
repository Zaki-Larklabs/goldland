import React from "react";
import Link from "next/link";
import Script from "next/script";
import { db } from "@/lib/db";
import { guides } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlobalCta } from "@/components/layout/GlobalCta";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Search, Clock, Tag, Sparkles } from "lucide-react";
import { generateSeoMetadata, getPageHeadings } from "@/lib/seo/getSeo";
import { FallbackImage } from "@/components/ui/FallbackImage";
import { siteConfig } from "@/lib/seo/config";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/blog", {
    title: "Blog — Insights & Authority Approvals | Goldland Contracting",
    description: "Expert articles on authority approvals, engineering, fit-out and project delivery — tips, guides and regulatory updates from Goldland Contracting.",
    keywords: ["Dubai authority approvals blog", "DDA approval guide", "Dubai Municipality fit-out tips", "DEWA approval process", "Goldland Contracting insights"],
  });
}

function readingTime(content?: string | null, excerpt?: string | null) {
  const text = `${content ?? ""} ${excerpt ?? ""}`;
  const words = text.trim() ? text.trim().split(/\s+/).length : 120;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cluster?: string }>;
}) {
  const { q = "", cluster = "" } = await searchParams;
  const query = q.trim().toLowerCase();

  let allGuides: any[] = [];
  try {
    allGuides = await db.select().from(guides).where(eq(guides.status, "published")).orderBy(desc(guides.publishedAt));
    if (!allGuides.length) allGuides = await db.select().from(guides).orderBy(desc(guides.id));
  } catch {
    allGuides = [];
  }

  // SEO portal → H1/H2 override (falls back to hardcoded headings)
  const headings = await getPageHeadings("/blog");

  // Derive topics dynamically from data + sensible defaults
  const defaultClusters = ["Authority Approvals", "Engineering", "Fit-Out", "MEP", "Dubai Municipality", "DCD", "DDA", "Project Tips"];
  const dataTopics = Array.from(new Set(allGuides.map((g: any) => g.category).filter(Boolean)));
  const clusters = Array.from(new Set([...defaultClusters, ...dataTopics]));

  // Server-side filtering (search + topic) — fixes dead search input
  const filtered = allGuides.filter((g: any) => {
    const matchesCluster = cluster
      ? (g.category || "Blog").toLowerCase() === cluster.toLowerCase() ||
        (Array.isArray(g.tags) && g.tags.some((t: string) => t.toLowerCase() === cluster.toLowerCase()))
      : true;
    const haystack = `${g.title ?? ""} ${g.excerpt ?? ""} ${g.content ?? ""} ${g.category ?? ""}`.toLowerCase();
    const matchesQuery = query ? haystack.includes(query) : true;
    return matchesCluster && matchesQuery;
  });

  const [featured, ...rest] = filtered;

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Goldland Contracting — Insights & Updates",
    url: `${siteConfig.url}/blog`,
    description: "Expert-reviewed articles on authority approvals, engineering and project delivery across Dubai.",
    blogPost: filtered.slice(0, 10).map((g: any) => ({
      "@type": "BlogPosting",
      headline: g.title,
      url: `${siteConfig.url}/blog/${g.slug}`,
      datePublished: g.publishedAt ? new Date(g.publishedAt).toISOString() : undefined,
      dateModified: g.updatedAt ? new Date(g.updatedAt).toISOString() : undefined,
      description: g.excerpt || (g.content || "").substring(0, 160),
      image: g.coverImage || siteConfig.ogImage,
      author: { "@type": "Organization", name: "Goldland Contracting LLC" },
    })),
  };

  return (
    <div className="bg-[#FDFBF6] dark:bg-[#050A14] min-h-screen flex flex-col">
      <Script id="jsonld-blog-list" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />

      {/* ── Hero ── */}
      <section className="relative bg-[#070C1C] text-white pt-28 pb-16 px-4 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(201,165,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,68,1) 1px, transparent 1px)", backgroundSize: "56px 56px" }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/60 via-transparent to-[#070C1C]" aria-hidden />
        <div className="relative container mx-auto max-w-5xl z-10">
          <Breadcrumbs items={[{ label: "Blog" }]} className="mb-8 text-white/50 [&_a]:text-white/60 [&_span]:text-white" />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A544]/30 bg-[#C9A544]/10 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[#C9A544]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9A544]">Insights & Updates</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">{headings.h1 ?? "Insights & Updates."}</h1>
          <p className="text-xl text-white/60 leading-relaxed max-w-2xl mb-8">
            Expert-reviewed articles on authority approvals, engineering and project delivery across Dubai.
          </p>
          {/* Working search (GET form — no JS required, fixes dead input) */}
          <form action="/blog" method="get" className="relative max-w-2xl">
            {cluster ? <input type="hidden" name="cluster" value={cluster} /> : null}
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 h-5 w-5" />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search blogs, e.g. DEWA, DDA, fit-out…"
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-28 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#C9A544]"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full bg-[#C9A544] hover:bg-[#D9B96A] text-black text-xs font-bold transition-colors">
              Search
            </button>
          </form>
          {(query || cluster) && (
            <div className="mt-4 flex items-center gap-3 text-sm text-white/60">
              <span>
                {filtered.length} result{filtered.length === 1 ? "" : "s"}
                {query ? <> for “<span className="text-white font-semibold">{q}</span>”</> : null}
                {cluster ? <> in <span className="text-[#C9A544] font-semibold">{cluster}</span></> : null}
              </span>
              <Link href="/blog" className="px-3 py-1 rounded-full border border-white/15 hover:border-[#C9A544]/50 text-xs">Clear ✕</Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Topic pills ── */}
      <div className="border-b border-black/5 dark:border-white/10 bg-white dark:bg-[#0A0A0A] sticky top-16 md:top-20 z-30">
        <div className="container mx-auto max-w-7xl px-4 py-3 flex gap-2 overflow-x-auto">
          <Link
            href="/blog"
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-colors ${!cluster ? "bg-[#0A0D14] dark:bg-white text-white dark:text-[#0A0D14] border-transparent" : "border-black/10 dark:border-white/10 text-[#6B7280] dark:text-white/60 hover:border-[#C9A544]/40"}`}
          >
            All
          </Link>
          {clusters.map((c) => {
            const active = cluster.toLowerCase() === c.toLowerCase();
            const href = `/blog?cluster=${encodeURIComponent(c)}${query ? `&q=${encodeURIComponent(q)}` : ""}`;
            return (
              <Link
                key={c}
                href={href}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-colors ${active ? "bg-[#C9A544] text-black border-[#C9A544]" : "border-black/10 dark:border-white/10 text-[#6B7280] dark:text-white/60 hover:border-[#C9A544]/40"}`}
              >
                {c}
              </Link>
            );
          })}
        </div>
      </div>

      <section className="py-12 px-4 flex-grow bg-white dark:bg-[#0A0A0A]">
        <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-40 space-y-8">
              <div>
                <h3 className="font-bold text-[#0A0D14] dark:text-white mb-4 uppercase tracking-wider text-sm">Topics</h3>
                <ul className="space-y-1">
                  {clusters.map((c) => {
                    const count = allGuides.filter((g: any) => (g.category || "Blog") === c).length;
                    const active = cluster.toLowerCase() === c.toLowerCase();
                    return (
                      <li key={c}>
                        <Link
                          href={`/blog?cluster=${encodeURIComponent(c)}`}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "bg-[#C9A544]/10 text-[#0A0D14] dark:text-white border border-[#C9A544]/30" : "text-[#6B7280] dark:text-white/60 hover:text-[#C9A544] hover:bg-black/[0.02] dark:hover:bg-white/5"}`}
                        >
                          <span className="flex items-center gap-2"><Tag className="h-3.5 w-3.5 opacity-60" />{c}</span>
                          {count > 0 && <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10">{count}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="rounded-2xl border border-[#C9A544]/25 bg-[#FEFBF3] dark:bg-white/[0.03] p-5">
                <h4 className="text-sm font-bold text-[#0A0D14] dark:text-white">Need approval help?</h4>
                <p className="text-xs text-[#6B7280] dark:text-white/60 mt-1.5 leading-relaxed">Send drawings for a free assessment — response within 24h.</p>
                <Link href="/#assessment" className="mt-3 inline-flex w-full justify-center px-4 py-2.5 rounded-lg bg-[#C9A544] hover:bg-[#D9B96A] text-black text-xs font-bold">Start Assessment →</Link>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <div className="mb-6 flex justify-between items-center border-b border-black/5 dark:border-white/10 pb-4">
              <h2 className="text-2xl font-bold font-display text-[#0A0D14] dark:text-white">{cluster || query ? "Results" : (headings.h2 ?? "Latest Articles")}</h2>
              <span className="text-sm text-[#6B7280]">{filtered.length} Published</span>
            </div>

            {filtered.length === 0 ? (
              <div className="p-12 text-center border border-dashed rounded-2xl text-[#6B7280] bg-[#FDFBF6] dark:bg-white/[0.02]">
                <p className="font-semibold text-[#0A0D14] dark:text-white">No articles match your filters.</p>
                <p className="text-sm mt-2">
                  Try a different keyword — or create one in <Link href="/admin?tab=blog" className="text-[#C9A544] underline font-semibold">Admin → Blog</Link>.
                </p>
                <Link href="/blog" className="mt-5 inline-flex px-5 py-2.5 rounded-lg border border-black/10 dark:border-white/10 text-sm font-semibold hover:border-[#C9A544]/40">View all articles</Link>
              </div>
            ) : (
              <>
                {/* Featured */}
                {featured && !query && !cluster && (
                  <Link href={`/blog/${featured.slug}`} className="group grid md:grid-cols-2 rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 hover:border-[#C9A544]/50 hover:shadow-xl transition-all mb-8 bg-white dark:bg-[#070C1C]">
                    <div className="relative h-64 md:h-full min-h-[260px] bg-[#070C1C] overflow-hidden">
                      <FallbackImage src={featured.coverImage} alt={featured.title} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-4 left-4 px-3 py-1.5 rounded-md bg-[#C9A544] text-black text-[11px] font-bold uppercase tracking-wider">Featured</span>
                    </div>
                    <div className="p-8 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-white/60 mb-3">
                        <span className="bg-[#FDFBF6] dark:bg-white/5 px-2.5 py-1 rounded-md text-[#0A0D14] dark:text-white font-medium border border-black/5 dark:border-white/10">{featured.category || "Blog"}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{readingTime(featured.content, featured.excerpt)} min read</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-[#0A0D14] dark:text-white group-hover:text-[#C9A544] transition-colors leading-tight">{featured.title}</h3>
                      <p className="text-sm text-[#6B7280] dark:text-white/60 line-clamp-3 mt-3 leading-relaxed">{featured.excerpt || (featured.content || "").substring(0, 160)}…</p>
                      <span className="mt-auto pt-6 text-[#C9A544] text-sm font-semibold flex items-center w-fit">Read Article <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
                    </div>
                  </Link>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(featured && !query && !cluster ? rest : filtered).map((g: any) => (
                    <Card key={g.id} className="flex flex-col h-full group hover:shadow-lg transition-all border-black/5 dark:border-white/10 hover:border-[#C9A544]/50 dark:hover:border-[#C9A544]/50 overflow-hidden bg-white dark:bg-[#070C1C]">
                      <Link href={`/blog/${g.slug}`} className="block h-48 bg-[#070C1C] relative overflow-hidden shrink-0 border-b border-black/5 dark:border-white/5">
                        <FallbackImage
                          src={g.coverImage}
                          alt={g.title}
                          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <CardHeader className="pb-4 pt-6">
                        <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-white/60 mb-3">
                          <span className="bg-[#FDFBF6] dark:bg-white/5 px-2.5 py-1 rounded-md text-[#0A0D14] dark:text-white font-medium border border-black/5 dark:border-white/10">{g.category || "Blog"}</span>
                          <span className="flex items-center gap-1.5 ml-2"><Calendar className="h-3.5 w-3.5" />{g.publishedAt ? new Date(g.publishedAt).toLocaleDateString() : g.updatedAt ? new Date(g.updatedAt).toLocaleDateString() : "Draft"}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{readingTime(g.content, g.excerpt)} min</span>
                        </div>
                        <CardTitle className="text-xl md:text-2xl group-hover:text-[#C9A544] transition-colors leading-tight font-display font-bold">
                          <Link href={`/blog/${g.slug}`}>{g.title}</Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="mt-auto">
                        <p className="text-sm text-[#6B7280] dark:text-white/60 line-clamp-3 mb-6 leading-relaxed">{g.excerpt || (g.content || "").substring(0, 150) || ""}…</p>
                        <Link href={`/blog/${g.slug}`} className="text-[#C9A544] text-sm font-semibold flex items-center w-fit group/link">
                          Read Article <ArrowRight className="ml-1.5 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {allGuides.length === 0 && (
              <div className="mt-6 p-8 rounded-2xl border border-[#C9A544]/25 bg-[#FEFBF3] dark:bg-white/[0.03] text-sm text-[#6B7280] dark:text-white/60">
                <p className="font-semibold text-[#0A0D14] dark:text-white">No blogs published yet.</p>
                <p className="mt-1">The SEO team can publish the first article in <Link href="/admin?tab=blog" className="text-[#C9A544] underline font-semibold">Admin → Blog</Link> — it appears here, on <code>/guides</code>, and in <code>/sitemap.xml</code> automatically.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-[#FEFBF3] dark:bg-[#050A14] border-t border-black/5 text-center">
        <div className="container mx-auto max-w-3xl"><GlobalCta /></div>
      </section>
    </div>
  );
}

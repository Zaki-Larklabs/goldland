import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { guides, authorities, projects, services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlobalCta } from "@/components/layout/GlobalCta";
import { AuthorityCard } from "@/components/cards/AuthorityCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import Script from "next/script";
import { CheckCircle2, Calendar, User, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await db.select().from(guides).where(eq(guides.slug, slug)).limit(1);
  const guide = data[0];

  if (!guide) return { title: "Guide Not Found" };

  return {
    title: `${guide.title} | Goldland Technical Guide`,
    description: guide.content?.substring(0, 160) ?? "",
    alternates: {
      canonical: `https://goldlandcontracting.ae/guides/${slug}`,
    },
    openGraph: {
      title: `${guide.title} | Goldland Technical Guide`,
      description: guide.content?.substring(0, 160) ?? "",
      url: `https://goldlandcontracting.ae/guides/${slug}`,
      type: "article",
      publishedTime: guide.publishedAt ? guide.publishedAt.toISOString() : new Date().toISOString(),
      modifiedTime: guide.publishedAt ? guide.publishedAt.toISOString() : new Date().toISOString(),
    },
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  const guideData = await db.select().from(guides).where(eq(guides.slug, slug)).limit(1);
  const guide: any = guideData[0];

  if (!guide) {
    notFound();
  }

  // Cross-linking placeholders (Global fetched since specific join tables are pending)
  const allAuthorities = await db.select().from(authorities).where(eq(authorities.isVerified, true)).limit(2);
  const allProjects = await db.select().from(projects).limit(2);
  const allServices = await db.select().from(services).limit(2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.title,
    "description": guide.content?.substring(0, 160) ?? "",
    "datePublished": guide.publishedAt ? guide.publishedAt.toISOString() : new Date().toISOString(),
    "dateModified": guide.publishedAt ? guide.publishedAt.toISOString() : new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": "[CMS Placeholder: Author Name]"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Goldland Contracting LLC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://goldlandcontracting.ae/images/goldland-logo.png"
      }
    }
  };

  return (
    <div className="bg-vellum dark:bg-ink min-h-screen flex flex-col">
      <Script
        id={`jsonld-guide-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero & Metadata Block */}
      <section className="bg-ink text-white pt-24 pb-16 px-4 border-b border-border-dark">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumbs 
            items={[
              { label: "Guides", href: "/guides" },
              { label: guide.category }
            ]} 
            className="mb-8 text-gray-400 dark:text-gray-400 [&_a]:text-gray-400 [&_span]:text-white"
          />
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">{guide.title}</h1>
          
          {/* Strict Technical Metadata Block */}
          <div className="flex flex-wrap items-center gap-6 p-4 bg-white/5 rounded-lg border border-white/10 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <User className="h-4 w-4 text-brass" />
              <span>Author: <strong className="text-white">[CMS Placeholder]</strong></span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span>Technical Reviewer: <strong className="text-white">[CMS Placeholder]</strong></span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="h-4 w-4 text-brass" />
              <span>Published: <strong className="text-white">{guide.publishedAt ? new Date(guide.publishedAt).toLocaleDateString() : 'Draft'}</strong></span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white dark:bg-ink flex-grow">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Article */}
          <article className="flex-1">
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              {/* Note: This assumes `guide.content` might just be a string right now, 
                  but would ideally be rich HTML or Markdown rendered via a CMS. */}
              <div dangerouslySetInnerHTML={{ __html: guide.content ?? "" }} />
            </div>

            <hr className="my-12 border-border-light dark:border-border-dark" />
            
            {/* Guide Specific FAQs placeholder */}
            <div>
              <h3 className="text-2xl font-bold mb-6 font-display text-ink dark:text-white">Related Questions</h3>
              <p className="text-gray-500">[CMS Placeholder: FAQAccordion configured to fetch guide-specific Q&A]</p>
            </div>
          </article>

          {/* Sidebar: Cross-Linking */}
          <aside className="lg:w-80 shrink-0 space-y-10">
            {/* Related Services */}
            <div>
              <h4 className="font-bold text-ink dark:text-white mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brass" /> Related Services
              </h4>
              <ul className="space-y-2">
                {allServices.map(srv => (
                  <li key={srv.id}>
                    <Link href={`/services/${srv.slug}`} className="text-gray-600 dark:text-gray-400 hover:text-brass dark:hover:text-brass text-sm block p-3 bg-gray-50 dark:bg-ink-soft rounded border border-border-light dark:border-border-dark">
                      {srv.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Authorities */}
            <div>
              <h4 className="font-bold text-ink dark:text-white mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brass" /> Related Authorities
              </h4>
              <div className="space-y-4">
                {allAuthorities.map(auth => (
                  <AuthorityCard 
                    key={auth.id}
                    id={auth.id}
                    name={auth.name}
                    slug={auth.slug}
                    jurisdiction={auth.jurisdiction}
                  />
                ))}
              </div>
            </div>

            {/* Related Case Studies/Projects */}
            <div>
              <h4 className="font-bold text-ink dark:text-white mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brass" /> Related Case Studies
              </h4>
              <div className="space-y-4">
                {allProjects.map(proj => (
                  <ProjectCard 
                    key={proj.id}
                    id={proj.id}
                    title={proj.title}
                    slug={proj.slug}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. Global CTA */}
      <section className="py-24 px-4 bg-ink text-center border-t border-border-dark mt-auto">
        <div className="container mx-auto max-w-3xl">
          <GlobalCta />
        </div>
      </section>
    </div>
  );
}

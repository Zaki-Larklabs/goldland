import React from "react";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { db } from "@/lib/db";
import { projects, caseStudies, projectTypes, authorities } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlobalCta } from "@/components/layout/GlobalCta";
import { CheckCircle2, MapPin, Building2, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  const project = data[0];

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Engineering Case Study | Goldland Contracting`,
    description: `Read the engineering and fit-out case study for ${project.title} located in ${project.location || 'Dubai'}. Approved and executed by Goldland Contracting.`,
    alternates: {
      canonical: `https://goldlandcontracting.ae/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Goldland Contracting Case Study`,
      description: `Read the engineering and fit-out case study for ${project.title}.`,
      url: `https://goldlandcontracting.ae/projects/${slug}`,
      type: "article",
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Fetch Project
  const projData = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  const project = projData[0];

  if (!project) {
    notFound();
  }

  // Fetch related case study data if it exists
  const caseStudyData = await db.select().from(caseStudies).where(eq(caseStudies.projectId, project.id)).limit(1);
  const caseStudy = caseStudyData[0];

  // For V1, we simulate relation joins since relations aren't fully configured in schema.ts
  let typeName = "Engineering Project";
  let authName = "Dubai Authority";

  if (project.projectTypeId) {
    const pt = await db.select().from(projectTypes).where(eq(projectTypes.id, project.projectTypeId)).limit(1);
    if (pt[0]) typeName = pt[0].name;
  }

  if (project.authorityId) {
    const auth = await db.select().from(authorities).where(eq(authorities.id, project.authorityId)).limit(1);
    if (auth[0]) authName = auth[0].name;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": project.title,
    "description": `Engineering case study for ${project.title}.`,
    "publisher": {
      "@type": "Organization",
      "name": "Goldland Contracting LLC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://goldlandcontracting.ae/images/goldland-logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://goldlandcontracting.ae/projects/${project.slug}`
    }
  };

  return (
    <div className="bg-vellum dark:bg-ink min-h-screen flex flex-col">
      <Script
        id={`jsonld-project-${project.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-ink text-white pt-24 pb-20 px-4 border-b border-border-dark">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs 
            items={[
              { label: "Projects", href: "/projects" },
              { label: project.title }
            ]} 
            className="mb-8 text-gray-400 dark:text-gray-400 [&_a]:text-gray-400 [&_span]:text-white"
          />
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">{project.title}</h1>
          
          <div className="flex flex-wrap gap-4 mt-8">
            {project.location && (
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm">
                <MapPin className="w-4 h-4 text-brass" /> {project.location}
              </div>
            )}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm">
              <Building2 className="w-4 h-4 text-brass" /> {authName}
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> {project.approvalStatus}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-background flex-grow">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-3 gap-12">
          
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-ink dark:text-white mb-6">The Challenge</h2>
              <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
                <p>{caseStudy?.challenge || `[CONTENT REQUIRED]`}</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold text-ink dark:text-white mb-6">Our Engineering Solution</h2>
              <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
                <p>{caseStudy?.solution || `[CONTENT REQUIRED]`}</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold text-ink dark:text-white mb-6">The Result</h2>
              <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
                <p>{caseStudy?.result || `[CONTENT REQUIRED]`}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-surface p-6 rounded-xl border border-border-light dark:border-border-dark sticky top-24">
              <h3 className="font-bold text-xl mb-4 text-ink dark:text-white">Project Facts</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Type</span>
                  <span className="font-semibold text-ink dark:text-gray-200">{typeName}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Location</span>
                  <span className="font-semibold text-ink dark:text-gray-200">{project.location || 'Dubai, UAE'}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Governing Authority</span>
                  <span className="font-semibold text-ink dark:text-gray-200">{authName}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border-light dark:border-border-dark">
                <p className="font-semibold mb-4 text-ink dark:text-white">Have a similar project?</p>
                <Link href="/contact" className="block w-full text-center bg-brass text-black font-bold py-3 px-4 rounded hover:bg-brass/90 transition-colors">
                  Get An Assessment
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Global CTA */}
      <section className="py-24 px-4 bg-ink text-center border-t border-border-dark">
        <div className="container mx-auto max-w-3xl">
          <GlobalCta />
        </div>
      </section>
    </div>
  );
}

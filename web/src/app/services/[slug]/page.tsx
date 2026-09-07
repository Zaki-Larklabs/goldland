import React from "react";
import { notFound } from "next/navigation";
import Script from "next/script";
import { db } from "@/lib/db";
import { services, authorities, projects, faqs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlobalCta } from "@/components/layout/GlobalCta";
import { AuthorityCard } from "@/components/cards/AuthorityCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { FAQAccordion } from "@/components/interactive/FAQAccordion";
import { AlertTriangle, HardHat, Compass, FileCheck } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  const service = data[0];

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.name} Services in Dubai | Goldland Contracting`,
    description: service.description || `Professional ${service.name.toLowerCase()} design and engineering services in Dubai, fully compliant with local authority regulations.`,
    alternates: {
      canonical: `https://goldlandcontracting.ae/services/${slug}`,
    },
    openGraph: {
      title: `${service.name} Services in Dubai | Goldland Contracting`,
      description: service.description || `Professional ${service.name.toLowerCase()} design and engineering services in Dubai.`,
      url: `https://goldlandcontracting.ae/services/${slug}`,
      type: "article",
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  
  // 1. Fetch Core Entity
  const serviceData = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  const service = serviceData[0];

  if (!service) {
    notFound();
  }

  // 2. Fetch Global Related Data (Since join tables don't exist yet, we fetch global verifieds)
  const allAuthorities = await db.select().from(authorities).where(eq(authorities.isVerified, true)).limit(4);
  const allProjects = await db.select().from(projects).limit(3);
  const pageFaqs = await db.select().from(faqs).limit(5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "serviceType": service.category,
    "provider": {
      "@type": "Organization",
      "name": "Goldland Contracting LLC",
      "logo": {
        "@type": "ImageObject",
        "url": "https://goldlandcontracting.ae/images/goldland-logo.png"
      }
    },
    "areaServed": "Dubai, UAE",
    "description": service.description || `${service.name} services.`
  };

  return (
    <div className="bg-vellum dark:bg-ink min-h-screen">
      <Script
        id={`jsonld-service-${service.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero */}
      <section className="bg-ink text-white pt-24 pb-20 px-4 border-b border-border-dark relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brass via-ink to-ink pointer-events-none"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <Breadcrumbs 
            items={[
              { label: "Services", href: "/services" },
              { label: service.name }
            ]} 
            className="mb-8 text-gray-400 dark:text-gray-400 [&_a]:text-gray-400 [&_span]:text-white"
          />
          <div className="inline-block px-3 py-1 mb-6 text-sm font-semibold tracking-wider text-brass uppercase border border-brass/30 rounded-full bg-brass/10">
            {service.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">{service.name}</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mb-10">
            {service.description || `Specialized ${service.name.toLowerCase()} ensuring absolute compliance with Dubai authority regulations.`}
          </p>
          <GlobalCta />
        </div>
      </section>

      {/* 2. Engineering Disclaimer */}
      <section className="py-6 px-4 bg-stamp-red/5 dark:bg-stamp-red/10 border-b border-stamp-red/20">
        <div className="container mx-auto max-w-4xl flex gap-4 items-start">
          <AlertTriangle className="h-6 w-6 text-stamp-red shrink-0 mt-1" />
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong className="text-ink dark:text-white">Professional Disclaimer:</strong> The information provided on this page outlines general technical parameters and authority requirements. It does not constitute project-specific engineering advice. All designs and load calculations must be formally reviewed, stamped, and approved by Goldland’s licensed engineering team prior to implementation or submission.
          </p>
        </div>
      </section>

      {/* 3. Overview */}
      <section className="py-20 px-4 bg-white dark:bg-ink-soft border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-display font-bold text-ink dark:text-white mb-8">Service Overview</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            <p>
              [CMS Placeholder: Detailed explanation of the {service.name} service offering. Explains the methodology, standards used (like Dubai Building Code), and software utilized (AutoCAD, Revit).]
            </p>
            <p>
              Goldland guarantees that all outputs from our {service.name.toLowerCase()} department are fully compliant with the latest jurisdiction-specific mandates.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Cross-Linked Authorities */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-ink">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-ink dark:text-white mb-4">Relevant Authorities</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              [CMS Placeholder: Requires specific join-table filtering to show only authorities relevant to {service.name}. Displaying global authorities.]
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allAuthorities.map(auth => (
              <AuthorityCard 
                key={auth.id}
                id={auth.id}
                name={auth.name}
                slug={auth.slug}
                jurisdiction={auth.jurisdiction}
                isVerified={auth.isVerified}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Cross-Linked Project Types & Real Projects */}
      <section className="py-20 px-4 bg-white dark:bg-ink-soft border-t border-border-light dark:border-border-dark">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-ink dark:text-white mb-4">Applied Projects</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              [CMS Placeholder: Requires specific join-table filtering. Displaying recent global projects where {service.name} was applied.]
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allProjects.map(proj => (
              <ProjectCard 
                key={proj.id}
                id={proj.id}
                title={proj.title}
                slug={proj.slug}
                location={proj.location}
                approvalStatus={proj.approvalStatus}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQs */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-ink">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-display font-bold text-ink dark:text-white mb-10 text-center">{service.name} FAQs</h2>
          <div className="bg-white dark:bg-ink-soft p-8 rounded-2xl shadow-sm border border-border-light dark:border-border-dark">
            <FAQAccordion faqs={pageFaqs} />
          </div>
        </div>
      </section>

      {/* 7 & 8. Knowledge Base & Final CTA */}
      <section className="py-32 px-4 bg-ink text-center border-t border-border-dark">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Need this service?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Speak directly with our engineering team to discuss your {service.name.toLowerCase()} requirements.
          </p>
          <div className="flex justify-center mb-16">
            <GlobalCta />
          </div>
          
          <div className="pt-12 border-t border-border-dark flex flex-wrap justify-center gap-4">
            <span className="text-gray-400 text-sm w-full mb-2 uppercase tracking-wider">Related</span>
            <a href="/authority-approvals" className="text-brass hover:underline">Authority Approvals</a>
            <span className="text-gray-600">•</span>
            <a href="/project-approvals" className="text-brass hover:underline">Project Approvals</a>
            <span className="text-gray-600">•</span>
            <a href="/guides" className="text-brass hover:underline">Knowledge Base</a>
          </div>
        </div>
      </section>

    </div>
  );
}

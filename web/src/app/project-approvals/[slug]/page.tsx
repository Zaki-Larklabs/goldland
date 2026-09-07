import React from "react";
import { notFound } from "next/navigation";
import Script from "next/script";
import { db } from "@/lib/db";
import { projectTypes, projects, faqs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlobalCta } from "@/components/layout/GlobalCta";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { FAQAccordion } from "@/components/interactive/FAQAccordion";
import { CheckCircle2, AlertTriangle, FileText, Settings, Building2 } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await db.select().from(projectTypes).where(eq(projectTypes.slug, slug)).limit(1);
  const projectType = data[0];

  if (!projectType) return { title: "Project Approval Not Found" };

  return {
    title: `${projectType.name} Approval Guide in Dubai | Goldland Contracting`,
    description: `Complete engineering and authority approval guide for ${projectType.name.toLowerCase()} projects in Dubai. Understand design, documentation, and authority requirements.`,
    alternates: {
      canonical: `https://goldlandcontracting.ae/project-approvals/${slug}`,
    },
    openGraph: {
      title: `${projectType.name} Approval Guide in Dubai | Goldland Contracting`,
      description: `Complete engineering and authority approval guide for ${projectType.name.toLowerCase()} projects in Dubai.`,
      url: `https://goldlandcontracting.ae/project-approvals/${slug}`,
      type: "article",
    },
  };
}

export default async function ProjectApprovalPage({ params }: PageProps) {
  const { slug } = await params;
  
  // 1. Fetch Core Entity
  const typeData = await db.select().from(projectTypes).where(eq(projectTypes.slug, slug)).limit(1);
  const projectType = typeData[0];

  if (!projectType) {
    notFound();
  }

  // 2. Fetch Related Data (Real projects of this type, generic FAQs for now until filtered)
  const relatedProjects = await db.select().from(projects).where(eq(projects.projectTypeId, projectType.id)).limit(3);
  const pageFaqs = await db.select().from(faqs).limit(5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${projectType.name} Approval Guide`,
    "description": `Complete engineering and authority approval guide for ${projectType.name.toLowerCase()} projects in Dubai.`,
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
    <div className="bg-vellum dark:bg-ink min-h-screen">
      <Script
        id={`jsonld-project-approval-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero */}
      <section className="bg-ink text-white pt-24 pb-20 px-4 border-b border-border-dark relative">
        <div className="absolute inset-0 bg-[url('/images/blueprint-bg-placeholder.jpg')] bg-cover opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <Breadcrumbs 
            items={[
              { label: "Project Approvals", href: "/project-approvals" },
              { label: projectType.name }
            ]} 
            className="mb-8 text-gray-400 dark:text-gray-400 [&_a]:text-gray-400 [&_span]:text-white"
          />
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-brass">{projectType.name} Approval</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mb-10">
            A comprehensive guide to the engineering considerations, documentation, and authority pathways required for a compliant {projectType.name.toLowerCase()} in Dubai.
          </p>
          <GlobalCta />
        </div>
      </section>

      {/* 2 & 3. Project Overview & Who may need it */}
      <section className="py-20 px-4 bg-white dark:bg-ink-soft border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto max-w-4xl grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-display font-bold text-ink dark:text-white mb-4">Project Overview</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              [CMS Placeholder: General description of {projectType.name} and why structural/MEP compliance is strictly enforced by Dubai authorities. This paragraph outlines the core scope of work generally expected.]
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-ink dark:text-white mb-4">Who Needs It?</h2>
            <ul className="space-y-3">
              {/* Fake list for UI presentation until CMS supports rich text lists */}
              {["Commercial Tenants", "Landlords & Developers", "Industrial Operators", "Retail Franchises"].map(item => (
                <li key={item} className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle2 className="h-5 w-5 mr-3 text-brass shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Verified Project Facts Trust Block */}
            <div className="mt-8 bg-surface p-6 rounded-xl border border-border-light dark:border-border-dark">
              <h3 className="font-bold text-lg mb-4 text-ink dark:text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Verified Project Support
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
                <div>
                  <strong className="block text-ink dark:text-gray-200">Scope:</strong>
                  Engineering & Approvals
                </div>
                <div>
                  <strong className="block text-ink dark:text-gray-200">Authorities:</strong>
                  Multiple Jurisdictions
                </div>
              </div>
              <div className="pt-4 border-t border-border-light dark:border-border-dark">
                <p className="font-semibold mb-3 text-ink dark:text-white">Planning a similar project?</p>
                <a href="/#assessment" className="inline-block w-full text-center bg-[#C9A544]/10 border border-[#C9A544]/30 text-[#C9A544] font-bold py-2 px-4 rounded hover:bg-[#C9A544]/20 transition-colors">
                  Get An Approval Assessment
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 & 5. Design & Engineering Considerations */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-ink">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-ink dark:text-white">Technical Considerations</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-ink-soft p-8 rounded-xl border border-border-light dark:border-border-dark">
              <div className="h-12 w-12 bg-brass/10 rounded-lg flex items-center justify-center mb-6">
                <Settings className="h-6 w-6 text-brass" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-ink dark:text-white">Design Parameters</h3>
              <p className="text-gray-600 dark:text-gray-300">
                [CMS Placeholder: Outline space planning restrictions, ceiling heights, aesthetic guidelines enforced by master developers (e.g. Nakheel/Emaar) for {projectType.name}.]
              </p>
            </div>
            <div className="bg-white dark:bg-ink-soft p-8 rounded-xl border border-border-light dark:border-border-dark">
              <div className="h-12 w-12 bg-brass/10 rounded-lg flex items-center justify-center mb-6">
                <Settings className="h-6 w-6 text-brass" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-ink dark:text-white">Engineering (MEP/Civil)</h3>
              <p className="text-gray-600 dark:text-gray-300">
                [CMS Placeholder: Outline structural load constraints, HVAC ducting rules, electrical load schedules, and fire sprinkler requirements for {projectType.name}.]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 & 7. Documentation & Authority Considerations */}
      <section className="py-20 px-4 bg-ink text-white">
        <div className="container mx-auto max-w-4xl grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <FileText className="h-8 w-8 text-brass" />
              <h2 className="text-3xl font-display font-bold">Required Documents</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-300"><CheckCircle2 className="h-5 w-5 text-brass shrink-0 mt-0.5" /> NOC from Landlord/Developer</li>
              <li className="flex gap-3 text-gray-300"><CheckCircle2 className="h-5 w-5 text-brass shrink-0 mt-0.5" /> Trade License & Tenancy Contract</li>
              <li className="flex gap-3 text-gray-300"><CheckCircle2 className="h-5 w-5 text-brass shrink-0 mt-0.5" /> Proposed Architectural Drawings</li>
              <li className="flex gap-3 text-gray-300"><CheckCircle2 className="h-5 w-5 text-brass shrink-0 mt-0.5" /> Proposed MEP & Structural Layouts</li>
              <li className="flex gap-3 text-gray-300"><CheckCircle2 className="h-5 w-5 text-brass shrink-0 mt-0.5" /> Affection Plan</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Building2 className="h-8 w-8 text-brass" />
              <h2 className="text-3xl font-display font-bold">Primary Authorities</h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              [CMS Placeholder: Explain which authorities typically handle this project. E.g. "Inside JAFZA, Trakhees EHS handles approvals. In mainland, Dubai Municipality and DCD are required."]
            </p>
          </div>
        </div>
      </section>

      {/* 8. Process */}
      <section className="py-20 px-4 bg-white dark:bg-ink-soft">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-display font-bold text-ink dark:text-white mb-12 text-center">Standard Approval Process</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-border-dark before:to-transparent">
            {[
              { num: "01", title: "Site Survey & Initial Design", desc: "[CMS Placeholder: Step description]" },
              { num: "02", title: "Developer/Landlord NOC", desc: "[CMS Placeholder: Step description]" },
              { num: "03", title: "Authority Submission (DM/DCD/Etc)", desc: "[CMS Placeholder: Step description]" },
              { num: "04", title: "Construction/Fit-out", desc: "[CMS Placeholder: Step description]" },
              { num: "05", title: "Final Inspection & Completion Cert", desc: "[CMS Placeholder: Step description]" }
            ].map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-ink-soft bg-brass shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow text-ink font-bold font-mono">
                  {step.num}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-gray-50 dark:bg-ink p-6 rounded-xl border border-gray-200 dark:border-border-dark shadow-sm">
                  <h4 className="text-xl font-bold mb-2 text-ink dark:text-white">{step.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Common Issues */}
      <section className="py-16 px-4 bg-stamp-red/5 dark:bg-stamp-red/10 border-y border-stamp-red/20">
        <div className="container mx-auto max-w-4xl flex gap-6 items-start">
          <AlertTriangle className="h-10 w-10 text-stamp-red shrink-0" />
          <div>
            <h2 className="text-2xl font-bold text-ink dark:text-white mb-3">Common Rejection Reasons</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              [CMS Placeholder: Identify common pitfalls for this specific project type. E.g. "For mezzanines, failing to provide adequate egress routes or exceeding 50% of the ground floor area without special dispensation."]
            </p>
          </div>
        </div>
      </section>

      {/* 10. Real Projects */}
      <section className="py-24 px-4 bg-vellum dark:bg-ink">
        <div className="container mx-auto">
          <h2 className="text-3xl font-display font-bold text-ink dark:text-white mb-10 text-center">Approved {projectType.name} Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.length > 0 ? (
              relatedProjects.map(proj => (
                <ProjectCard 
                  key={proj.id}
                  id={proj.id}
                  title={proj.title}
                  slug={proj.slug}
                  location={proj.location}
                  approvalStatus={proj.approvalStatus}
                />
              ))
            ) : (
              <div className="col-span-full p-8 text-center text-gray-500 border border-dashed rounded-xl">
                No recent projects of this type have been published yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 11. Before/After */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-ink-soft text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-display font-bold text-ink dark:text-white mb-6">Visual Evidence</h2>
          <div className="h-96 bg-gray-200 dark:bg-ink rounded-xl border border-dashed border-gray-400 dark:border-gray-600 flex items-center justify-center text-gray-500">
            [CMS Placeholder: Before/After Interactive Slider Component to be placed here once imagery is uploaded]
          </div>
        </div>
      </section>

      {/* 12. FAQs */}
      <section className="py-24 px-4 bg-white dark:bg-ink">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-display font-bold text-ink dark:text-white mb-10 text-center">{projectType.name} FAQs</h2>
          <FAQAccordion faqs={pageFaqs} />
        </div>
      </section>

      {/* 13, 14, 15. Related Nav & 16. Final CTA */}
      <section className="py-32 px-4 bg-ink text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Need this approved?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Contact our engineering team to review your {projectType.name.toLowerCase()} requirements and get a precise timeline.
          </p>
          <div className="flex justify-center mb-16">
            <GlobalCta />
          </div>
          
          <div className="pt-12 border-t border-border-dark flex flex-wrap justify-center gap-4">
            <span className="text-gray-400 text-sm w-full mb-2 uppercase tracking-wider">Related</span>
            {/* Semantic links to other sections */}
            <a href="/authority-approvals" className="text-brass hover:underline">Authority Approvals</a>
            <span className="text-gray-600">•</span>
            <a href="/services" className="text-brass hover:underline">Our Services</a>
            <span className="text-gray-600">•</span>
            <a href="/guides" className="text-brass hover:underline">Knowledge Base</a>
          </div>
        </div>
      </section>

    </div>
  );
}

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { AuthorityRepository } from "@/lib/ai/repositories/AuthorityRepository";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const authority = await AuthorityRepository.findBySlug(slug);

  if (!authority) return { title: "Authority Not Found" };

  return {
    title: `${authority.name} Approvals Dubai | Goldland Contracting`,
    description: authority.description || `Comprehensive guide to obtaining ${authority.name} approvals for your design, engineering, and fit-out projects in Dubai.`,
    alternates: {
      canonical: `https://goldlandcontracting.ae/authority-approvals/${slug}`,
    },
    openGraph: {
      title: `${authority.name} Approvals Dubai | Goldland Contracting`,
      description: authority.description || `Comprehensive guide to obtaining ${authority.name} approvals in Dubai.`,
      url: `https://goldlandcontracting.ae/authority-approvals/${slug}`,
      type: "article",
    },
  };
}

export default async function AuthorityApprovalPage({ params }: PageProps) {
  const { slug } = await params;
  
  const authority = await AuthorityRepository.findBySlug(slug);

  if (!authority) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${authority.name} Approval Services`,
    "description": authority.description || `Approval services for ${authority.name}`,
    "provider": {
      "@type": "Organization",
      "name": "Goldland Contracting LLC",
      "url": "https://goldlandcontracting.ae"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Script
        id={`jsonld-authority-${authority.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-primary text-primary-foreground py-20 px-6 sm:px-12">
        <div className="container mx-auto max-w-4xl">
          <Link href="/authority-approvals" className="text-accent text-sm font-medium hover:underline mb-8 inline-block">
            &larr; Back to Authorities
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{authority.name} Approval</h1>
          <p className="text-lg opacity-80">
            {authority.shortDescription || `Comprehensive guide to obtaining ${authority.name} approvals for your design, engineering, and fit-out projects in Dubai.`}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-12 bg-background">
        <div className="container mx-auto max-w-4xl space-y-12">
          
          <div>
            <h2 className="text-2xl font-bold mb-4">When is {authority.name} Approval Relevant?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Approval from {authority.name} is generally required when undergoing structural changes, MEP modifications, or fit-outs within their specific jurisdiction ({authority.jurisdiction || 'Dubai'}). Final approval requirements can vary by project scope, location, building status, and current regulations. Goldland should verify the applicable pathway for each project.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Approval Process</h2>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>Understand client requirements and jurisdiction boundaries.</li>
              <li>Prepare and finalize design according to {authority.name} guidelines.</li>
              <li>Submit client-approved design and documentation.</li>
              <li>Coordinate inspections and address authority comments.</li>
              <li>Acquire final NOC and project completion certificates.</li>
            </ol>
          </div>

          <div className="bg-surface p-8 rounded-xl border border-border-light dark:border-border-dark mt-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#C9A544]/10 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#C9A544]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Verified Engineering Support for {authority.name}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Goldland Contracting LLC is an independent, licensed engineering and contracting firm. While we do not claim official partnership or endorsement by {authority.name}, our in-house MEP and structural engineers possess verified experience in strictly adhering to their building codes and successfully securing No Objection Certificates (NOCs) for our clients.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#C9A544] text-black font-bold px-6 py-3 rounded hover:bg-[#C9A544]/90 transition-colors">
                  Speak with an Engineer
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

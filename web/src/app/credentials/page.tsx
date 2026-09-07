import React from "react";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlobalCta } from "@/components/layout/GlobalCta";
import { CredentialCard } from "@/components/cards/CredentialCard";

export const metadata: Metadata = {
  title: "Official Credentials & Licenses | Goldland Contracting",
  description: "View Goldland Contracting's official Dubai trade licenses, ISO certifications, and authority registrations.",
  alternates: {
    canonical: "https://goldlandcontracting.ae/credentials",
  },
};

export default function CredentialsPage() {
  return (
    <div className="bg-vellum dark:bg-ink min-h-screen">
      {/* 1. Hero */}
      <section className="bg-ink text-white pt-24 pb-20 px-4 border-b border-border-dark">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs 
            items={[
              { label: "Credentials & Licenses" }
            ]} 
            className="mb-8 text-gray-400 dark:text-gray-400 [&_a]:text-gray-400 [&_span]:text-white"
          />
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Verified Credentials.</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mb-6">
            Transparency is a core engineering principle. Below is our current registry of trade licenses, authority approvals, and operational certifications.
          </p>
        </div>
      </section>

      {/* 2. Credentials Grid */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-ink">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-display font-bold text-ink dark:text-white mb-10">Trade Licenses & Registrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <CredentialCard 
              title="Dubai Mainland Trade License"
              issuer="Department of Economy and Tourism (DET)"
              year="[CMS Placeholder]"
              credentialNumber="[CMS Placeholder]"
              description="Primary operating license for engineering, contracting, and fit-out activities within Dubai Mainland."
              type="license"
            />
            <CredentialCard 
              title="Dubai Civil Defence (DCD) Registration"
              issuer="Ministry of Interior - DCD"
              year="[CMS Placeholder]"
              credentialNumber="[CMS Placeholder]"
              description="Authorized to design, install, and certify fire safety and alarm systems."
              type="license"
            />
            <CredentialCard 
              title="Dubai Municipality (DM) Contractor"
              issuer="Dubai Municipality"
              year="[CMS Placeholder]"
              credentialNumber="[CMS Placeholder]"
              description="Registered contracting entity permitted to pull permits for structural and architectural works."
              type="license"
            />
          </div>

          <h2 className="text-3xl font-display font-bold text-ink dark:text-white mb-10">Certifications & Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CredentialCard 
              title="ISO 9001:2015 Quality Management"
              issuer="[CMS Placeholder: Auditing Body]"
              year="[CMS Placeholder]"
              credentialNumber="[CMS Placeholder]"
              description="Certified for consistent quality in project delivery and engineering services."
              type="certification"
            />
            <CredentialCard 
              title="ISO 45001:2018 Occupational Health & Safety"
              issuer="[CMS Placeholder: Auditing Body]"
              year="[CMS Placeholder]"
              credentialNumber="[CMS Placeholder]"
              description="Certified for robust health, safety, and environmental management systems on active sites."
              type="certification"
            />
          </div>
        </div>
      </section>

      {/* 3. Global CTA */}
      <section className="py-24 px-4 bg-ink text-center border-t border-border-dark">
        <div className="container mx-auto max-w-3xl">
          <GlobalCta />
        </div>
      </section>
    </div>
  );
}

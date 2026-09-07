import React from "react";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlobalCta } from "@/components/layout/GlobalCta";
import { TeamCard } from "@/components/cards/TeamCard";
import { ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Engineering Team | Goldland Contracting",
  description: "Meet the verified engineers, architects, and project managers leading Goldland's fit-out and authority approval operations in Dubai.",
  alternates: {
    canonical: "https://goldlandcontracting.ae/team",
  },
};

export default async function TeamPage() {
  const members = await db.select().from(teamMembers).where(eq(teamMembers.isVerified, true));

  return (
    <div className="bg-vellum dark:bg-ink min-h-screen">
      {/* 1. Hero */}
      <section className="bg-ink text-white pt-24 pb-20 px-4 border-b border-border-dark relative">
        <div className="container mx-auto max-w-5xl relative z-10">
          <Breadcrumbs 
            items={[
              { label: "Our Team" }
            ]} 
            className="mb-8 text-gray-400 dark:text-gray-400 [&_a]:text-gray-400 [&_span]:text-white"
          />
          <div className="inline-block px-3 py-1 mb-6 text-sm font-semibold tracking-wider text-brass uppercase border border-brass/30 rounded-full bg-brass/10">
            Engineering Leadership
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Built by Engineers.</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mb-10">
            We don't outsource our expertise. Every drawing, calculation, and authority submission is managed by our in-house team of verified technical professionals.
          </p>
        </div>
      </section>

      {/* 2. Accountability Notice */}
      <section className="py-6 px-4 bg-gray-50 dark:bg-ink-soft border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto max-w-5xl flex gap-4 items-center">
          <ShieldCheck className="h-6 w-6 text-brass shrink-0" />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Technical Accountability:</strong> All team members listed below hold active engineering credentials or verified administrative roles within Dubai. Data is dynamically verified via our internal CMS.
          </p>
        </div>
      </section>

      {/* 3. Team Grid */}
      <section className="py-20 px-4 bg-white dark:bg-ink">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.length > 0 ? (
              members.map(member => (
                <TeamCard 
                  key={member.id}
                  name={member.name}
                  role={member.role || "[CONTENT REQUIRED]"}
                  department={member.department ?? undefined}
                  bio={member.bio || "[CONTENT REQUIRED]"}
                  imageUrl={member.imageUrl}
                  isVerified={member.isVerified}
                  linkedInUrl={member.linkedInUrl}
                />
              ))
            ) : (
              <div className="col-span-full p-12 text-center text-gray-500 border border-dashed rounded-xl">
                [CMS Placeholder: No verified team members published yet.]
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Global CTA */}
      <section className="py-24 px-4 bg-ink text-center border-t border-border-dark">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Need expert technical advice?</h2>
          <div className="flex justify-center mb-16">
            <GlobalCta />
          </div>
        </div>
      </section>
    </div>
  );
}

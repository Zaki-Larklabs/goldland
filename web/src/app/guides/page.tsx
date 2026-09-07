import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { guides } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlobalCta } from "@/components/layout/GlobalCta";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Engineering & Approval Guides | Goldland Contracting",
  description: "Technical knowledge base and approval guides for Dubai authorities including DDA, DM, DCD, and Trakhees.",
  alternates: {
    canonical: "https://goldlandcontracting.ae/guides",
  },
};

export default async function GuidesIndexPage() {
  // Fetch published guides
  const allGuides = await db.select()
    .from(guides)
    .orderBy(desc(guides.id));

  const clusters = [
    "DDA", "Dubai Municipality", "DCD", "Trakhees", "DEWA", 
    "Warehouse", "Mezzanine", "Villa Modification", "Commercial Fit-Out", 
    "Restaurant", "Clinic", "Pharmacy", "Office", "Retail"
  ];

  return (
    <div className="bg-vellum dark:bg-ink min-h-screen flex flex-col">
      {/* 1. Hero */}
      <section className="bg-ink text-white pt-24 pb-20 px-4 border-b border-border-dark">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs 
            items={[
              { label: "Approval Guides" }
            ]} 
            className="mb-8 text-gray-400 dark:text-gray-400 [&_a]:text-gray-400 [&_span]:text-white"
          />
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Technical Knowledge Base.</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mb-8">
            Expert-reviewed guides covering design constraints, MEP regulations, and authority submission procedures across Dubai.
          </p>
          
          {/* Client-side Search Mockup (In reality this would be a Client Component wrapping an input) */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search guides, regulations, or authorities..." 
              className="w-full bg-white/10 border border-white/20 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brass"
            />
          </div>
        </div>
      </section>

      {/* 2. Content Clusters & Grid */}
      <section className="py-20 px-4 flex-grow bg-white dark:bg-ink">
        <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar: Categories */}
          <aside className="lg:w-64 shrink-0">
            <h3 className="font-bold text-ink dark:text-white mb-4 uppercase tracking-wider text-sm">Content Clusters</h3>
            <ul className="space-y-2">
              {clusters.map(cluster => (
                <li key={cluster}>
                  <Link href={`/guides?cluster=${encodeURIComponent(cluster)}`} className="text-gray-600 dark:text-gray-400 hover:text-brass dark:hover:text-brass transition-colors text-sm font-medium">
                    {cluster}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center border-b border-border-light dark:border-border-dark pb-4">
              <h2 className="text-2xl font-bold font-display text-ink dark:text-white">Latest Guides</h2>
              <span className="text-sm text-gray-500">{allGuides.length} Published</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allGuides.length > 0 ? (
                allGuides.map((guide: any) => (
                  <Card key={guide.id} className="flex flex-col h-full group hover:border-brass transition-colors dark:bg-ink-soft">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-ink dark:text-gray-300 font-medium">
                          {guide.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(guide.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-brass transition-colors leading-tight">
                        <Link href={`/guides/${guide.slug}`} className="before:absolute before:inset-0">
                          {guide.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                        {guide.content.substring(0, 150)}...
                      </p>
                      <div className="text-brass text-sm font-medium flex items-center">
                        Read Guide <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full p-12 text-center text-gray-500 border border-dashed rounded-xl">
                  [CMS Placeholder: No guides published yet.]
                </div>
              )}
            </div>

            {/* Pagination Mockup */}
            {allGuides.length > 0 && (
              <div className="mt-12 flex justify-center gap-2">
                <button className="px-4 py-2 border rounded text-sm disabled:opacity-50" disabled>Previous</button>
                <button className="px-4 py-2 bg-ink text-white dark:bg-white dark:text-ink rounded text-sm">1</button>
                <button className="px-4 py-2 border rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-800">2</button>
                <button className="px-4 py-2 border rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-800">Next</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Global CTA */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-ink border-t border-border-light dark:border-border-dark text-center">
        <div className="container mx-auto max-w-3xl">
          <GlobalCta />
        </div>
      </section>
    </div>
  );
}

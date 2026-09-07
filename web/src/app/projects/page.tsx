import React from "react";
import Link from "next/link";
import Script from "next/script";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import type { Metadata } from "next";

import { VideoMaskOverlay } from "@/components/ui/video-mask-overlay";
import { ProjectCard } from "@/components/cards/ProjectCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Approved Projects & Case Studies | Goldland Contracting",
  description: "Browse our portfolio of completed and approved engineering, fit-out, and structural projects across Dubai's major authorities.",
  alternates: {
    canonical: "https://goldlandcontracting.ae/projects",
  },
};

export default async function ProjectsIndex() {
  const allProjects = await db.select().from(projects).orderBy(desc(projects.publishedAt));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": allProjects.map((proj, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Article",
        "url": `https://goldlandcontracting.ae/projects/${proj.slug}`,
        "name": proj.title
      }
    }))
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Script
        id="jsonld-projects-list"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="force-dark relative overflow-hidden bg-ink text-white py-24 px-6 sm:px-12 border-b border-border-dark">
        <video 
          src="/Create_an_ultra_premium_photo.mp4" 
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover object-left opacity-22 mix-blend-luminosity pointer-events-none"
          style={{ transform: "scale(1.5)", transformOrigin: "left center" }}
        />
        <VideoMaskOverlay intensity={0.85} />
        <div className="container relative mx-auto max-w-4xl text-center" style={{ zIndex: 5 }}>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Real Projects. Real Evidence.</h1>
          <p className="text-xl text-gray-300">
            Browse our portfolio of completed and approved engineering and fit-out projects across Dubai.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-12 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.length > 0 ? (
              allProjects.map((proj) => (
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
              <div className="col-span-full p-12 text-center text-gray-500 border border-dashed rounded-xl">
                [CMS Placeholder: No projects published yet.]
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

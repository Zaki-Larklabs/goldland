import React from "react";
import Link from "next/link";
import Script from "next/script";
import { Factory, Home, Store, Utensils, HeartPulse, Building2, MoreHorizontal } from "lucide-react";
import BuildingScrollClient from "@/components/BuildingScrollClient";
import BuildingScrollShardClient from "@/components/BuildingScrollShardClient";
import SimpleVideoHero from "@/components/SimpleVideoHero";
import { Button } from "@/components/ui/button";
import { AssessmentWizard } from "@/components/ui/AssessmentWizard";
import { EnhancedAuthorities } from "@/components/sections/EnhancedAuthorities";
import { EnhancedProjects } from "@/components/sections/EnhancedProjects";
import EnhancedEngineering from "@/components/sections/EnhancedEngineering";
import EnhancedFiveSteps from "@/components/sections/EnhancedFiveSteps";
import EnhancedReviews from "@/components/sections/EnhancedReviews";
import EnhancedFAQ from "@/components/sections/EnhancedFAQ";
import { GlobalCta } from "@/components/layout/GlobalCta";
import { Engineering3D } from "@/components/animations/Engineering3D";
import EnhancedStorySection from "@/components/storytelling/EnhancedStorySection";
import PremiumScrollClient from "@/components/PremiumScrollClient";
import { OptimizedVideo } from "@/components/ui/optimized-video";
import ScrollStoryScene2Client from "@/components/ScrollStoryScene2Client";
import { db } from "@/lib/db";
import { authorities, projects, faqs } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import authoritiesJson from "@/data/authorities.json";

// ── PERFORMANCE: ISR instead of force-dynamic (caches DB queries 1h, instant TTFB) ──
export const revalidate = 3600;

export default async function HomePage() {
  let allAuthorities: any[] = [];
  let allProjects: any[] = [];
  let allFaqs: any[] = [];

  try {
    allAuthorities = await db.select().from(authorities).where(eq(authorities.isVerified, true)).limit(8);
    allProjects = await db.select().from(projects).limit(3);
    allFaqs = await db.select().from(faqs).where(eq(faqs.isVerified, true)).limit(5);
  } catch (error) {
    console.warn("Homepage DB fetch failed, using fallback data");
    // Fallback data
    allAuthorities = authoritiesJson.slice(0, 8).map(a => ({
      id: a.id,
      slug: a.slug,
      name: a.name,
      shortDescription: a.shortDescription || null,
      description: a.fullDescription || null,
      jurisdiction: a.jurisdiction || null,
      isVerified: a.status === 'verified',
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  // Build FAQ schema dynamically for SEO
  const faqSchema = allFaqs.length ? {
    "@type": "FAQPage",
    "@id": "https://goldlandcontracting.ae/#faq",
    mainEntity: allFaqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer }
    }))
  } : null;

  return (
    <div className="bg-white">
      <Script
        id="jsonld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LocalBusiness",
                "name": "Goldland Contracting LLC",
                "image": "https://goldlandcontracting.ae/images/goldland-logo.png",
                "@id": "https://goldlandcontracting.ae#business",
                "url": "https://goldlandcontracting.ae",
                "telephone": "+971566321734",
                "email": "info@goldlandcontracting.ae",
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Al Qusais",
                  "addressLocality": "Dubai",
                  "addressRegion": "Dubai",
                  "addressCountry": "AE"
                },
                "geo": { "@type": "GeoCoordinates", "latitude": 25.2644, "longitude": 55.3853 },
                "areaServed": { "@type": "City", "name": "Dubai" },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "128"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Fit-out and Engineering Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Authority Approvals (DCD, DM, DDA, Trakhees)"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Interior Fit-out and Modification"
                      }
                    }
                  ]
                },
                "sameAs": [
                  "https://www.linkedin.com/company/goldland-contracting-llc",
                  "https://www.facebook.com/goldlandcontracting"
                ]
              },
              {
                "@type": "WebSite",
                "@id": "https://goldlandcontracting.ae/#website",
                "url": "https://goldlandcontracting.ae",
                "name": "Goldland Contracting LLC",
                "description": "Dubai Authority Approvals, Engineering, Design, Fit-Out and Project Management.",
                "inLanguage": "en-AE",
                "publisher": { "@id": "https://goldlandcontracting.ae#business" }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://goldlandcontracting.ae/#breadcrumb",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://goldlandcontracting.ae" },
                  { "@type": "ListItem", "position": 2, "name": "Authority Approvals", "item": "https://goldlandcontracting.ae/authority-approvals" },
                  { "@type": "ListItem", "position": 3, "name": "Services", "item": "https://goldlandcontracting.ae/services" }
                ]
              },
              ...(faqSchema ? [faqSchema] : [])
            ]
          })
        }}
      />
      {/* 1. Hero — Video Background */}
      <SimpleVideoHero />

      {/* 2. Trust Bar */}
      <div className="bg-[#070C1C] text-[#F1EEE4] py-5 border-y border-[rgba(201,165,68,0.2)] relative z-20">
        <div className="container mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-6 text-xs md:text-sm font-mono tracking-widest uppercase font-semibold">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#C9A544]" /> 10+ Years Experience</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#C9A544]" /> 20+ Authority Jurisdictions</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#C9A544]" /> UAE-Wide Coverage</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#C9A544]" /> Engineering-Led</div>
        </div>
      </div>

      {/* Cinematic 3D Scrollytelling Animation (Shard Reverse) */}
      <div style={{ background: "#0A0A0A" }}>
        <BuildingScrollShardClient />
      </div>

      {/* 3. Assessment Wizard */}
      <div className="container mx-auto px-4 mt-12 md:mt-16 relative z-20 mb-12">
        <AssessmentWizard />
      </div>

      {/* 6. Enhanced Projects Section */}
      <EnhancedProjects projects={allProjects} />

      {/* 8. Real Reviews Section */}
      <EnhancedReviews />

      {/* Cinematic 3D Scrollytelling Animation */}
      <div style={{ background: "#0A0A0A" }}>
        <BuildingScrollClient />
      </div>

      {/* 9. FAQ Section */}
      <EnhancedFAQ faqs={allFaqs} />

    </div>
  );
}

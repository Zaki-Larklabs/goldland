import React from "react";
import Link from "next/link";
import Script from "next/script";
import { Factory, Home, Store, Utensils, HeartPulse, Building2, MoreHorizontal } from "lucide-react";
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
import { authorities, projects, faqs, services, projectTypes } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import authoritiesJson from "@/data/authorities.json";
import { AuthorityDiscovery } from "@/components/sections/AuthorityDiscovery";

import { generateSeoMetadata, getPageHeadings } from "@/lib/seo/getSeo";

export async function generateMetadata() {
  return generateSeoMetadata("/", {
    title: "Dubai Authority Approvals & Engineering Services | Goldland Contracting",
    description: "Goldland Contracting L.L.C. — engineering-led authority approvals, MEP, architecture and fit-out delivery across Dubai. Send your drawings for assessment.",
    keywords: ["Dubai Authority Approvals", "DDA Approval", "Dubai Municipality Approval", "DCD Approval", "Fit-out Contractors Dubai", "MEP Engineering Dubai"],
  });
}

// ── PERFORMANCE: ISR instead of force-dynamic (caches DB queries 1h, instant TTFB) ──
export const revalidate = 3600; // ISR 1h — cached DB queries, instant TTFB

export default async function HomePage() {
  let allAuthorities: any[] = [];
  let allProjects: any[] = [];
  let allFaqs: any[] = [];
  let allServices: any[] = [];
  let allProjectTypes: any[] = [];

  try {
    allAuthorities = await db.select().from(authorities).where(eq(authorities.isVerified, true)).limit(12);
    allProjects = await db.select().from(projects).limit(6);
    allFaqs = await db.select().from(faqs).where(eq(faqs.isVerified, true)).limit(5);
    try { allServices = await db.select().from(services).limit(6); } catch {}
    try { allProjectTypes = await db.select().from(projectTypes).limit(8); } catch {}
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

  // SEO portal → on-page headings override (H1 via hero, H2 via first section)
  const headings = await getPageHeadings("/");
  // Site Texts portal → editable frontend copy (hero sub, trust bar, CTA)
  const { getPageContent } = await import("@/lib/content/getContent");
  const copy = await getPageContent("home");
  const t = (key: string, fallback: string) => copy[key] ?? fallback;

  // Build FAQ schema — merge DB faqs + docx 5 authority FAQs (valid, visible; answers portal-editable via Site Texts)
  const docFaqs = [
    { question: "What are Dubai authority approvals?", answer: t("faq_a1", "Dubai authority approvals are permits, NOCs and technical approvals required for certain construction, fit-out, renovation and modification projects. Depending on the project, approvals may involve DDA, Dubai Municipality, DCD, DEWA, Trakhees, JAFZA and other authorities.") },
    { question: "Which authority approval does my project need in Dubai?", answer: t("faq_a2", "It depends on your project's location, property type and scope of work. Goldland Contracting can assess your project and identify the relevant authority and approval requirements.") },
    { question: "Do villa modifications require approval in Dubai?", answer: t("faq_a3", "Yes, many villa modifications require approval before work begins. Requirements depend on the property's location, community and type of modification.") },
    { question: "Do I need approval for a swimming pool or mezzanine floor?", answer: t("faq_a4", "Yes, swimming pool construction and mezzanine floor projects may require approval from the relevant authority. The requirements depend on the property and project scope.") },
    { question: "How long does a Dubai authority approval take?", answer: t("faq_a5", "Approval time varies depending on the authority, project type and completeness of the submitted documents. Goldland Contracting manages the submission and coordination process to help avoid unnecessary delays.") },
  ];
  const mergedFaqs = [...(allFaqs || []), ...docFaqs];
  const faqSchema = mergedFaqs.length ? {
    "@type": "FAQPage",
    "@id": "https://goldlandcontracting.ae/#faq",
    mainEntity: mergedFaqs.map(f => ({
      "@type": "Question",
      name: (f as any).question || (f as any).name,
      acceptedAnswer: { "@type": "Answer", text: (f as any).answer || (f as any).acceptedAnswer?.text || "" }
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
      <SimpleVideoHero h1={headings.h1} heroSub={t("hero_sub", "Engineering-led authority approval support for construction, fit-out, renovation and modification projects across Dubai.")} />

      {/* 2. Trust Bar — per HOME PAGE - CONTENT.docx */}
      <div className="bg-[#070C1C] text-[#F1EEE4] py-5 border-y border-[rgba(201,165,68,0.2)] relative z-20">
        <div className="container mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-6 text-xs md:text-sm font-mono tracking-widest uppercase font-semibold">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#C9A544]" /> {t("trust_1", "10+ Years of Experience")}</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#C9A544]" /> {t("trust_2", "20+ Authority Jurisdictions")}</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#C9A544]" /> {t("trust_3", "500+ Approvals Filed")}</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#C9A544]" /> {t("trust_4", "In-House Engineering Team")}</div>
        </div>
      </div>

      {/* Cinematic 3D Scrollytelling Animation (Shard Reverse) */}
      <div style={{ background: "#0A0A0A" }}>
        <BuildingScrollShardClient />
      </div>

      {/* 3. Authority Approvals We Handle — per HOME PAGE - CONTENT.docx */}
      <section className="py-16 md:py-20 bg-[#FDFBF6] dark:bg-[#050A14] border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold text-[#B48B2D] mb-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> Authority Approvals We Handle in Dubai</div>
            <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight text-[#0A0D14] dark:text-white">{headings.h2 ?? "Authority Approvals We Handle in Dubai"}</h2>
            <p className="text-sm text-[#6B7280] dark:text-white/60 mt-3">Navigate directly to the authority approval support relevant to your project. Every card links to its dedicated service page with verified guidance.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {allAuthorities.filter((a: any) => a.slug !== 'sharjah').slice(0, 8).map((auth) => {
              const logoMap: Record<string, string> = {
                dda: "/images/authority-logos/dda.png",
                "dubai-municipality": "/images/authority-logos/dubai-municipality.png",
                dm: "/images/authority-logos/dubai-municipality.png",
                dcd: "/images/authority-logos/dcd.png",
                dewa: "/images/authority-logos/dewa.png",
                rta: "/images/authority-logos/rta.png",
                trakhees: "/images/authority-logos/trakhees.png",
                "dubai-south": "/images/authority-logos/dubai-south.png",
                jafza: "/images/authority-logos/jafza.png",
                diez: "/images/authority-logos/diez.png",
                concordia: "/images/authority-logos/concordia.png",
                emaar: "/images/authority-logos/emaar.png",
                nakheel: "/images/authority-logos/nakheel.png",
                tecom: "/images/authority-logos/tecom.png",
                sharjah: "/images/authority-logos/sharjah.png",
                solar: "/images/authority-logos/solar.png",
                "fire-systems": "/images/authority-logos/fire-systems.png",
              };
              const logo = logoMap[auth.slug];
              return (
                <Link key={auth.id} href={`/authority-approvals/${auth.slug}`} className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] hover:border-[#C9A544]/40 hover:shadow-xl transition-all overflow-hidden flex flex-col">
                  <div className="h-[110px] bg-[#FDFBF6] dark:bg-white flex items-center justify-center p-4 border-b border-black/[0.04] dark:border-white/5 group-hover:bg-[#FEFBF3] dark:group-hover:bg-[#FFFDF5] transition-colors relative">
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#C9A544] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={logo} alt={`${auth.name} logo`} className="max-h-[64px] max-w-[150px] w-auto h-auto object-contain drop-shadow-sm group-hover:scale-[1.04] transition-transform duration-500" loading="lazy" />
                    ) : (
                      <Building2 className="w-8 h-8 text-[#C9A544]" />
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1 bg-white dark:bg-transparent">
                    <div className="text-[13px] font-bold text-[#0A0D14] dark:text-white leading-tight">{auth.name}</div>
                    <div className="text-[11px] text-[#6B7280] dark:text-white/55 mt-1 line-clamp-2 flex-1">{auth.shortDescription || auth.description?.slice(0, 90)}</div>
                    <div className="mt-3 text-[11px] font-semibold text-[#B48B2D] flex items-center gap-1">View approval support <span className="group-hover:translate-x-0.5 transition-transform">→</span></div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/authority-approvals" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-[#C9A544]/40 text-xs font-bold tracking-wide text-[#0A0D14] dark:text-white">View All Authorities →</Link>
          </div>
        </div>
      </section>

      {/* 5. Which Authority Approval Does Your Project Need? — discovery (spec 05-08) */}
      <AuthorityDiscovery />

      {/* 6. What We Handle — spec 06 */}
      <section className="py-12 bg-white dark:bg-[#0A0A0A] border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold text-[#B48B2D] mb-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> What We Handle</div>
            <h2 className="text-[24px] md:text-[28px] font-bold tracking-tight text-[#0A0D14] dark:text-white">Authority, Engineering and Project Support — One Team</h2>
            <p className="text-sm text-[#6B7280] dark:text-white/60 mt-2">From assessment to inspection, Goldland connects every approval to its engineering requirement.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { t: "Authority Approvals", d: "DM, DCD, DDA, DEWA, Trakhees, JAFZA, Dubai South, RTA, Concordia and developer NOCs — jurisdiction-mapped per project.", href: "/authority-approvals" },
              { t: "Engineering & Drawings", d: "Architectural, structural and MEP documentation prepared to authority standards — not generic templates.", href: "/services" },
              { t: "Project Delivery", d: "Fit-out, renovation and modification support with submission, NOC and inspection coordination.", href: "/projects" },
            ].map((c) => (
              <Link key={c.t} href={c.href} className="rounded-2xl border border-black/10 dark:border-white/10 bg-[#FDFBF6] dark:bg-white/[0.04] p-6 hover:border-[#C9A544]/40 hover:shadow-lg transition-all">
                <div className="text-[14px] font-bold text-[#0A0D14] dark:text-white">{c.t}</div>
                <div className="text-[13px] leading-relaxed text-[#6B7280] dark:text-white/60 mt-2">{c.d}</div>
                <div className="mt-3 text-xs font-semibold text-[#B48B2D]">Learn more →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Dubai Authority Approval Process — per HOME PAGE - CONTENT.docx */}
      <section className="py-16 md:py-20 bg-[#070C1C] text-white relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(201,165,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,68,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} aria-hidden />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold text-[#C9A544] mb-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> Our Process</div>
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-tight">Our Dubai Authority Approval Process</h2>
            <p className="text-sm text-white/60 mt-2">A clear six-step pathway from assessment to inspection — engineering-led, no guarantees, no guesswork.</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {[
              { n: "01", t: "Project Assessment", d: "We review your property location, project type and proposed scope.", icon: "◉" },
              { n: "02", t: "Authority Identification", d: "We determine whether your project requires Dubai Municipality, DDA, DCD, DEWA, Trakhees, JAFZA, Dubai South, developer or other approvals.", icon: "⬡" },
              { n: "03", t: "Drawing & Document Preparation", d: "Our engineering team prepares the required architectural, structural and MEP documentation.", icon: "▭" },
              { n: "04", t: "Submission & Authority Coordination", d: "We submit the application and coordinate with the relevant authority.", icon: "⬢" },
              { n: "05", t: "Comments & Revisions", d: "We manage authority comments and required drawing revisions.", icon: "✎" },
              { n: "06", t: "Approval & Inspection", d: "We coordinate the final approval, NOC or inspection as applicable.", icon: "✓" },
            ].map((s) => (
              <div key={s.n} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex flex-col hover:bg-white/[0.07] hover:border-[#C9A544]/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A544]/15 border border-[#C9A544]/30 flex items-center justify-center text-[11px] font-bold text-[#C9A544] group-hover:bg-[#C9A544] group-hover:text-black transition-colors">{s.n}</div>
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[12px] text-[#C9A544]">{s.icon}</div>
                </div>
                <div className="text-[13px] font-bold text-white mt-1">{s.t}</div>
                <div className="text-[11px] leading-snug text-white/55 mt-1.5 flex-1">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Engineering-Led Authority Approval Support — spec 11 */}
      <section className="py-16 md:py-20 bg-[#FDFBF6] dark:bg-[#0A0D14] border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold text-[#B48B2D] mb-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> Engineering-Led Authority Approval Support</div>
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#0A0D14] dark:text-white">Approvals Start With Engineering</h2>
            <p className="text-sm text-[#6B7280] dark:text-white/60 mt-2">Authority approval is connected to the technical quality and coordination of the project documentation. Goldland connects every approval to its engineering discipline — no paperwork-only submissions.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-6xl mx-auto">
            {[
              { label: "Architecture", icon: "⌖" },
              { label: "Structural Engineering", icon: "⬡" },
              { label: "MEP Engineering", icon: "⚡" },
              { label: "Electrical", icon: "◈" },
              { label: "Mechanical", icon: "⚙" },
              { label: "Plumbing", icon: "≋" },
              { label: "Fire & Life Safety", icon: "⬢" },
              { label: "Interior Design", icon: "⬔" },
              { label: "Fit-Out", icon: "▭" },
              { label: "Project Coordination", icon: "⬣" },
            ].map((item) => (
              <div key={item.label} className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4 text-center hover:border-[#C9A544]/30 hover:shadow-md transition-all">
                <div className="w-9 h-9 mx-auto rounded-xl bg-[#0A0D14] dark:bg-white text-[#C9A544] dark:text-[#0A0D14] flex items-center justify-center mb-2.5 text-[14px] font-bold group-hover:bg-[#C9A544] group-hover:text-black dark:group-hover:bg-[#C9A544] transition-colors">{item.icon}</div>
                <div className="text-[11px] font-bold tracking-wide text-[#0A0D14] dark:text-white leading-tight uppercase">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A0D14] dark:bg-white text-white dark:text-[#0A0D14] text-xs font-bold hover:opacity-90">Explore Engineering Services →</Link>
          </div>
        </div>
      </section>

      {/* 09. Project Types — spec 12 */}
      <section className="py-16 md:py-20 bg-white dark:bg-[#050A14] border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold text-[#B48B2D] mb-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> Project Types</div>
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#0A0D14] dark:text-white">Authority Approval Support for Different Project Types</h2>
            <p className="text-sm text-[#6B7280] dark:text-white/60 mt-2">Every project type has its own authority and engineering considerations. Explore the support for your building type.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-6xl mx-auto">
            {(allProjectTypes.length ? allProjectTypes : [{slug:"warehouse",name:"Warehouse"},{slug:"mezzanine-floor",name:"Mezzanine"},{slug:"office",name:"Office"},{slug:"restaurant",name:"Restaurant"},{slug:"clinic",name:"Clinic"},{slug:"villa-modification",name:"Villa"},{slug:"shop",name:"Retail"},{slug:"commercial-fitout",name:"Fit-Out"}]).map((pt: any) => (
              <Link key={pt.slug} href={`/project-types/${pt.slug}`} className="group rounded-2xl border border-black/10 dark:border-white/10 bg-[#FDFBF6] dark:bg-white/[0.04] p-4 text-center hover:border-[#C9A544]/40 hover:shadow-md transition-all">
                <div className="w-10 h-10 mx-auto rounded-xl bg-white dark:bg-white/[0.06] border border-black/5 dark:border-white/10 flex items-center justify-center mb-3 group-hover:bg-[#C9A544] group-hover:border-[#C9A544] transition-colors">
                  <Building2 className="w-5 h-5 text-[#C9A544] group-hover:text-black" />
                </div>
                <div className="text-[13px] font-bold text-[#0A0D14] dark:text-white">{pt.name}</div>
                <div className="text-[11px] text-[#B48B2D] mt-1">View support →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Goldland — per HOME PAGE - CONTENT.docx */}
      <section className="py-16 md:py-20 bg-white dark:bg-[#0A0A0A] border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold text-[#B48B2D] mb-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> Why Choose Goldland</div>
              <h2 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#0A0D14] dark:text-white">Why Choose Goldland for Authority Approvals?</h2>
              <p className="text-sm text-[#6B7280] dark:text-white/60 mt-3">Engineering-led support across mainland, free zones and developer jurisdictions — one team from drawings to NOC.</p>
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {[
                  "Engineering-led approval support",
                  "Authority-specific documentation",
                  "In-house architectural & MEP expertise",
                  "Submission and follow-up management",
                  "NOC coordination",
                  "Inspection coordination",
                  "Experience across mainland, free zones and developer jurisdictions",
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-[#FDFBF6] dark:bg-white/[0.04] p-3">
                    <div className="w-6 h-6 rounded-full bg-[#C9A544]/15 border border-[#C9A544]/20 flex items-center justify-center shrink-0 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /></div>
                    <span className="text-[13px] font-medium text-[#0A0D14] dark:text-white leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#070C1C] p-6 text-white">
              <div className="text-[11px] tracking-[0.14em] uppercase font-bold text-[#C9A544]">Goldland Commitment</div>
              <p className="text-sm text-white/70 mt-3 leading-relaxed">We manage the submission, authority comments and inspection coordination so your project avoids unnecessary delays — no inflated promises, no partnership claims, just engineering-led execution.</p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/#assessment" className="inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A544] hover:bg-[#D9B96A] text-black text-xs font-bold">Start Project Assessment →</Link>
                <a href="https://wa.me/971566321734" target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold">WhatsApp an Engineer</a>
              </div>
              <p className="text-[11px] text-white/40 mt-4 text-center">Response within 24 hours • Dubai • Licensed engineers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQs — per HOME PAGE - CONTENT.docx (authority approvals) */}
      <section className="py-16 md:py-20 bg-[#FEFBF3] dark:bg-[#0A0D14] border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase font-bold text-[#B48B2D] mb-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> FAQs</div>
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#0A0D14] dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "What are Dubai authority approvals?", a: t("faq_a1", "Dubai authority approvals are permits, NOCs and technical approvals required for certain construction, fit-out, renovation and modification projects. Depending on the project, approvals may involve DDA, Dubai Municipality, DCD, DEWA, Trakhees, JAFZA and other authorities.") },
              { q: "Which authority approval does my project need in Dubai?", a: t("faq_a2", "It depends on your project's location, property type and scope of work. Goldland Contracting can assess your project and identify the relevant authority and approval requirements.") },
              { q: "Do villa modifications require approval in Dubai?", a: t("faq_a3", "Yes, many villa modifications require approval before work begins. Requirements depend on the property's location, community and type of modification.") },
              { q: "Do I need approval for a swimming pool or mezzanine floor?", a: t("faq_a4", "Yes, swimming pool construction and mezzanine floor projects may require approval from the relevant authority. The requirements depend on the property and project scope.") },
              { q: "How long does a Dubai authority approval take?", a: t("faq_a5", "Approval time varies depending on the authority, project type and completeness of the submitted documents. Goldland Contracting manages the submission and coordination process to help avoid unnecessary delays.") },
            ].map((f) => (
              <details key={f.q} className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-5 open:bg-[#FFFEFB] dark:open:bg-white/[0.06] transition-colors">
                <summary className="font-semibold cursor-pointer list-none flex justify-between gap-4 text-[14px] text-[#0A0D14] dark:text-white">{f.q} <span className="w-6 h-6 rounded-full bg-[#C9A544]/10 border border-[#C9A544]/20 flex items-center justify-center text-[#C9A544] group-open:rotate-45 transition-transform shrink-0">+</span></summary>
                <p className="text-sm text-[#6B7280] dark:text-white/60 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

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
        <PremiumScrollClient />
      </div>

      {/* 9. FAQ Section */}
      <EnhancedFAQ faqs={allFaqs} />

      {/* 14. Final CTA — Ready to Move Your Project Forward? (spec 38) */}
      <section className="relative overflow-hidden bg-[#070C1C] text-white border-y border-white/10">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(201,165,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,68,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070C1C] via-[#070C1C]/90 to-[#0C1530]/50" aria-hidden />
        <div className="relative container mx-auto px-4 py-14 md:py-16 text-center">
          <h2 className="text-[28px] md:text-[40px] font-bold tracking-tight">{t("cta_title", "Ready to Move Your Project Forward?")}</h2>
          <p className="text-sm md:text-[15px] text-white/60 max-w-2xl mx-auto mt-3 leading-relaxed">{t("cta_desc", "Share your drawings, project details or current approval requirement. Goldland can help you understand the likely engineering and authority path for your project.")}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/#assessment" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#C9A544] hover:bg-[#D9B96A] text-black text-xs font-bold tracking-widest uppercase">Start Project Assessment →</Link>
            <a href="https://wa.me/971566321734?text=Hello%20Goldland%2C%20I%20would%20like%20to%20send%20my%20drawings%20for%20assessment." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-bold tracking-widest uppercase backdrop-blur">Send Drawings</a>
            <a href="https://wa.me/971566321734?text=Hello%20Goldland%2C%20I%20need%20help%20with%20authority%20approval%20for%20my%20project%20in%20Dubai." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1eb85a] text-white text-xs font-bold tracking-widest uppercase">WhatsApp</a>
          </div>
          <p className="text-[11px] text-white/35 mt-4">No generic Contact Us — intent-based CTAs per conversion hierarchy.</p>
        </div>
      </section>

    </div>
  );
}

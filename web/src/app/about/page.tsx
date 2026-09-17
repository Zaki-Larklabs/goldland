import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";
import {
  Building2,
  Wrench,
  ShieldCheck,
  FileCheck,
  Users,
  Clock,
  BadgeCheck,
  Layers,
  Paintbrush,
  HardHat,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Engineering3D } from "@/components/animations/Engineering3D";
import PremiumScrollClient from "@/components/PremiumScrollClient";
import PremiumScroll2Client from "@/components/PremiumScroll2Client";
import EnhancedEngineering from "@/components/sections/EnhancedEngineering";
import FinalCta from "@/components/sections/FinalCta";

import { generateSeoMetadata } from "@/lib/seo/getSeo";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/about", {
    title: "About Goldland Contracting | Authority Approval Experts Dubai",
    description:
      "Goldland Contracting is a Dubai-based engineering and contracting company specializing in authority approvals, engineering, fit-out and project coordination.",
  });
}

export default function AboutPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://goldlandcontracting.ae/#business",
    name: "Goldland Contracting LLC",
    image: "https://goldlandcontracting.ae/images/goldland-logo.png",
    url: "https://goldlandcontracting.ae",
    telephone: "+971566321734",
    email: "sales@goldlandcontracting.ae",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Office 102, Abdulla Khalifa Bldg, Al Qusais Industrial Area 1, Damascus Street",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    geo: { "@type": "GeoCoordinates", latitude: 25.2644, longitude: 55.3853 },
    areaServed: { "@type": "City", name: "Dubai" },
    description:
      "Dubai-based engineering and contracting company specializing in authority approvals, engineering design, fit-out and project coordination since 2016.",
    foundingDate: "2016",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://goldlandcontracting.ae/#organization",
    name: "Goldland Contracting LLC",
    url: "https://goldlandcontracting.ae",
    logo: "https://goldlandcontracting.ae/images/goldland-logo.png",
    description:
      "Engineering and contracting entity in Dubai specializing in authority approvals and engineering-led project delivery.",
    foundingDate: "2016",
    areaServed: "Dubai",
    sameAs: [
      "https://www.linkedin.com/company/goldland-contracting",
      "https://www.facebook.com/goldlandcontracting",
      "https://www.instagram.com/goldlandcontracting",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://goldlandcontracting.ae",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: "https://goldlandcontracting.ae/about",
      },
    ],
  };

  return (
    <div className="bg-[#FDFBF6] dark:bg-[#050A14] min-h-screen text-[#0A0D14] dark:text-white">
      <Script
        id="jsonld-about-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="jsonld-about-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="jsonld-about-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ============================================================ */}
      {/* Component A: Hero Section <header>                            */}
      {/* ============================================================ */}
      <header className="relative overflow-hidden bg-[#070C1C] text-white border-b border-white/10">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,165,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,68,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,165,68,0.12) 0%, transparent 70%)",
          }}
        />
        <Engineering3D>
          <div className="relative container mx-auto max-w-[1240px] px-4 md:px-6 py-20 md:py-32 z-20 flex flex-col justify-center h-full">
            <div className="max-w-[800px] backdrop-blur-md bg-[#050A14]/60 border border-white/10 rounded-[2rem] p-8 md:p-14 shadow-[0_0_80px_rgba(201,165,68,0.15)] relative overflow-hidden group">
              {/* Ambient subtle glow inside the card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A544] rounded-full blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />

              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-[12px] font-medium text-white/50 mb-8 uppercase tracking-widest relative z-10"
              >
                <Link href="/" className="hover:text-[#C9A544] transition-colors">
                  Home
                </Link>
                <span className="text-white/20" aria-hidden>
                  /
                </span>
                <span className="text-[#C9A544]" aria-current="page">
                  About Us
                </span>
              </nav>

              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C9A544]/30 bg-[#C9A544]/10 mb-8 backdrop-blur-sm relative z-10">
                <Building2 className="h-4 w-4 text-[#C9A544]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A544]">
                  About Goldland Contracting
                </span>
              </div>

              <h1 className="text-[32px] md:text-[52px] font-extrabold leading-[1.1] tracking-tight relative z-10">
                <span className="text-white drop-shadow-lg">About Goldland Contracting</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A544] via-[#F3E1A6] to-[#C9A544] drop-shadow-sm mt-2 block">
                  - Dubai Authority Approvals & Engineering
                </span>
              </h1>

              <p className="mt-8 text-[16px] md:text-[18px] leading-relaxed text-white/80 max-w-[65ch] font-medium relative z-10">
                Goldland Contracting LLC is a Dubai-based engineering and contracting company specializing in Dubai
                authority approvals, engineering design, fit-out and project coordination. Since 2016, our team has
                supported clients with authority submissions, technical drawings, MEP coordination and compliance
                requirements across Dubai&apos;s mainland, free zones and other regulated jurisdictions.
              </p>

              <div className="mt-10 flex flex-wrap gap-4 relative z-10">
                <Link
                  href="/#assessment"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#C9A544] to-[#B8941A] hover:from-[#D9B96A] hover:to-[#C9A544] text-black text-[13px] font-bold tracking-widest uppercase shadow-lg shadow-[#C9A544]/20 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Get a Free Approval Assessment <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/971566321734?text=Hello%20Goldland%2C%20I%20need%20help%20with%20authority%20approvals."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-[13px] font-bold tracking-widest uppercase backdrop-blur shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" /> WhatsApp Our Team
                </a>
              </div>
            </div>
          </div>
        </Engineering3D>
      </header>

      {/* ============================================================ */}
      {/* Component B: Value Proposition & Differentiators <section>    */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 bg-white dark:bg-[#FDFBF6]/[0.02] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold text-[#B48B2D] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> Why Goldland Contracting?
            </div>
            <h2 className="text-[26px] md:text-[32px] font-bold tracking-tight">Why Goldland Contracting?</h2>
            <p className="text-sm leading-relaxed text-[#6B7280] dark:text-white/60 mt-3 max-w-[62ch] mx-auto">
              Authority approvals are closely connected to engineering, documentation and compliance. Our approach
              combines technical expertise with authority submission support, helping clients avoid common issues caused
              by incorrect drawings, missing documentation or submission to the wrong jurisdiction.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Engineering-Led Approach",
                desc: "Architectural, structural and MEP coordination under one team.",
                Icon: Wrench,
              },
              {
                title: "Authority Approval Expertise",
                desc: "Experience working with Dubai government authorities, free zones and developers.",
                Icon: ShieldCheck,
              },
              {
                title: "Compliance-Focused Documentation",
                desc: "Drawings and documentation are reviewed before submission to help reduce avoidable comments and delays.",
                Icon: FileCheck,
              },
              {
                title: "End-to-End Coordination",
                desc: "From initial assessment and documentation to authority submission, follow-up and inspection coordination.",
                Icon: BadgeCheck,
              },
            ].map(({ title, desc, Icon }) => (
              <article
                key={title}
                className="group rounded-2xl border border-black/10 dark:border-white/10 bg-[#FEFBF3] dark:bg-white/[0.04] p-6 hover:border-[#C9A544]/30 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0A0D14] dark:bg-white text-[#C9A544] dark:text-[#0A0D14] flex items-center justify-center mb-4 group-hover:bg-[#C9A544] group-hover:text-black transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-[14px] font-bold leading-tight">{title}</h3>
                <p className="text-[13px] leading-relaxed text-[#6B7280] dark:text-white/60 mt-2">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Component C: Operational Statistics <section>                 */}
      {/* ============================================================ */}
      <section className="py-10 bg-[#070C1C] text-white border-y border-white/10 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,165,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,68,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {[
              { value: "10+", label: "Years of Experience", sub: "Serving clients since 2016", Icon: Clock },
              { value: "20+", label: "Authority Jurisdictions", sub: "Government, free zone & developer", Icon: Building2 },
              { value: "In-House", label: "Engineers", sub: "Architectural, structural & MEP", Icon: Users },
              { value: "End-to-End", label: "Support", sub: "Documentation → Inspection", Icon: Layers },
            ].map(({ value, label, sub, Icon }) => (
              <div key={label} className="bg-[#0A0D14] dark:bg-[#0A0D14] px-6 py-7 text-center">
                <div className="w-8 h-8 mx-auto rounded-lg bg-[#C9A544]/15 border border-[#C9A544]/20 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-[#C9A544]" />
                </div>
                <div className="text-[22px] font-bold tracking-tight text-[#C9A544]">{value}</div>
                <div className="text-xs font-semibold tracking-wide text-white mt-1">{label}</div>
                <div className="text-[11px] text-white/50 mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Component D: Service Matrix <section>                         */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 bg-[#FEFBF3] dark:bg-[#0A0D14] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold text-[#B48B2D] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> What We Do
            </div>
            <h2 className="text-[26px] md:text-[32px] font-bold tracking-tight">What We Do</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Authority Approvals",
                desc: "Dubai Municipality, DDA, DCD, DEWA, Trakhees, JAFZA, DIEZ, Dubai South and other authority approvals.",
                Icon: ShieldCheck,
                href: "/authority-approvals",
              },
              {
                title: "Engineering & Design",
                desc: "Architectural, structural, MEP, space planning and authority-compliant drawings.",
                Icon: Wrench,
                href: "/services",
              },
              {
                title: "Fit-Out Services",
                desc: "Commercial, retail, office, restaurant, clinic and residential fit-out support.",
                Icon: Paintbrush,
                href: "/services",
              },
              {
                title: "Project Coordination",
                desc: "Documentation, authority submissions, NOCs, follow-ups and inspection coordination.",
                Icon: HardHat,
                href: "/services",
              },
            ].map(({ title, desc, Icon, href }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-6 hover:border-[#C9A544]/40 hover:shadow-xl transition-all flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C9A544]/10 border border-[#C9A544]/20 flex items-center justify-center mb-4 group-hover:bg-[#C9A544] transition-colors">
                  <Icon className="w-5 h-5 text-[#C9A544] group-hover:text-black" />
                </div>
                <h3 className="text-[14px] font-bold">{title}</h3>
                <p className="text-[13px] leading-relaxed text-[#6B7280] dark:text-white/60 mt-2 flex-1">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#B48B2D] group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Component E: Internal Linking Strategy Hub <section>          */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 bg-white dark:bg-[#FDFBF6]/[0.02] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold text-[#B48B2D] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> Authority Network
            </div>
            <h2 className="text-[26px] md:text-[32px] font-bold tracking-tight">Our Authority Approval Expertise</h2>
            <p className="text-sm leading-relaxed text-[#6B7280] dark:text-white/60 mt-3">
              Goldland Contracting provides authority approval and permit coordination for projects across Dubai.
              Depending on the project location and scope, we assist with submissions and compliance requirements
              involving Dubai Municipality, DDA, DCD, DEWA, Trakhees, JAFZA, DIEZ, Dubai South, DHCC, DHA, RTA and
              other relevant authorities.
            </p>
          </div>

          {/* Authority Anchor Links Array — explicit routing to /authority-approvals/* */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {[
              { label: "Dubai Municipality Approval", slug: "dubai-municipality", logo: "/images/authority-logos/dubai-municipality.png" },
              { label: "DDA Approval", slug: "dda", logo: "/images/authority-logos/dda.png" },
              { label: "DCD Approval", slug: "dcd", logo: "/images/authority-logos/dcd.png" },
              { label: "DEWA Approval", slug: "dewa", logo: "/images/authority-logos/dewa.png" },
              { label: "Trakhees Approval", slug: "trakhees", logo: "/images/authority-logos/trakhees.png" },
              { label: "JAFZA Approval", slug: "jafza", logo: "/images/authority-logos/jafza.png" },
            ].map(({ label, slug, logo }) => (
              <Link
                key={slug}
                href={`/authority-approvals/${slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-[#FEFBF3] dark:bg-white/[0.04] hover:border-[#C9A544]/40 hover:shadow-md transition-all p-4"
              >
                <span className="w-12 h-12 rounded-xl bg-white dark:bg-white border border-black/5 flex items-center justify-center p-2 shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo} alt={`${label} logo`} className="max-h-full max-w-full object-contain group-hover:scale-[1.04] transition-transform" loading="lazy" />
                </span>
                <span className="flex-1">
                  <span className="text-[13px] font-bold leading-tight group-hover:text-[#B48B2D] transition-colors">
                    {label}
                  </span>
                  <span className="block text-[11px] text-[#6B7280] dark:text-white/50">
                    View requirements →
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/authority-approvals"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#B48B2D] hover:underline underline-offset-4"
            >
              View All Authority Approvals <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-[11px] text-center text-[#6B7280] dark:text-white/40 mt-3">
            Additional jurisdictions (DIEZ, Dubai South, DHCC, DHA, RTA, Concordia, Emaar, Nakheel) available via
            coordinated pathway — linked from the full directory.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Component F: Process Workflow <section> 5 stages              */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 bg-[#070C1C] text-white border-y border-white/10 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(201,165,68,0.6) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold text-[#C9A544] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> Our Process
            </div>
            <h2 className="text-[26px] md:text-[32px] font-bold tracking-tight">How We Work</h2>
            <p className="text-sm text-white/60 mt-2">From assessment to inspection — engineering-led, no guesswork.</p>
          </div>

          {/* Desktop: horizontal timeline, Mobile: vertical */}
          <div className="relative">
            {/* connector line desktop */}
            <div className="hidden lg:block absolute top-[28px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#C9A544]/30 to-transparent" />
            <div className="grid lg:grid-cols-5 gap-4">
              {[
                {
                  stage: "01",
                  title: "Project Assessment",
                  desc: "Assessing your project, location and approval requirements.",
                },
                {
                  stage: "02",
                  title: "Authority Identification",
                  desc: "Identifying DDA, Dubai Municipality, DCD, DEWA, Trakhees, JAFZA and other applicable authorities.",
                },
                {
                  stage: "03",
                  title: "Drawing & Documentation",
                  desc: "Preparing architectural, structural and MEP documents for authority submission.",
                },
                {
                  stage: "04",
                  title: "Authority Submission",
                  desc: "Managing submissions, comments, revisions and authority coordination.",
                },
                {
                  stage: "05",
                  title: "Approval & Inspection",
                  desc: "Coordinating final approvals, NOCs and required inspections.",
                },
              ].map(({ stage, title, desc }) => (
                <article
                  key={stage}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex flex-col hover:bg-white/[0.07] hover:border-[#C9A544]/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#C9A544] text-black flex items-center justify-center text-[11px] font-bold mb-3">
                    {stage}
                  </div>
                  <h3 className="text-[13px] font-bold">{title}</h3>
                  <p className="text-[12px] leading-snug text-white/60 mt-2 flex-1">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Component G: Target Demographics <section>                    */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 bg-[#FEFBF3] dark:bg-[#050A14] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold text-[#B48B2D] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> Who We Serve
            </div>
            <h2 className="text-[26px] md:text-[32px] font-bold tracking-tight">Who We Work With</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              {
                title: "Property Owners & Landlords",
                desc: "For villa, apartment, commercial property and modification approvals.",
                Icon: Building2,
              },
              {
                title: "Tenants & Businesses",
                desc: "For office, retail, restaurant, clinic and commercial fit-out approvals.",
                Icon: Users,
              },
              {
                title: "Contractors & Consultants",
                desc: "For authority submissions, technical documentation, NOCs and approval coordination.",
                Icon: HardHat,
              },
            ].map(({ title, desc, Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-6 hover:border-[#C9A544]/30 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0A0D14] dark:bg-white text-[#C9A544] dark:text-[#0A0D14] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-[14px] font-bold">{title}</h3>
                <p className="text-[13px] leading-relaxed text-[#6B7280] dark:text-white/60 mt-2">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Restored 3D Animations — previously removed, now reverted    */}
      {/* ============================================================ */}
      <EnhancedEngineering />
      <div style={{ background: "#0A0A0A" }}>
        <PremiumScrollClient />
      </div>
      <div style={{ background: "#0A0A0A" }}>
        <PremiumScroll2Client />
      </div>

      {/* Original Final CTA restored */}
      <FinalCta />

      {/* ============================================================ */}
      {/* Component H: Sticky CTA & Conversion Footer <footer>          */}
      {/* ============================================================ */}
      <footer className="relative overflow-hidden bg-[#070C1C] text-white border-t border-white/10">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,165,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,68,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070C1C] via-[#070C1C]/90 to-[#0C1530]/50" aria-hidden />
        <div className="relative container mx-auto max-w-[900px] px-4 md:px-6 py-14 md:py-16 text-center">
          <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight">Need Help With Dubai Authority Approvals?</h2>
          <p className="text-sm md:text-[15px] text-white/60 max-w-2xl mx-auto mt-3 leading-relaxed">
            Tell us your project location and type of work. Our team can help identify the relevant authority
            requirements and guide you through the approval process.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#assessment"
              data-analytics="about-cta-assessment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#C9A544] hover:bg-[#D9B96A] text-black text-xs font-bold tracking-widest uppercase min-h-[48px]"
            >
              Get a Free Approval Assessment <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/971566321734?text=Hello%20Goldland%2C%20I%20need%20help%20with%20authority%20approvals."
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="about-cta-whatsapp"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1eb85a] text-white text-xs font-bold tracking-widest uppercase min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Our Team
            </a>
            <a
              href="tel:+971566321734"
              data-analytics="about-cta-call"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-bold tracking-widest uppercase backdrop-blur min-h-[48px]"
            >
              <Phone className="w-4 h-4" /> Call +971 56 632 1734
            </a>
          </div>
          <p className="text-[11px] text-white/35 mt-4">Response within 24 hours • Dubai • Licensed engineers</p>
        </div>
        {/* Sticky mobile bar spacer handled globally; hit states already prominent */}
      </footer>
    </div>
  );
}

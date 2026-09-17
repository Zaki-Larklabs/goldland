import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { AuthorityRepository } from "@/lib/ai/repositories/AuthorityRepository";
import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, Zap, Droplets, Sun, FileCheck, Clock, Users, Building2, LayoutGrid } from "lucide-react";
import { AssessmentWizard } from "@/components/ui/AssessmentWizard";
import { DocumentChecklist } from "@/components/ui/DocumentChecklist";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

import { getSeoForRoute } from "@/lib/seo/getSeo";
import { siteConfig } from "@/lib/seo/config";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = `/authority-approvals/${slug}`;
  // SEO Portal override wins
  try {
    const seo = await getSeoForRoute(route);
    if (seo && (seo.title || seo.description)) {
      const keywords = seo.keywords ? seo.keywords.split(",").map((k: string) => k.trim()).filter(Boolean) : undefined;
      return {
        title: seo.title || `${slug} Approvals Dubai | Goldland Contracting`,
        description: seo.description || undefined,
        keywords,
        alternates: { canonical: seo.canonical || `${siteConfig.url}${route}` },
        robots: seo.noindex ? { index: false, follow: false } : { index: true, follow: true },
        openGraph: {
          title: seo.title || `${slug} Approvals Dubai | Goldland Contracting`,
          description: seo.description || undefined,
          url: seo.canonical || `${siteConfig.url}${route}`,
          type: "article",
          images: [{ url: seo.ogImage || siteConfig.ogImage, width: 1200, height: 630 }],
        },
      };
    }
  } catch {}
  const authority = await AuthorityRepository.findBySlug(slug);
  if (!authority) return { title: "Authority Not Found" };
  const isDewa = slug === "dewa";
  return {
    title: isDewa
      ? `DEWA Approval Services Dubai | Electrical & Water Permits | Goldland`
      : `${authority.name} Approvals Dubai | Goldland Contracting`,
    description: isDewa
      ? `Goldland secures DEWA approvals for electrical, water and solar (Shams Dubai) — design review, NOC, meter and inspection coordination. Engineering-led, no technical rejections.`
      : authority.description || `Comprehensive guide to obtaining ${authority.name} approvals for your design, engineering, and fit-out projects in Dubai.`,
    alternates: { canonical: `https://goldlandcontracting.ae/authority-approvals/${slug}` },
    openGraph: {
      title: isDewa ? `DEWA Approval Services | Goldland Contracting LLC` : `${authority.name} Approvals Dubai | Goldland Contracting`,
      description: authority.description || `Comprehensive guide to obtaining ${authority.name} approvals in Dubai.`,
      url: `https://goldlandcontracting.ae/authority-approvals/${slug}`,
      type: "article",
    },
  };
}

function DewaDetail() {
  return (
    <>
      {/* Intro */}
      <section className="py-10 md:py-12 bg-white dark:bg-[#FDFBF6]/[0.02] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid lg:grid-cols-[1.7fr_1fr] gap-8">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase font-bold text-[#B48B2D]"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> DEWA — Dubai Electricity & Water Authority</div>
              <h2 className="text-[22px] md:text-[26px] font-bold tracking-tight text-[#0A0D14] dark:text-white mt-2">Electrify Your Vision: Securing DEWA&apos;s Mandatory Permits</h2>
              <p className="text-sm leading-relaxed text-[#6B7280] dark:text-white/60 mt-3">
                DEWA is the sole provider of electricity and water in Dubai. Any construction, renovation or fit-out that touches power, water or solar requires mandatory DEWA approvals and inspections for safe, code-compliant grid integration. Goldland Contracting L.L.C. is your engineering-led partner through the full technical pathway — from load calculations to meter energization — so your project powers up without delay or rework.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                <span className="px-3 py-1.5 rounded-full bg-[#0A0D14] text-white dark:bg-white dark:text-[#0A0D14] font-semibold">MEP engineering-led</span>
                <span className="px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10">e-Services via DEWA portal</span>
                <span className="px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10">Inspection-ready first time</span>
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-[#FEFBF3] dark:bg-white/[0.03] p-6">
              <div className="text-[11px] tracking-[0.14em] uppercase font-bold text-[#B48B2D]">At a glance</div>
              <ul className="mt-3 space-y-2.5 text-sm text-[#0A0D14] dark:text-white/80">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A544] mt-0.5" /> Sole utility authority for Dubai</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A544] mt-0.5" /> Applies to new connections, load increase, meter, solar</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A544] mt-0.5" /> Requires I.E.E. + DEWA Regulations compliance</li>
              </ul>
              <Link href="#assessment" className="mt-5 inline-flex w-full justify-center px-5 py-3 rounded-lg bg-[#C9A544] hover:bg-[#D9B96A] text-black text-xs font-bold">Check DEWA pathway — Start Assessment →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1 — Electrical & Water Design */}
      <section className="py-10 md:py-12 bg-[#FEFBF3] dark:bg-[#0A0D14] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-xl bg-[#0A0D14] dark:bg-white text-white dark:text-[#0A0D14] flex items-center justify-center"><Zap className="w-4 h-4 text-[#C9A544]" /></span>
            <h2 className="text-[18px] md:text-[20px] font-bold text-[#0A0D14] dark:text-white">1. Electrical & Water Design Approvals — Technical Review</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04]">
            <table className="w-full text-sm">
              <thead className="bg-[#0A0D14] text-white text-xs">
                <tr><th className="text-left p-3 font-semibold">Approval Type</th><th className="text-left p-3 font-semibold">Purpose</th><th className="text-left p-3 font-semibold">Why it matters</th></tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/10">
                <tr>
                  <td className="p-3 font-bold text-[#0A0D14] dark:text-white">Electrical Design Approval</td>
                  <td className="p-3 text-[#6B7280] dark:text-white/60">New connection, load increase or internal network change — MDB/SMDB, protection, wiring and routing.</td>
                  <td className="p-3 text-[#6B7280] dark:text-white/60">Confirms load, capacity and I.E.E. Wiring Regulations compliance; prerequisite for execution permit.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#0A0D14] dark:text-white">Water Design Approval</td>
                  <td className="p-3 text-[#6B7280] dark:text-white/60">New water connection, plumbing modification, pump/tank or meter installation.</td>
                  <td className="p-3 text-[#6B7280] dark:text-white/60">Validates pipe sizing, pressure, water quality and network connection integrity.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Who Needs It</td>
                  <td colSpan={2} className="p-3 text-[#6B7280] dark:text-white/60">MEP consultants, developers and contractors where works touch power/water systems.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Process Insight</td>
                  <td colSpan={2} className="p-3 text-[#6B7280] dark:text-white/60">Submission via DEWA e-Services; DEWA engineering reviews capacity and safety before site work.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Required Documents</td>
                  <td colSpan={2} className="p-3 text-[#6B7280] dark:text-white/60">Architectural drawings, load schedule, SLDs, layouts (meter/pump), spec sheets, consultant/contractor license.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 2 — NOC Infrastructure */}
      <section className="py-10 md:py-12 bg-white dark:bg-[#FDFBF6]/[0.02] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-xl bg-[#0A0D14] dark:bg-white text-white dark:text-[#0A0D14] flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-[#C9A544]" /></span>
            <h2 className="text-[18px] md:text-[20px] font-bold text-[#0A0D14] dark:text-white">2. NOC for Infrastructure — Utility Diversion / Right-of-Way</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04]">
            <table className="w-full text-sm">
              <thead className="bg-[#0A0D14] text-white text-xs"><tr><th className="text-left p-3">Approval Type</th><th className="text-left p-3">Purpose</th><th className="text-left p-3">Significance</th></tr></thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/10">
                <tr>
                  <td className="p-3 font-bold text-[#0A0D14] dark:text-white">NOC — Utility Proximity / Diversion</td>
                  <td className="p-3 text-[#6B7280] dark:text-white/60">Excavation/shoring near or over DEWA cables/pipelines or within DEWA reservation.</td>
                  <td className="p-3 text-[#6B7280] dark:text-white/60">Protects critical infrastructure from damage or service interruption.</td>
                </tr>
                <tr><td className="p-3 font-semibold">Who Needs It</td><td colSpan={2} className="p-3 text-[#6B7280] dark:text-white/60">Developers, civil and infrastructure consultants working near DEWA assets.</td></tr>
                <tr><td className="p-3 font-semibold">Process Insight</td><td colSpan={2} className="p-3 text-[#6B7280] dark:text-white/60">Apply to DEWA Civil/Distribution; if diversion needed, DEWA reviews and may levy technical fee.</td></tr>
                <tr><td className="p-3 font-semibold">Required Documents</td><td colSpan={2} className="p-3 text-[#6B7280] dark:text-white/60">Affection plan, project drawings relative to DEWA assets, excavation plan, specs, traffic impact study where applicable.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3 — Meter */}
      <section className="py-10 md:py-12 bg-[#FEFBF3] dark:bg-[#0A0D14] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-xl bg-[#0A0D14] dark:bg-white text-white dark:text-[#0A0D14] flex items-center justify-center"><Droplets className="w-4 h-4 text-[#C9A544]" /></span>
            <h2 className="text-[18px] md:text-[20px] font-bold text-[#0A0D14] dark:text-white">3. Meter Installation & Modification Clearances</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04]">
            <table className="w-full text-sm">
              <thead className="bg-[#0A0D14] text-white text-xs"><tr><th className="text-left p-3">Step</th><th className="text-left p-3">Purpose</th><th className="text-left p-3">Significance</th></tr></thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/10">
                <tr><td className="p-3 font-bold">Final Site Inspection</td><td className="p-3 text-[#6B7280] dark:text-white/60">Verify as-built wiring/piping matches approved drawings and DEWA safety standards (earthing, isolation valve).</td><td className="p-3 text-[#6B7280] dark:text-white/60">Gate for meter issuance.</td></tr>
                <tr><td className="p-3 font-bold">Meter Connection</td><td className="p-3 text-[#6B7280] dark:text-white/60">After passing inspection and fees, DEWA installs/activates electricity/water meter(s).</td><td className="p-3 text-[#6B7280] dark:text-white/60">Authorizes legal occupancy and service use.</td></tr>
                <tr><td className="p-3 font-semibold">Who</td><td colSpan={2} className="p-3 text-[#6B7280] dark:text-white/60">Licensed electrical/plumbing contractors on behalf of owner.</td></tr>
                <tr><td className="p-3 font-semibold">Docs</td><td colSpan={2} className="p-3 text-[#6B7280] dark:text-white/60">Final approved drawings, earth resistance test, completion certificates, fees/deposits.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4 — Solar */}
      <section className="py-10 md:py-12 bg-white dark:bg-[#FDFBF6]/[0.02] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-xl bg-[#C9A544] text-black flex items-center justify-center"><Sun className="w-4 h-4" /></span>
            <h2 className="text-[18px] md:text-[20px] font-bold text-[#0A0D14] dark:text-white">4. Solar PV — Shams Dubai Grid Connection</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04]">
            <table className="w-full text-sm">
              <thead className="bg-[#0A0D14] text-white text-xs"><tr><th className="text-left p-3">Item</th><th className="text-left p-3">Purpose</th><th className="text-left p-3">Significance</th></tr></thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/10">
                <tr><td className="p-3 font-bold">Shams Dubai Approval</td><td className="p-3 text-[#6B7280] dark:text-white/60">Solar PV on premises connected via net metering to DEWA grid.</td><td className="p-3 text-[#6B7280] dark:text-white/60">Ensures safe, spec-compliant grid integration.</td></tr>
                <tr><td className="p-3 font-semibold">Who</td><td colSpan={2} className="p-3 text-[#6B7280] dark:text-white/60">Owners/developers via DEWA-approved solar contractors.</td></tr>
                <tr><td className="p-3 font-semibold">Phases</td><td colSpan={2} className="p-3 text-[#6B7280] dark:text-white/60">Technical design approval → Installation inspection → Connection/commissioning.</td></tr>
                <tr><td className="p-3 font-semibold">Docs</td><td colSpan={2} className="p-3 text-[#6B7280] dark:text-white/60">SLD, array layout, inverter/panel specs, test reports, contractor certification.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-10 bg-[#0A0D14] text-white border-y border-white/10">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-6 items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase font-bold text-[#C9A544]"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> Service Features</div>
              <h3 className="text-[18px] font-bold mt-2">Goldland handles the full DEWA journey</h3>
              <p className="text-sm text-white/60 mt-2">From portal submission to inspector liaison — engineering first, so technical rejections are avoided.</p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                { t: "Design Submission Management", d: "All electrical/water drawings via DEWA portal, load & SLD checked." },
                { t: "Infrastructure NOC", d: "Utility proximity/diversion NOCs streamlined." },
                { t: "Pre-Inspection Readiness", d: "Site audit against DEWA checklist before inspector arrives." },
                { t: "DEWA Liaison", d: "Dedicated follow-ups with technical & inspection teams." },
                { t: "Solar PV – Shams Dubai", d: "End-to-end Shams design, inspection and connection." },
              ].map((f) => (
                <li key={f.t} className="rounded-xl border border-white/10 bg-white/[0.04] p-4 flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A544] mt-0.5 shrink-0" />
                  <div><div className="font-semibold text-white text-[13px]">{f.t}</div><div className="text-white/60 text-[11px] mt-1">{f.d}</div></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Goldland */}
      <section className="py-10 md:py-12 bg-[#FEFBF3] dark:bg-[#050A14] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-6 md:p-8">
            <h3 className="text-[18px] font-bold text-[#0A0D14] dark:text-white">Why Choose Goldland for DEWA?</h3>
            <p className="text-sm text-[#6B7280] dark:text-white/60 mt-2 leading-relaxed">
              DEWA approvals are multi-stage and highly technical. Goldland brings MEP engineering depth — not just admin — so designs are compliant, robust and inspection-ready on first submission. We eliminate the back-and-forth that delays meter connection, coordinating load, earthing, water quality and Shams integration as one accountable team. Independent firm: we do not claim partnership with DEWA; we deliver verified experience in DEWA-code compliance.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
              <span className="px-3 py-1.5 rounded-full bg-[#0A0D14] text-white dark:bg-white dark:text-[#0A0D14] font-semibold">No technical-rejection loop</span>
              <span className="px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10">I.E.E. + DEWA Regulations</span>
              <span className="px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10">Shams Dubai included</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 bg-white dark:bg-[#0A0D14] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <h3 className="text-[16px] font-bold text-[#0A0D14] dark:text-white">DEWA — Common Questions</h3>
          <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
            {[
              { q: "What does DEWA stand for?", a: "Dubai Electricity and Water Authority — established 1992, sole utility provider for Dubai." },
              { q: "How to apply for DEWA connection?", a: "Via DEWA e-Services → Builder → Electricity/Water network services → fill details & pay fees → technical review → inspection." },
              { q: "Requirements for DEWA application?", a: "Ejari/tenancy or title deed, Emirates ID/passport, trade license (non-DED), plus technical drawings per DEWA checklist." },
              { q: "DEWA contact number?", a: "DEWA 24/7: 04-601 9999. For Goldland coordination: +971 56 632 1734 or WhatsApp an engineer." },
            ].map((f) => (
              <details key={f.q} className="group rounded-xl border border-black/10 dark:border-white/10 bg-[#FEFBF3] dark:bg-white/[0.03] p-4 open:bg-white dark:open:bg-white/[0.06]">
                <summary className="font-semibold cursor-pointer list-none flex justify-between gap-4 text-[#0A0D14] dark:text-white">{f.q} <span className="text-[#B48B2D] group-open:rotate-45 transition-transform">+</span></summary>
                <p className="text-[#6B7280] dark:text-white/60 mt-2 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section id="assessment" className="py-10 md:py-14 bg-[#FEFBF3] dark:bg-[#050A14] border-t border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-[900px] px-4 md:px-6">
          <AssessmentWizard />
          <p className="text-center text-[11px] text-[#6B7280] dark:text-white/40 mt-4">DEWA enquiries tracked with <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">sourcePage=/authority-approvals/dewa</code> + UTM.</p>
        </div>
      </section>
    </>
  );
}

export default async function AuthorityApprovalPage({ params }: PageProps) {
  const { slug } = await params;
  const authority = await AuthorityRepository.findBySlug(slug);
  if (!authority) notFound();

  const isDewa = slug === "dewa";
  const jsonLd: any = isDewa
    ? {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", name: `DEWA Approval Services — Goldland Contracting LLC`, description: `DEWA electrical, water and solar approvals — Goldland engineering pathway` },
          {
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "What does DEWA stand for?", acceptedAnswer: { "@type": "Answer", text: "Dubai Electricity and Water Authority, established 1992." } },
              { "@type": "Question", name: "How to apply for DEWA connection?", acceptedAnswer: { "@type": "Answer", text: "Via DEWA e-Services Builder portal, then technical review and inspection." } },
            ],
          },
        ],
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${authority.name} Approval Services`,
        description: authority.description || `Approval services for ${authority.name}`,
        provider: { "@type": "Organization", name: "Goldland Contracting LLC", url: "https://goldlandcontracting.ae" },
      };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF6] dark:bg-[#050A14]">
      <Script id={`jsonld-authority-${authority.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero — Goldland premium, navy/ivory/gold with full-size logo */}
      <section className="relative overflow-hidden bg-[#070C1C] text-white border-b border-white/10">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(201,165,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,68,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070C1C] via-[#070C1C]/85 to-[#070C1C]/40" aria-hidden />
        <div className="relative container mx-auto max-w-[1240px] px-4 md:px-6 pt-[88px] pb-10 md:pb-12">
          <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-8 items-center">
            <div>
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-white/60 mb-4">
                <Link href="/" className="hover:text-[#C9A544]">Home</Link><span className="text-white/30">›</span>
                <Link href="/authority-approvals" className="hover:text-[#C9A544]">Authority Approvals</Link><span className="text-white/30">›</span>
                <span className="text-white" aria-current="page">{authority.name}</span>
              </nav>
              <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] uppercase font-bold text-[#C9A544]"><Zap className="w-3 h-3" /> {isDewa ? "DEWA — MEP & Solar" : authority.jurisdiction || "Dubai"}</div>
              <h1 className="text-[32px] md:text-[44px] font-bold leading-[0.95] tracking-tight mt-2">
                {isDewa ? "Electrify Your Vision: Securing DEWA's Mandatory Permits in Dubai" : `${authority.name} Approval`}
              </h1>
              <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-white/70 max-w-[62ch]">
                {isDewa
                  ? "The sole gateway to power and water — every new connection, load change, meter or solar array needs DEWA technical review and inspection. Goldland navigates it engineering-first."
                  : authority.shortDescription || `Comprehensive guide to obtaining ${authority.name} approvals for your design, engineering, and fit-out projects in Dubai.`}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="#assessment" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#C9A544] hover:bg-[#D9B96A] text-black text-xs font-bold">{isDewa ? "Start DEWA Assessment →" : `Start ${authority.name} Assessment →`}</Link>
                <a href={`https://wa.me/971566321734?text=Hello%20Goldland%2C%20I%20need%20${encodeURIComponent(authority.name)}%20approval%20support.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold">WhatsApp an Engineer</a>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <div className="w-[280px] h-[200px] rounded-2xl bg-white flex items-center justify-center p-8 shadow-2xl shadow-black/20 border border-white/10">
                {(() => {
                  const logoMap: Record<string, string> = {
                    "dubai-municipality": "/images/authority-logos/dubai-municipality.png",
                    dcd: "/images/authority-logos/dcd.png",
                    dda: "/images/authority-logos/dda.png",
                    dewa: "/images/authority-logos/dewa.png",
                    trakhees: "/images/authority-logos/trakhees.png",
                    jafza: "/images/authority-logos/jafza.png",
                    diez: "/images/authority-logos/diez.png",
                    concordia: "/images/authority-logos/concordia.png",
                    "dubai-south": "/images/authority-logos/dubai-south.png",
                    rta: "/images/authority-logos/rta.png",
                    emaar: "/images/authority-logos/emaar.png",
                    nakheel: "/images/authority-logos/nakheel.png",
                    tecom: "/images/authority-logos/tecom.png",
                    sharjah: "/images/authority-logos/sharjah.png",
                    solar: "/images/authority-logos/solar.png",
                    "fire-systems": "/images/authority-logos/fire-systems.png",
                  };
                  const logo = logoMap[authority.slug];
                  return logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logo} alt={`${authority.name} logo`} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <span className="text-2xl font-bold text-[#0A0D14]">{authority.name.slice(0, 2).toUpperCase()}</span>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {isDewa ? (
        <DewaDetail />
      ) : (
        <>
          {/* Quick summary strip */}
          <section className="py-6 bg-white dark:bg-[#FDFBF6]/[0.02] border-b border-black/5 dark:border-white/5">
            <div className="container mx-auto max-w-[1240px] px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><div className="text-[11px] tracking-[0.14em] uppercase font-bold text-[#B48B2D]">Authority</div><div className="font-semibold text-[#0A0D14] dark:text-white">{authority.name}</div></div>
              <div><div className="text-[11px] tracking-[0.14em] uppercase font-bold text-[#B48B2D]">Location</div><div className="font-semibold text-[#0A0D14] dark:text-white">{authority.jurisdiction || "Dubai"}</div></div>
              <div><div className="text-[11px] tracking-[0.14em] uppercase font-bold text-[#B48B2D]">Typical work</div><div className="font-semibold text-[#0A0D14] dark:text-white">Fit-out • MEP • Change of use</div></div>
              <div><Link href="#assessment" className="inline-flex px-4 py-2 rounded-lg bg-[#C9A544] text-black text-xs font-bold">Assess My Project →</Link></div>
            </div>
          </section>

          {/* What is */}
          <section className="py-10 md:py-12 bg-[#FEFBF3] dark:bg-[#0A0D14] border-b border-black/5 dark:border-white/5">
            <div className="container mx-auto max-w-[1240px] px-4 md:px-6 grid lg:grid-cols-[1.6fr_1fr] gap-8">
              <div>
                <h2 className="text-[18px] font-bold text-[#0A0D14] dark:text-white">What is {authority.name} Approval?</h2>
                <p className="text-sm leading-relaxed text-[#6B7280] dark:text-white/60 mt-3">
                  {authority.description || `Approval from ${authority.name} is required for construction, fit-out or modification works within ${authority.jurisdiction || "its jurisdiction"} in Dubai. It ensures compliance with planning, building and safety standards before works proceed.`}
                </p>
                <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4"><div className="font-bold text-[#0A0D14] dark:text-white flex items-center gap-2"><Building2 className="w-4 h-4 text-[#C9A544]" /> Who needs it?</div><p className="text-[#6B7280] dark:text-white/60 mt-1">Tenants, owners and contractors undertaking fit-out, MEP or structural changes in this jurisdiction.</p></div>
                  <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4"><div className="font-bold text-[#0A0D14] dark:text-white flex items-center gap-2"><Clock className="w-4 h-4 text-[#C9A544]" /> When?</div><p className="text-[#6B7280] dark:text-white/60 mt-1">Before works start — submission, review, comments, then NOC/inspection.</p></div>
                </div>
              </div>
              <DocumentChecklist
                title="Typical documents"
                items={[
                  { label: "Trade license & tenancy / title" },
                  { label: "Affection plan / site plan" },
                  { label: "Architectural & MEP drawings" },
                  { label: "NOC from building management" },
                  { label: "Authority forms where applicable" },
                ]}
              />
            </div>
          </section>

          {/* What approval do you need — project selector */}
          <section className="py-10 bg-white dark:bg-[#FDFBF6]/[0.02] border-b border-black/5 dark:border-white/5">
            <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
              <h2 className="text-[18px] font-bold text-[#0A0D14] dark:text-white">What are you working on?</h2>
              <p className="text-sm text-[#6B7280] dark:text-white/60 mt-1">Select your project to see the likely authority and engineering path for {authority.name}.</p>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
                {["Warehouse","Mezzanine","Office","Restaurant","Retail","Villa","Clinic","Fit-Out","Other"].map((t) => (
                  <a key={t} href="#assessment" className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4 text-center hover:border-[#C9A544]/40 hover:shadow-md">
                    <div className="w-8 h-8 mx-auto rounded-lg bg-[#C9A544]/10 flex items-center justify-center"><LayoutGrid className="w-4 h-4 text-[#C9A544]" /></div>
                    <div className="text-[13px] font-semibold text-[#0A0D14] dark:text-white mt-2">{t}</div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Approval journey */}
          <section className="py-10 md:py-12 bg-[#0A0D14] text-white border-y border-white/10">
            <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
              <h2 className="text-[18px] font-bold">How the approval journey works</h2>
              <p className="text-sm text-white/60 mt-1">Depending on scope and authority requirements.</p>
              <div className="mt-6 grid md:grid-cols-6 gap-4">
                {[
                  { n: "01", t: "Project Assessment", d: "Scope, location and available documents." },
                  { n: "02", t: "Engineering Review", d: "Drawings and authority requirements check." },
                  { n: "03", t: "Document Preparation", d: "Prepare technical documentation." },
                  { n: "04", t: "Authority Submission", d: "Submit via applicable portal." },
                  { n: "05", t: "Comments & Revisions", d: "Address authority comments." },
                  { n: "06", t: "Approval / Handover", d: "NOC, inspection, outcome documentation." },
                ].map((s) => (
                  <div key={s.n} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="text-[11px] tracking-[0.14em] uppercase font-bold text-[#C9A544]">{s.n}</div>
                    <div className="text-[13px] font-bold mt-1">{s.t}</div>
                    <div className="text-[11px] text-white/60 mt-1">{s.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Common comments */}
          <section className="py-10 bg-[#FEFBF3] dark:bg-[#0A0D14] border-b border-black/5 dark:border-white/5">
            <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
              <h2 className="text-[18px] font-bold text-[#0A0D14] dark:text-white">Common reasons drawings may require revision</h2>
              <ul className="mt-4 grid md:grid-cols-2 gap-3 text-sm text-[#6B7280] dark:text-white/60">
                {["Missing information","Drawing coordination issues","MEP conflicts","Inconsistent project information","Incomplete documentation","Load/service information gaps","Submission standards","Scope changes during review"].map((it) => (
                  <li key={it} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A544] mt-0.5" />{it}</li>
                ))}
              </ul>
              <p className="text-[11px] text-[#6B7280] dark:text-white/40 mt-3">Phased as common project issues that may require clarification — not official authority rules unless verified.</p>
            </div>
          </section>

          {/* Related engineering + project types */}
          <section className="py-10 bg-white dark:bg-[#FDFBF6]/[0.02] border-b border-black/5 dark:border-white/5">
            <div className="container mx-auto max-w-[1240px] px-4 md:px-6 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-[#FEFBF3] dark:bg-white/[0.03] p-6">
                <h3 className="text-sm font-bold text-[#0A0D14] dark:text-white">Related engineering services</h3>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {["Architectural","Structural","MEP","Electrical","Fire & Life Safety","Shop Drawings","BIM / 3D"].map((e) => (
                    <Link key={e} href={`/services/${e.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] hover:border-[#C9A544]/40">{e}</Link>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-[#FEFBF3] dark:bg-white/[0.03] p-6">
                <h3 className="text-sm font-bold text-[#0A0D14] dark:text-white">Where this approval may apply</h3>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {["Warehouse","Mezzanine","Office","Restaurant","Retail","Clinic","Villa","Fit-Out"].map((p) => (
                    <Link key={p} href={`/project-types/${p.toLowerCase()}`} className="px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] hover:border-[#C9A544]/40">{p}</Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="assessment" className="py-10 md:py-14 bg-[#FEFBF3] dark:bg-[#050A14] border-t border-black/5 dark:border-white/5 scroll-mt-[88px]">
            <div className="container mx-auto max-w-[900px] px-4 md:px-6">
              <AssessmentWizard />
            </div>
          </section>
        </>
      )}
    </div>
  );
}

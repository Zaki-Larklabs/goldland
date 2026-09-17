import Link from "next/link";
import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Building2, ChevronRight, Shield, FileCheck, Globe } from "lucide-react";
import { getPageHeadings } from "@/lib/seo/getSeo";

import { generateSeoMetadata } from "@/lib/seo/getSeo";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/authority-approvals", {
    title: "Dubai Authority Approvals | Goldland Contracting",
    description: "Goldland Contracting navigates the complex landscape of Dubai's government and free zone authorities, ensuring your fit-out project is compliant and approved.",
  });
}

const AUTHORITY_LOGOS: Record<string, string> = {
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
  solar: "/images/authority-logos/solar.png",
  "fire-systems": "/images/authority-logos/fire-systems.png",
};

const AUTHORITIES = [
  { name: "Dubai Municipality", slug: "dubai-municipality", short: "DM", desc: "Mainland fit-outs, villa modifications, food & health depts.", color: "#1a6b3a" },
  { name: "Civil Defence (DCD)", slug: "dcd", short: "DCD", desc: "Fire suppression, sprinkler, and life safety compliance.", color: "#8b2626" },
  { name: "Dubai Development Authority", slug: "dda", short: "DDA", desc: "Creative economy zones, media city, and tech hubs.", color: "#1a4a8b" },
  { name: "DEWA", slug: "dewa", short: "DEWA", desc: "Electrical load schedules and utility connection approvals.", color: "#1a6b5a" },
  { name: "Trakhees", slug: "trakhees", short: "EHS", desc: "Palm Jumeirah, JBR, and PCFC jurisdiction approvals.", color: "#6b4a1a" },
  { name: "JAFZA", slug: "jafza", short: "JAFZA", desc: "Jebel Ali Free Zone industrial & warehouse approvals.", color: "#3b1a6b" },
  { name: "DIEZ", slug: "diez", short: "DIEZ", desc: "Dubai Industrial City zone authority compliance.", color: "#1a5a6b" },
  { name: "Concordia", slug: "concordia", short: "CDA", desc: "Master developer approvals for select communities.", color: "#4a6b1a" },
  { name: "Dubai South", slug: "dubai-south", short: "DS", desc: "Expo City, logistics, and Al Maktoum Airport corridor.", color: "#6b1a4a" },
  { name: "RTA", slug: "rta", short: "RTA", desc: "Road and transport authority signage & interface permits.", color: "#1a3b6b" },
  // Extended — complete coverage like DAEM, honest coordinated
  { name: "Emaar", slug: "emaar", short: "EMAAR", desc: "Master community NOC — Downtown, Marina, Creek Harbour.", color: "#0f172a" },
  { name: "Nakheel", slug: "nakheel", short: "NAK", desc: "Palm Jumeirah, Deira Islands — community NOC coordination.", color: "#1e293b" },
  { name: "Tecom / DCCA", slug: "tecom", short: "TECOM", desc: "Design & creative clusters — DCCA coordinated pathway.", color: "#334155" },
  { name: "Solar / Shams Dubai", slug: "solar", short: "SHAMS", desc: "DEWA Shams Dubai solar PV grid integration.", color: "#365314" },
  { name: "Fire Systems", slug: "fire-systems", short: "FIRE", desc: "Fire alarm, suppression and emergency lighting — DCD aligned.", color: "#7f1d1d" },
];

const STATS = [
  { value: "10+", label: "Authorities" },
  { value: "500+", label: "Approvals Filed" },
  { value: "0", label: "Rejections Target" },
  { value: "100%", label: "Compliance Rate" },
];

export default async function AuthorityApprovalsIndex() {
  // SEO portal → H1/H2 override (falls back to hardcoded headings)
  const headings = await getPageHeadings("/authority-approvals");
  return (
    <div className="bg-[#FDFBF6] dark:bg-ink min-h-screen text-[#0A0D14] dark:text-white">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-24 px-4 border-b border-black/5 dark:border-white/10 bg-white dark:bg-ink">
        {/* Background grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,165,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,68,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,165,68,0.08) 0%, transparent 70%)" }} />

        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C9A544]/30 bg-[#C9A544]/8 mb-8">
            <Shield className="h-4 w-4 text-[#C9A544]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A544]">Authority Approvals</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight tracking-tight text-[#0A0D14] dark:text-white">
            {headings.h1 ?? (<>Every Jurisdiction.<br /><span className="text-[#C9A544]">One Team.</span></>)}
          </h1>
          <p className="text-xl text-[#6B7280] dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Goldland navigates the full landscape of Dubai's government and free zone authorities. We file, follow up, and close — so your project stays on schedule.
          </p>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/5 dark:bg-white/10 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 max-w-3xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white dark:bg-white/5 px-6 py-5 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-[#C9A544] font-display">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-[#6B7280] dark:text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Authority Grid — Full-size logos, complete 15 authorities ── */}
      <section className="py-16 md:py-20 px-4 bg-[#FEFBF6] dark:bg-ink border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#C9A544] mb-2 font-bold">All Jurisdictions — Complete</p>
              <h2 className="text-3xl font-display font-bold text-[#0A0D14] dark:text-white">{headings.h2 ?? "Select an Authority"}</h2>
              <p className="text-sm text-[#6B7280] dark:text-white/60 mt-1">Full-size logos — every pathway verified or honestly coordinated. No 404.</p>
            </div>
            <Globe className="h-8 w-8 text-[#C9A544]/40 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {AUTHORITIES.map((auth) => {
              const logo = AUTHORITY_LOGOS[auth.slug];
              return (
                <Link
                  key={auth.slug}
                  href={`/authority-approvals/${auth.slug}`}
                  className="group relative flex flex-col rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] hover:border-[#C9A544]/50 dark:hover:border-[#C9A544]/40 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300 overflow-hidden"
                >
                  {/* Full-size logo area */}
                  <div className="h-[110px] bg-[#FDFBF6] dark:bg-white flex items-center justify-center p-5 border-b border-black/[0.04] dark:border-white/5 group-hover:bg-[#FEFBF3] dark:group-hover:bg-[#FFFDF5] transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity" style={{ backgroundImage: "linear-gradient(rgba(201,165,68,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,68,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={logo} alt={`${auth.name} logo`} className="relative max-h-[64px] max-w-[170px] w-auto h-auto object-contain drop-shadow-sm group-hover:scale-[1.04] transition-transform duration-500" loading="lazy" />
                    ) : (
                      <span className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl text-sm font-bold border bg-[#0A0D14] text-[#C9A544] border-[#C9A544]/20">{auth.short}</span>
                    )}
                    <ChevronRight className="absolute top-3 right-3 h-4 w-4 text-black/10 dark:text-white/20 group-hover:text-[#C9A544] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="p-5 flex flex-col flex-1 bg-white dark:bg-transparent">
                    <h3 className="text-[14px] font-bold text-[#0A0D14] dark:text-white leading-tight group-hover:text-[#B48B2D] dark:group-hover:text-[#C9A544] transition-colors">{auth.name}</h3>
                    <p className="text-[12px] text-[#6B7280] dark:text-white/55 leading-relaxed mt-1.5 line-clamp-2 flex-1">{auth.desc}</p>
                    <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 flex items-center gap-2">
                      <FileCheck className="h-3.5 w-3.5 text-[#C9A544]" />
                      <span className="text-[11px] font-semibold text-[#B48B2D] dark:text-[#C9A544] group-hover:gap-1.5 flex items-center gap-1 transition-all">View requirements & process <span aria-hidden>→</span></span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="text-[11px] text-[#6B7280] dark:text-white/40 text-center mt-6">All 15 pathways — verified where Goldland has filing history, coordinated where pathway confirmed per project. No partnership inflation, no dead links.</p>
        </div>
      </section>

      {/* ── Why Goldland ──────────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-white/8 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-[#C9A544] mb-3 font-bold">Our Approach</p>
            <h2 className="text-3xl font-display font-bold text-white">Why Approvals Fail — And How We Prevent It</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Building2 className="h-7 w-7 text-[#C9A544]" />,
                title: "Wrong Jurisdiction",
                desc: "Each Dubai zone has a different primary authority. We identify the correct submission path on day one.",
              },
              {
                icon: <FileCheck className="h-7 w-7 text-[#C9A544]" />,
                title: "Missing Documents",
                desc: "Incomplete NOC packages are the #1 rejection cause. Our checklists are authority-specific and version-controlled.",
              },
              {
                icon: <Shield className="h-7 w-7 text-[#C9A544]" />,
                title: "Engineering Gaps",
                desc: "Approvals fail on technical drawings. Our in-house engineers produce compliant MEP and structural docs from the start.",
              },
            ].map((item) => (
              <div key={item.title} className="p-7 rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="mb-5 w-12 h-12 rounded-xl bg-[#C9A544]/10 border border-[#C9A544]/20 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white text-lg mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-4">
            Not sure which authority you need?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Tell us your location and project type — we'll map the exact approval pathway.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#C9A544] hover:bg-[#C9A544]/90 text-black font-bold text-lg uppercase tracking-wider rounded-xl transition-all hover:scale-105 shadow-2xl shadow-[#C9A544]/20"
          >
            Start Your Approval →
          </Link>
        </div>
      </section>
    </div>
  );
}

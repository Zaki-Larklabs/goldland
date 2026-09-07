import Link from "next/link";
import React from "react";
import type { Metadata } from "next";
import { Building2, ChevronRight, Shield, FileCheck, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Dubai Authority Approvals | Goldland Contracting",
  description: "Goldland Contracting navigates the complex landscape of Dubai's government and free zone authorities, ensuring your fit-out project is compliant and approved.",
  alternates: { canonical: "https://goldlandcontracting.ae/authority-approvals" },
};

const AUTHORITIES = [
  {
    name: "Dubai Municipality",
    slug: "dubai-municipality",
    short: "DM",
    desc: "Mainland fit-outs, villa modifications, food & health depts.",
    color: "#1a6b3a",
  },
  {
    name: "Civil Defence (DCD)",
    slug: "dcd",
    short: "DCD",
    desc: "Fire suppression, sprinkler, and life safety compliance.",
    color: "#8b2626",
  },
  {
    name: "Dubai Development Authority",
    slug: "dda",
    short: "DDA",
    desc: "Creative economy zones, media city, and tech hubs.",
    color: "#1a4a8b",
  },
  {
    name: "DEWA",
    slug: "dewa",
    short: "DEWA",
    desc: "Electrical load schedules and utility connection approvals.",
    color: "#1a6b5a",
  },
  {
    name: "Trakhees",
    slug: "trakhees",
    short: "EHS",
    desc: "Palm Jumeirah, JBR, and PCFC jurisdiction approvals.",
    color: "#6b4a1a",
  },
  {
    name: "JAFZA",
    slug: "jafza",
    short: "JAFZA",
    desc: "Jebel Ali Free Zone industrial & warehouse approvals.",
    color: "#3b1a6b",
  },
  {
    name: "DIEZ",
    slug: "diez",
    short: "DIEZ",
    desc: "Dubai Industrial City zone authority compliance.",
    color: "#1a5a6b",
  },
  {
    name: "Concordia",
    slug: "concordia",
    short: "CDA",
    desc: "Master developer approvals for select communities.",
    color: "#4a6b1a",
  },
  {
    name: "Dubai South",
    slug: "dubai-south",
    short: "DS",
    desc: "Expo City, logistics, and Al Maktoum Airport corridor.",
    color: "#6b1a4a",
  },
  {
    name: "RTA",
    slug: "rta",
    short: "RTA",
    desc: "Road and transport authority signage & interface permits.",
    color: "#1a3b6b",
  },
];

const STATS = [
  { value: "10+", label: "Authorities" },
  { value: "500+", label: "Approvals Filed" },
  { value: "0", label: "Rejections Target" },
  { value: "100%", label: "Compliance Rate" },
];

export default function AuthorityApprovalsIndex() {
  return (
    <div className="bg-ink min-h-screen text-white">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-24 px-4 border-b border-white/10">
        {/* Background grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
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
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight tracking-tight">
            Every Jurisdiction.<br />
            <span className="text-[#C9A544]">One Team.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Goldland navigates the full landscape of Dubai's government and free zone authorities. We file, follow up, and close — so your project stays on schedule.
          </p>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 max-w-3xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white/5 px-6 py-5 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-[#C9A544] font-display">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Authority Grid ────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#C9A544] mb-2 font-bold">All Jurisdictions</p>
              <h2 className="text-3xl font-display font-bold text-white">Select an Authority</h2>
            </div>
            <Globe className="h-8 w-8 text-white/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AUTHORITIES.map((auth) => (
              <Link
                key={auth.slug}
                href={`/authority-approvals/${auth.slug}`}
                className="group relative flex flex-col justify-between p-7 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-[#C9A544]/40 transition-all duration-300 overflow-hidden"
              >
                {/* Corner accent */}
                <div
                  aria-hidden
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-2xl"
                  style={{ background: auth.color }}
                />

                <div className="relative z-10">
                  {/* Short code badge */}
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className="inline-flex items-center justify-center w-11 h-11 rounded-xl text-sm font-bold font-mono border"
                      style={{ borderColor: `${auth.color}60`, background: `${auth.color}20`, color: "#C9A544" }}
                    >
                      {auth.short}
                    </span>
                    <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-[#C9A544] group-hover:translate-x-1 transition-all duration-200" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#C9A544] transition-colors duration-200">
                    {auth.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-200">
                    {auth.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-6 pt-5 border-t border-white/8 flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-[#C9A544]/70" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-500 transition-colors">View requirements &amp; process →</span>
                </div>
              </Link>
            ))}
          </div>
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

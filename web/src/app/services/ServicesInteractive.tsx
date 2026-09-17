"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, DraftingCompass, LayoutGrid, Hammer, Zap, HelpCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type FinderOption = {
  id: string;
  label: string;
  sub: string;
  target: string;
};

const FINDER: (FinderOption & { Icon: React.ElementType })[] = [
  { id: "authority", label: "Authority Approvals", sub: "Get permits & approvals", target: "#authority-approvals", Icon: Building2 },
  { id: "engineering", label: "Engineering & Design", sub: "Drawings & technical support", target: "#engineering", Icon: DraftingCompass },
  { id: "project", label: "Project Approvals", sub: "By building type", target: "#project-approvals", Icon: LayoutGrid },
  { id: "fitout", label: "Fit-Out & Construction", sub: "From approval to handover", target: "#project-approvals", Icon: Hammer },
  { id: "mep", label: "MEP Services", sub: "MEP design & approvals", target: "#engineering", Icon: Zap },
  { id: "other", label: "Other Services", sub: "Additional support", target: "#assessment", Icon: HelpCircle },
];

export function ServiceFinder() {
  const [active, setActive] = useState("authority");
  const handleClick = (opt: typeof FINDER[number]) => {
    setActive(opt.id);
    trackEvent("service_category_click", { category: opt.id, target: opt.target, sourcePage: "/services" });
    const el = document.querySelector(opt.target);
    if (el) {
      const headerOffset = 80;
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };
  return (
    <section className="bg-[#FEFBF3] dark:bg-[#0C1530]/50 border-y border-[#EAE4D3] dark:border-white/10">
      <div className="container mx-auto max-w-[1240px] px-4 md:px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-[18px] font-bold text-[#0A0D14] dark:text-white tracking-tight">What are you working on?</h2>
            <p className="text-sm text-[#6B7280] dark:text-white/60">Select a mode to find the right approval, engineering or project pathway.</p>
          </div>
          <Link href="#assessment" onClick={() => trackEvent("assessment_start", { source: "service_finder_not_sure", sourcePage: "/services" })} className="text-xs font-semibold text-[#0A0D14] dark:text-white/80 hover:text-[#B48B2D] inline-flex items-center gap-1 self-start lg:self-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544] rounded">
            Not sure? <span className="underline decoration-[#C9A544] underline-offset-4">Take a short assessment</span> →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {FINDER.map((opt) => {
            const isActive = active === opt.id;
            const Icon = opt.Icon;
            return (
              <button key={opt.id} onClick={() => handleClick(opt)} aria-pressed={isActive} aria-label={`${opt.label}: ${opt.sub}`} className={`text-left rounded-xl px-4 py-4 border flex items-start gap-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544] ${isActive ? "bg-[#0A0D14] text-white border-[#0A0D14] shadow-lg" : "bg-white dark:bg-white/[0.04] border-[#EAE4D3] dark:border-white/10 hover:border-[#C9A544]/40 hover:shadow-md text-[#0A0D14] dark:text-white"}`}>
                <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isActive ? "bg-white/10" : "bg-[#FEF3C7] dark:bg-[#C9A544]/15"}`}>
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#C9A544]" : "text-[#0A0D14] dark:text-[#C9A544]"}`} aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className={`block text-[13px] font-bold leading-none ${isActive ? "text-white" : "text-[#0A0D14] dark:text-white"}`}>{opt.label}</span>
                  <span className={`block text-[11px] mt-1 ${isActive ? "text-white/60" : "text-[#6B7280] dark:text-white/50"}`}>{opt.sub}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ServiceFinderModes({
  authorities,
  services,
  projectTypes,
}: {
  authorities: { name: string; slug: string; href: string }[];
  services: { name: string; slug: string; href: string }[];
  projectTypes: { name: string; slug: string; href: string }[];
}) {
  const [mode, setMode] = useState<"approvals" | "engineering" | "project">("approvals");
  const target = mode === "approvals" ? "#authority-approvals" : mode === "engineering" ? "#engineering" : "#project-approvals";
  const handleMode = (m: typeof mode) => {
    setMode(m);
    trackEvent("service_click", { service: m, sourcePage: "/services" });
    const el = document.querySelector(m === "approvals" ? "#authority-approvals" : m === "engineering" ? "#engineering" : "#project-approvals");
    if (el) {
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };
  const items = mode === "approvals" ? authorities : mode === "engineering" ? services : projectTypes;
  return (
    <section className="bg-[#FEFBF3] dark:bg-[#0C1530]/50 border-y border-[#EAE4D3] dark:border-white/10">
      <div className="container mx-auto max-w-[1240px] px-4 md:px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-[18px] font-bold text-[#0A0D14] dark:text-white tracking-tight">What are you working on?</h2>
            <p className="text-sm text-[#6B7280] dark:text-white/60">Choose a mode — data-driven, no hardcoded cards.</p>
          </div>
          <div className="flex items-center gap-2 p-1 rounded-full bg-white dark:bg-white/[0.06] border border-black/10 dark:border-white/10 self-start lg:self-center">
            {[
              { id: "approvals", label: "Approvals" },
              { id: "engineering", label: "Engineering" },
              { id: "project", label: "Project" },
            ].map((tab) => (
              <button key={tab.id} onClick={() => handleMode(tab.id as any)} className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${mode === tab.id ? "bg-[#0A0D14] text-white dark:bg-white dark:text-[#0A0D14]" : "text-[#6B7280] dark:text-white/60 hover:text-[#0A0D14] dark:hover:text-white"}`}>{tab.label}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.slice(0, 8).map((it) => {
            const isAuth = mode === "approvals";
            const logoPath = isAuth ? `/images/authority-logos/${it.slug === "dm" ? "dm" : it.slug}.png` : null;
            return (
            <Link key={it.slug} href={it.href} className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4 hover:border-[#C9A544]/40 hover:shadow-md flex items-center justify-between gap-2 group">
              <div className="flex items-center gap-3">
                {isAuth && (
                  <div className="w-8 h-8 rounded bg-white p-1 flex items-center justify-center shrink-0">
                    <img src={logoPath!} alt={`${it.name} logo`} className="max-w-full max-h-full object-contain" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                  </div>
                )}
                <span className="text-[13px] font-semibold text-[#0A0D14] dark:text-white">{it.name}</span>
              </div>
              <span className="w-6 h-6 rounded-full bg-[#F3F4F6] dark:bg-white/10 flex items-center justify-center text-[11px] group-hover:bg-[#C9A544] group-hover:text-black transition-colors shrink-0">→</span>
            </Link>
            );
          })}
        </div>
        <Link href={target} className="mt-4 inline-flex text-xs font-semibold text-[#B48B2D] hover:underline">View all {mode} →</Link>
      </div>
    </section>
  );
}

export function CarouselRow({ children, ariaLabel }: { children: React.ReactNode; ariaLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir * 360, behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") scroll(-1);
          if (e.key === "ArrowRight") scroll(1);
        }}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 scrollbar-hide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544] rounded"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
      <div className="hidden md:flex gap-2 absolute -top-10 right-0">
        <button aria-label="Scroll left" onClick={() => scroll(-1)} className="w-7 h-7 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 flex items-center justify-center hover:bg-[#C9A544] hover:text-black hover:border-[#C9A544] transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544]">‹</button>
        <button aria-label="Scroll right" onClick={() => scroll(1)} className="w-7 h-7 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 flex items-center justify-center hover:bg-[#C9A544] hover:text-black hover:border-[#C9A544] transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A544]">›</button>
      </div>
    </div>
  );
}

const STEPS = [
  { n: "01", t: "Assess", d: "Understand your project and requirements." },
  { n: "02", t: "Design", d: "Prepare drawings and documentation." },
  { n: "03", t: "Submit", d: "Submit through the relevant authority process." },
  { n: "04", t: "Respond", d: "Manage comments and required revisions." },
  { n: "05", t: "Approve", d: "Coordinate toward final approval." },
  { n: "06", t: "Handover", d: "Support inspection and close-out where applicable." },
];

export function ProcessTimeline() {
  return (
    <div className="relative">
      <div className="hidden lg:block absolute left-[32px] right-[32px] top-[22px] h-px bg-white/15" aria-hidden />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="relative"
          >
            <div className="w-10 h-10 rounded-full bg-[#0A0D14] border border-[#C9A544]/40 flex items-center justify-center text-[#C9A544] mb-3 relative z-10">
              <span className="text-[11px] font-bold tracking-wide">{s.n}</span>
            </div>
            <div className="text-[10px] tracking-[0.14em] uppercase font-bold text-white/40">{s.n}</div>
            <div className="text-[13px] font-bold text-white mt-0.5">{s.t}</div>
            <div className="text-[11px] leading-snug text-white/55 mt-1">{s.d}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

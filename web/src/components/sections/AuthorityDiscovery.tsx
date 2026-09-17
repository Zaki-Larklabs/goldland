"use client";
import { useState } from "react";
import Link from "next/link";
import { Building2, Warehouse, Layers, Briefcase, Utensils, Stethoscope, Home, ShoppingBag, Hammer, Pencil } from "lucide-react";

const PROJECTS = [
  { id: "warehouse", label: "Warehouse", icon: Warehouse, path: ["Project Assessment", "Authority Identification", "Engineering", "Dubai Municipality / relevant authority", "Civil Defence where applicable", "DEWA where applicable", "Inspection", "Approval"] },
  { id: "mezzanine", label: "Mezzanine", icon: Layers, path: ["Project Assessment", "Authority Identification", "Structural & MEP", "Municipality / DDA", "DCD where applicable", "DEWA where applicable", "Inspection", "Approval"] },
  { id: "office", label: "Office", icon: Briefcase, path: ["Project Assessment", "Authority Identification", "Engineering", "DM / DDA / Trakhees", "DCD", "DEWA", "NOC", "Approval"] },
  { id: "restaurant", label: "Restaurant", icon: Utensils, path: ["Project Assessment", "Authority Identification", "Engineering & Fit-Out", "DM", "DCD", "DEWA", "HACCP / Food Safety", "Approval"] },
  { id: "clinic", label: "Clinic", icon: Stethoscope, path: ["Project Assessment", "Authority Identification", "MEP & Healthcare", "DM", "DCD", "DEWA", "DHA where applicable", "Approval"] },
  { id: "villa", label: "Villa", icon: Home, path: ["Project Assessment", "Authority Identification", "Architecture & Structural", "DM", "DCD where applicable", "DEWA", "Inspection", "Approval"] },
  { id: "retail", label: "Retail", icon: ShoppingBag, path: ["Project Assessment", "Authority Identification", "Fit-Out", "DM / Developer", "DCD", "DEWA", "NOC", "Approval"] },
  { id: "fitout", label: "Fit-Out", icon: Hammer, path: ["Project Assessment", "Authority Identification", "Engineering & Fit-Out", "DM / DDA / Trakhees", "DCD", "DEWA", "Inspection", "Approval"] },
  { id: "modification", label: "Modification", icon: Pencil, path: ["Project Assessment", "Authority Identification", "Engineering", "Relevant authority", "DCD where applicable", "DEWA where applicable", "Revision", "Approval"] },
  { id: "other", label: "Other", icon: Building2, path: ["Project Assessment", "Authority Identification", "Engineering", "Relevant authority", "Documentation", "Submission", "Inspection", "Approval"] },
];

export function AuthorityDiscovery() {
  const [active, setActive] = useState("warehouse");
  const current = PROJECTS.find(p => p.id === active) || PROJECTS[0];
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-[#050A14] border-y border-black/5 dark:border-white/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold text-[#B48B2D] mb-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> Authority Discovery</div>
          <h2 className="text-[26px] md:text-[34px] font-bold tracking-tight text-[#0A0D14] dark:text-white">Which Authority Approval Does Your Project Need?</h2>
          <p className="text-sm text-[#6B7280] dark:text-white/60 mt-3"> Select your project type — we’ll show the likely pathway. <span className="font-medium text-[#0A0D14] dark:text-white">Potentially relevant approvals may include… Requirements depend on location, scope and jurisdiction.</span></p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2 max-w-6xl mx-auto mb-8">
          {PROJECTS.map((p) => {
            const isActive = active === p.id;
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`rounded-2xl border p-3 flex flex-col items-center gap-2 text-center transition-all min-h-[96px] ${isActive ? "bg-[#0A0D14] dark:bg-white text-white dark:text-[#0A0D14] border-[#0A0D14] dark:border-white shadow-lg" : "bg-[#FDFBF6] dark:bg-white/[0.04] border-black/10 dark:border-white/10 hover:border-[#C9A544]/40 text-[#0A0D14] dark:text-white"}`}
              >
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? "bg-[#C9A544] text-black" : "bg-white dark:bg-white/[0.06] border border-black/5 dark:border-white/10"}`}>
                  <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-[#C9A544]"}`} />
                </span>
                <span className="text-[11px] font-bold leading-tight">{p.label}</span>
              </button>
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto rounded-2xl border border-black/10 dark:border-white/10 bg-[#FDFBF6] dark:bg-white/[0.03] p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.14em] uppercase font-bold text-[#B48B2D] mb-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A544]" /> Potential path for {current.label}</div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {current.path.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-full border text-xs font-medium ${i === 0 ? "bg-[#C9A544] text-black border-[#C9A544]" : "bg-white dark:bg-white/[0.04] border-black/10 dark:border-white/10 text-[#0A0D14] dark:text-white"}`}>{step}</span>
                {i < current.path.length - 1 && <span className="text-[#C9A544] font-bold">→</span>}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-[#6B7280] dark:text-white/40 mt-4">Informational routing only — not a guaranteed legal requirement. Assessment confirms exact authority.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/#assessment" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A544] hover:bg-[#D9B96A] text-black text-xs font-bold">Check My Project Requirements →</Link>
            <a href="https://wa.me/971566321734?text=Hello%20Goldland%2C%20I%20need%20authority%20approval%20for%20my%20project%20in%20Dubai." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.04] hover:border-[#C9A544]/40 text-xs font-semibold text-[#0A0D14] dark:text-white">Send My Drawings</a>
          </div>
        </div>
      </div>
    </section>
  );
}

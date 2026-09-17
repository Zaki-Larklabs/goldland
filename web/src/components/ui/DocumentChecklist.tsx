"use client";
import { CheckCircle2, FileText } from "lucide-react";

export type ChecklistItem = { label: string; note?: string };

export function DocumentChecklist({
  title = "What do you need to get started?",
  items,
  ctaHref = "#assessment",
  ctaLabel = "Not sure what you need? → Send your drawings",
}: {
  title?: string;
  items: ChecklistItem[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-8 h-8 rounded-lg bg-[#0A0D14] dark:bg-white text-white dark:text-[#0A0D14] flex items-center justify-center">
          <FileText className="w-4 h-4 text-[#C9A544]" />
        </span>
        <h3 className="text-[14px] font-bold text-[#0A0D14] dark:text-white">{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.label} className="flex gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-[#C9A544] mt-0.5 shrink-0" />
            <span className="text-[#0A0D14] dark:text-white/80">
              {it.label} {it.note && <span className="text-[#6B7280] dark:text-white/50">— {it.note}</span>}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-[#6B7280] dark:text-white/50 mt-4">Documents may vary depending on project type, scope and authority requirements.</p>
      <a href={ctaHref} className="mt-4 inline-flex w-full justify-center px-4 py-2.5 rounded-lg border border-[#C9A544]/30 text-xs font-bold text-[#B48B2D] hover:bg-[#C9A544] hover:text-black transition-colors">
        {ctaLabel}
      </a>
    </div>
  );
}

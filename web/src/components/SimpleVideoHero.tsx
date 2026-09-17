"use client";
import React from "react";
import Link from "next/link";
import { OptimizedVideo } from "@/components/ui/optimized-video";

export default function SimpleVideoHero({ h1 }: { h1?: string | null }) {
  return (
    <section className="relative w-full overflow-hidden bg-[#050A14] min-h-[620px] lg:min-h-[680px] flex items-center">
      {/* Background — supplied hero video properly attached */}
      <div className="absolute inset-0">
        <OptimizedVideo
          src="/hero-video.mp4"
          poster="/hero.png"
          eager={true}
          className="absolute inset-0 w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Premium dark overlay for text readability — left heavier */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] via-[#050A14]/70 to-[#050A14]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A14]/50 via-transparent to-transparent" />
        {/* Extra left text readability boost */}
        <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#050A14]/95 via-[#050A14]/70 to-transparent hidden lg:block" aria-hidden />
      </div>

      {/* Content — left-aligned like reference, with headers re-added */}
      <div className="relative z-10 container mx-auto px-4 lg:px-6 py-16 lg:py-20">
        <div className="max-w-[560px]">
          {/* Badge — re-added from original */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-4 backdrop-blur-md"
            style={{ background: "rgba(201,165,68,0.12)", border: "1px solid rgba(201,165,68,0.35)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#C9A544" }} />
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#C9A544", fontFamily: "var(--font-mono, monospace)" }}>
              Goldland Contracting LLC
            </span>
          </div>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold text-[#C9A544] mb-4">
            <span className="w-6 h-px bg-[#C9A544]" />
            Engineering Today. A Better Tomorrow.
          </div>

          {/* Headline — H1 overridable from SEO portal (route "/") */}
          <h1 className="font-bold leading-[0.95] tracking-tight">
            {h1 ? (
              <span className="block text-white text-[34px] md:text-[42px] lg:text-[44px]">{h1}</span>
            ) : (
              <>
                <span className="block text-white text-[34px] md:text-[42px] lg:text-[44px]">Dubai Authority Approvals</span>
                <span className="block text-[#C9A544] text-[32px] md:text-[40px] lg:text-[42px] mt-1">Get Your Project Approved</span>
              </>
            )}
          </h1>

          {/* Authority line */}
          <div className="mt-4 text-[11px] md:text-xs tracking-[0.16em] uppercase font-bold text-white/70">
            DM · DCD · DDA · DEWA · TRAKHEES
          </div>

          {/* Supporting */}
          <p className="mt-4 text-[13px] md:text-[14px] leading-relaxed text-white/65 max-w-[520px]">
            Engineering-led authority approval support for construction, fit-out, renovation and modification projects across Dubai.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="/#assessment"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#C9A544] hover:bg-[#D9B96A] text-black text-[12px] font-bold tracking-wide uppercase shadow-lg shadow-black/20 min-h-[44px] transition-colors"
            >
              Start Project Assessment <span aria-hidden>→</span>
            </Link>
            <Link
              href="/#assessment"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-white/25 bg-white/5 hover:bg-white/10 text-white text-[12px] font-semibold tracking-wide uppercase backdrop-blur min-h-[44px] transition-colors"
            >
              <span className="w-4 h-4 rounded bg-white/10 flex items-center justify-center text-[10px]">◈</span> Send Your Drawings
            </Link>
          </div>

          {/* Checkmarks like reference */}
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-white/55">
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#C9A544]/20 border border-[#C9A544]/30 flex items-center justify-center text-[7px] text-[#C9A544]">✓</span> Engineering Support</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#C9A544]/20 border border-[#C9A544]/30 flex items-center justify-center text-[7px] text-[#C9A544]">✓</span> Authority Coordination</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#C9A544]/20 border border-[#C9A544]/30 flex items-center justify-center text-[7px] text-[#C9A544]">✓</span> Inspection Assistance</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#C9A544]/20 border border-[#C9A544]/30 flex items-center justify-center text-[7px] text-[#C9A544]">✓</span> End-to-End Guidance</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator — re-added */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2" style={{ animation: "heroScrollBounce 2s ease-in-out infinite" }}>
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/40" style={{ fontFamily: "var(--font-mono, monospace)" }}>
          Scroll
        </span>
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none" aria-hidden>
          <rect x="1.25" y="1.25" width="17.5" height="29.5" rx="8.75" stroke="rgba(201,165,68,0.45)" strokeWidth="1.5" />
          <rect x="8.5" y="5" width="3" height="6" rx="1.5" fill="#C9A544" opacity="0.7" />
        </svg>
      </div>

      {/* Bottom fade for seamless transition to trust bar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#050A14] to-transparent pointer-events-none" />
      <style>{`@keyframes heroScrollBounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(7px); } }`}</style>
    </section>
  );
}

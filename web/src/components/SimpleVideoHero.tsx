"use client";

import React from "react";
import Link from "next/link";
import { OptimizedVideo } from "@/components/ui/optimized-video";
import { VideoMaskOverlay } from "@/components/ui/video-mask-overlay";

export default function SimpleVideoHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background video */}
      <OptimizedVideo
        src="/burj%20khalifa.mp4"
        poster="/hero-bg.jpg"
        eager={true}
        className="absolute inset-0 w-full h-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* ── Layered cinematic overlays ─────────────────────────────────────
          All gradients blend seamlessly — no hard edges, no visible boxes.
          The vignette naturally gets darker toward all corners, which is
          standard cinema framing AND invisibly covers any watermarks.
      ──────────────────────────────────────────────────────────────────── */}

      {/* 1. Base luminosity tint — darkens the whole frame uniformly */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.38)" }}
      />

      {/* 2. Seamless vignette + invisible watermark masking */}
      <VideoMaskOverlay intensity={0.92} />

      {/* 3. Subtle film-grain texture for premium feel */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center text-white">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8 backdrop-blur-md"
          style={{
            background: "rgba(201,165,68,0.12)",
            border: "1px solid rgba(201,165,68,0.35)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#C9A544" }}
          />
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#C9A544", fontFamily: "var(--font-mono, monospace)" }}
          >
            Goldland Contracting LLC
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-bold leading-[1.02] tracking-tight mb-6"
          style={{
            fontFamily: "var(--font-display, sans-serif)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            textShadow: "0 2px 40px rgba(0,0,0,0.6)",
          }}
        >
          Dubai Authority Approvals <br />
          <span style={{ color: "#C9A544" }}>Get your project Approved</span>
        </h1>

        {/* Subheading */}
        <div
          className="max-w-4xl mx-auto mb-12 leading-relaxed font-light flex flex-col gap-3"
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
            color: "rgba(255,255,255,0.82)",
            textShadow: "0 1px 16px rgba(0,0,0,0.5)",
          }}
        >
          <div className="font-semibold text-white tracking-widest text-sm md:text-base">
            DM DCD DDA TRAKHEES DEWA
          </div>
          <p>Dubai authority regulations update frequently. Avoid costly project delays and fines with our engineering-led approval services.</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/#assessment"
            className="group inline-flex items-center gap-2 px-9 py-4 font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "#C9A544",
              color: "#070C1C",
              fontSize: "0.875rem",
              boxShadow: "0 0 40px rgba(201,165,68,0.25), 0 8px 32px rgba(0,0,0,0.3)",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            Get a Free Approval Assessment (24h Turnaround)
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-9 py-4 font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 backdrop-blur-sm hover:scale-[1.03]"
            style={{
              background: "rgba(255,255,255,0.07)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.35)",
              fontSize: "0.875rem",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            View Real Projects
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: "heroScrollBounce 2s ease-in-out infinite" }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-mono, monospace)" }}
          >
            Scroll
          </span>
          <svg width="20" height="32" viewBox="0 0 20 32" fill="none" aria-hidden>
            <rect x="1.25" y="1.25" width="17.5" height="29.5" rx="8.75" stroke="rgba(201,165,68,0.45)" strokeWidth="1.5" />
            <rect x="8.5" y="5" width="3" height="6" rx="1.5" fill="#C9A544" opacity="0.7" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes heroScrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(7px); }
        }
      `}</style>
    </section>
  );
}

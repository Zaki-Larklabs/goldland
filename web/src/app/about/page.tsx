import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlobalCta } from "@/components/layout/GlobalCta";
import { EvidenceCard } from "@/components/cards/EvidenceCard";
import { VideoMaskOverlay } from "@/components/ui/video-mask-overlay";
import { Building2 } from "lucide-react";
import PremiumScrollClient from "@/components/PremiumScrollClient";
import PremiumScroll2Client from "@/components/PremiumScroll2Client";
import EnhancedEngineering from "@/components/sections/EnhancedEngineering";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "About Goldland Contracting | Engineering-Led Fit-Out in Dubai",
  description: "Goldland is a premium, engineering-led fit-out and authority approval firm operating across all Dubai jurisdictions.",
  alternates: {
    canonical: "https://goldlandcontracting.ae/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-vellum dark:bg-ink min-h-screen">
      {/* 1. Hero */}
      <section className="force-dark relative overflow-hidden bg-ink text-white pt-28 pb-24 px-4 border-b border-white/10">
        <video 
          src="/about-hero-bg.mp4" 
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover object-right opacity-25 mix-blend-luminosity pointer-events-none"
        />
        {/* Seamless cinematic vignette — no visible boxes, covers watermarks */}
        <VideoMaskOverlay intensity={0.88} />
        {/* Blueprint grid */}
        <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(201,165,68,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,165,68,1) 1px, transparent 1px)", backgroundSize: "60px 60px", zIndex: 3 }} />
        <div className="container relative mx-auto max-w-5xl" style={{ zIndex: 4 }}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C9A544]/30 bg-[#C9A544]/10 mb-8">
            <Building2 className="h-4 w-4 text-[#C9A544]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A544]">About Goldland</span>
          </div>
          <Breadcrumbs 
            items={[{ label: "About Us" }]} 
            className="mb-6 text-gray-500 [&_a]:text-gray-500 [&_span]:text-white"
          />
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight tracking-tight">
            Engineering-led<br />
            <span className="text-[#C9A544]">execution.</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            We bridge the gap between architectural vision and strict regulatory compliance. Based in Dubai, we deliver zero-compromise engineering and fit-out solutions.
          </p>
        </div>
      </section>

      {/* 2. Core Philosophy */}
      <section className="py-24 px-4 bg-white dark:bg-ink">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-center animate-fade-in-up">
          <div>
            <h2 className="text-3xl font-display font-bold text-ink dark:text-white mb-6">The Goldland Standard</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              The Dubai market is saturated with generic contractors who promise rapid delivery but fail at the authority approval stage due to poor engineering foresight.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              <strong>Goldland is built differently.</strong> We are an engineering-led firm. Before a single aesthetic choice is finalized, our in-house MEP and structural engineers ensure the design passes the exact mandates of Dubai Municipality, Civil Defence, and relevant freezone authorities.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <EvidenceCard label="Years Active" value="10+" />
            <EvidenceCard label="Engineers" value="In-house" />
            <EvidenceCard label="Compliance" value="Strict" />
            <EvidenceCard label="Approvals" value="Support" description="Full submission support" />
          </div>
        </div>
      </section>

      {/* Engineering Precision Section */}
      <EnhancedEngineering />


      {/* 3. Cinematic Scroll 1 */}
      <div style={{ background: "#0A0A0A" }}>
        <PremiumScrollClient />
      </div>

      {/* 4. Cinematic Scroll 2 */}
      <div style={{ background: "#0A0A0A" }}>
        <PremiumScroll2Client />
      </div>

      {/* 5. Final CTA */}
      <FinalCta />
    </div>
  );
}

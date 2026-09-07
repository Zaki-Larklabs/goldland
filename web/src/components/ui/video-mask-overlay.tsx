/**
 * VideoMaskOverlay
 *
 * A seamless, fully invisible cinematic vignette that covers AI watermarks /
 * branding icons in source video/image assets without any visible "patches".
 *
 * Technique:
 *   - Overlapping radial gradients from each corner — exactly like film vignetting
 *   - A central clearing keeps the subject well-lit and readable
 *   - No hard edges, no visible rectangles at any screen size or mode
 *   - Responsive: percentage-based sizing adapts to any container
 */

"use client";

import React from "react";

interface VideoMaskOverlayProps {
  /** Controls overall darkness — default 1.0 for full coverage */
  intensity?: number;
  /** If the section is light-mode, pass true to use white-toned masks instead */
  light?: boolean;
  className?: string;
}

export function VideoMaskOverlay({ intensity = 1.0, light = false, className = "" }: VideoMaskOverlayProps) {
  const bg = light ? "255,255,255" : "8,10,20";
  const a = intensity;

  return (
    <>
      {/* ── Bottom-right corner — covers Gemini star / AI watermarks ── */}
      <div
        aria-hidden
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          background: [
            // Corner #1: bottom-right — deep, wide radial
            `radial-gradient(ellipse 55% 55% at 100% 100%, rgba(${bg},${0.96 * a}) 0%, rgba(${bg},${0.72 * a}) 25%, rgba(${bg},${0.30 * a}) 50%, rgba(${bg},${0.06 * a}) 72%, transparent 85%)`,
            // Corner #2: top-left — covers text watermarks
            `radial-gradient(ellipse 48% 42% at 0% 0%, rgba(${bg},${0.94 * a}) 0%, rgba(${bg},${0.68 * a}) 25%, rgba(${bg},${0.26 * a}) 52%, rgba(${bg},${0.04 * a}) 72%, transparent 85%)`,
            // Edge: top — header bleed
            `linear-gradient(to bottom, rgba(${bg},${0.55 * a}) 0%, rgba(${bg},${0.20 * a}) 14%, transparent 32%)`,
            // Edge: bottom — footer bleed
            `linear-gradient(to top, rgba(${bg},${0.65 * a}) 0%, rgba(${bg},${0.22 * a}) 16%, transparent 36%)`,
            // Global cinematic vignette — pulls all corners slightly darker
            `radial-gradient(ellipse 90% 90% at 50% 50%, transparent 38%, rgba(${bg},${0.14 * a}) 65%, rgba(${bg},${0.50 * a}) 100%)`,
          ].join(","),
          zIndex: 2,
        }}
      />
    </>
  );
}

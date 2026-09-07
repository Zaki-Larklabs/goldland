"use client";

import dynamic from "next/dynamic";

// Dynamic import with ssr: false must live in a Client Component.
// This thin wrapper lets page.tsx (a Server Component) render BuildingScroll
// without violating the next/dynamic SSR restriction.
const BuildingScroll = dynamic(
  () => import("@/components/BuildingScroll"),
  {
    ssr: false,
    loading: () => (
      <div 
        style={{ 
          height: "100vh", 
          backgroundColor: "#080808",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* Loading content */}
        <div className="relative z-10 text-center text-white px-4">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#C9A544] bg-[#C9A544]/10 border border-[#C9A544]/30 rounded">
              Goldland Contracting
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Precision<br />Engineering.
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            We transform architectural vision into fully compliant, structurally sound reality.
          </p>
          
          {/* Loading indicator */}
          <div className="mt-12 flex flex-col items-center">
            <p className="text-xs uppercase tracking-widest text-[#C9A544] mb-4">Loading Shard Experience</p>
            <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#C9A544] rounded-full animate-pulse" style={{ width: '50%' }} />
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

export default function BuildingScrollClient() {
  return <BuildingScroll />;
}

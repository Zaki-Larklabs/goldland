"use client";

import dynamic from "next/dynamic";

// Dynamic import for premium scrollytelling animation
const PremiumScroll = dynamic(
  () => import("@/components/PremiumScroll"),
  {
    ssr: false,
    loading: () => (
      <div 
        style={{ 
          height: "100vh", 
          backgroundColor: "#0A0A0A",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* Loading content for premium section */}
        <div className="relative z-10 text-center text-white px-4">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#C9A544] bg-[#C9A544]/10 border border-[#C9A544]/30 rounded">
              Chapter 01
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            The<br />Vision
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A project begins with a clear architectural direction. From concept and planning to a buildable project.
          </p>
          
          {/* Loading indicator */}
          <div className="mt-12 flex flex-col items-center">
            <p className="text-xs uppercase tracking-widest text-[#C9A544] mb-4">Approval in Progress</p>
            <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#C9A544] rounded-full animate-pulse" style={{ width: '70%' }} />
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

export default function PremiumScrollClient() {
  return <PremiumScroll />;
}
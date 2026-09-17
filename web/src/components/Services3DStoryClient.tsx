"use client";
import dynamic from "next/dynamic";

const Services3DStory = dynamic(() => import("@/components/Services3DStory"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#080808",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="text-center text-white px-4">
        <span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#C9A544] bg-[#C9A544]/10 border border-[#C9A544]/30 rounded">
          3D Storytelling
        </span>
        <p className="text-white/60 text-sm mt-3">Blueprint → Structure → MEP → Envelope → Interior → Completed</p>
      </div>
    </div>
  ),
});

export default function Services3DStoryClient() {
  return <Services3DStory />;
}

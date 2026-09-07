import React from "react";
import { StoryChapterConfig } from "./story-config";

interface StoryProgressProps {
  chapters: StoryChapterConfig[];
  activeChapterId: string | null;
}

export function StoryProgress({ chapters, activeChapterId }: StoryProgressProps) {
  return (
    <>
      {/* Desktop Progress */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-2 pointer-events-none">
        {chapters.map((chapter, index) => {
          const isActive = activeChapterId === chapter.id;
          return (
            <div key={chapter.id} className="flex flex-col items-center">
              <span 
                className={`text-[10px] font-mono tracking-widest transition-colors duration-300 ${
                  isActive ? "text-brass font-bold" : "text-white/40"
                }`}
              >
                {chapter.id}
              </span>
              {index < chapters.length - 1 && (
                <div 
                  className={`w-[1px] h-6 my-2 transition-colors duration-300 ${
                    isActive ? "bg-brass/50" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Progress */}
      <div className="absolute bottom-10 right-6 z-20 md:hidden flex items-center gap-2 bg-ink/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-none">
        <span className="text-xs font-mono text-brass font-bold">{activeChapterId || "01"}</span>
        <span className="text-xs font-mono text-white/40">/</span>
        <span className="text-xs font-mono text-white/40">06</span>
      </div>
    </>
  );
}

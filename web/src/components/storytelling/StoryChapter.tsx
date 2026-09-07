import React from "react";
import Link from "next/link";
import { StoryChapterConfig } from "./story-config";
import { Button } from "@/components/ui/button";

interface StoryChapterProps {
  chapter: StoryChapterConfig;
  isActive: boolean;
  isLast: boolean;
}

export function StoryChapter({ chapter, isActive, isLast }: StoryChapterProps) {
  return (
    <div 
      className={`absolute inset-0 flex flex-col justify-center px-6 md:px-24 transition-all duration-700 ease-out pointer-events-none ${
        isActive 
          ? "opacity-100 translate-y-0 z-10" 
          : "opacity-0 translate-y-8 -z-10"
      }`}
    >
      <div className="max-w-lg pointer-events-auto">
        <h2 className="text-sm font-mono tracking-widest text-brass mb-4 uppercase drop-shadow-md">
          Chapter {chapter.id}
        </h2>
        <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 drop-shadow-lg leading-tight">
          {chapter.title}
        </h3>
        <p className="text-xl text-gray-300 leading-relaxed drop-shadow max-w-md">
          {chapter.description}
        </p>
        
        {isLast && isActive && (
          <div className="mt-10 flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeIn_0.5s_ease-out_0.5s_forwards]">
            <Button size="lg" asChild className="bg-brass hover:bg-brass/90 text-ink font-bold shadow-[0_0_15px_rgba(201,165,68,0.3)] transition-all hover:scale-105 pointer-events-auto">
              <Link href="/contact">Get an Approval Assessment</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105 pointer-events-auto">
              <Link href="/projects">View Real Projects</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, PanInfo } from "framer-motion";
import { storyChapters } from "./story-config";
import { StoryProgress } from "./StoryProgress";
import { StoryChapter } from "./StoryChapter";

export function ScrollStoryVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    
    // Swipe left (next)
    if (info.offset.x < -threshold && currentIndex < storyChapters.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } 
    // Swipe right (prev)
    else if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentChapter = storyChapters[currentIndex];

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-ink overflow-hidden group">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/Create_an_ultra_premium video.mp4"
          poster="/images/hero-bg.jpg" // fallback poster
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          className={`w-full h-full object-cover object-right scale-[1.3] origin-center opacity-70 transition-opacity duration-1000`}
        />
        
        {/* Heavy gradient on the left to specifically hide the baked-in text of the raw video file without scaling it */}
        <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-ink via-ink to-transparent pointer-events-none" />
        
        {/* Top and bottom soft fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-transparent to-ink/90 pointer-events-none" />
      </div>

      {/* Global Branding Overlay */}
      <div className="absolute top-8 left-6 md:left-24 z-20 pointer-events-none">
        <h1 className="text-2xl font-display font-bold text-white tracking-widest uppercase opacity-80">
          Goldland
        </h1>
        <p className="text-xs font-mono text-brass tracking-widest mt-1 opacity-90">
          Engineering • Approvals • Delivery
        </p>
      </div>

      {/* Swipeable Chapters Container */}
      <motion.div 
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        {storyChapters.map((chapter, i) => (
          <StoryChapter 
            key={chapter.id}
            chapter={chapter}
            isActive={currentIndex === i}
            isLast={i === storyChapters.length - 1}
          />
        ))}
      </motion.div>

      {/* Navigation Controls Overlay */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 z-20 hidden md:flex items-center justify-start pointer-events-none">
        {currentIndex > 0 && (
          <button 
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className="pointer-events-auto ml-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
            aria-label="Previous Chapter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        )}
      </div>
      
      <div className="absolute inset-y-0 right-16 md:right-32 z-20 hidden md:flex items-center justify-end pointer-events-none">
        {currentIndex < storyChapters.length - 1 && (
          <button 
            onClick={() => setCurrentIndex(prev => prev + 1)}
            className="pointer-events-auto mr-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
            aria-label="Next Chapter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        )}
      </div>

      {/* Progress Indicator */}
      {!reducedMotion && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-auto pr-6 md:pr-12">
          <StoryProgress 
            chapters={storyChapters}
            activeChapterId={currentChapter.id}
          />
        </div>
      )}
      
      {/* Swipe Hint */}
      {!reducedMotion && (
        <div className="scroll-hint-icon absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-row items-center gap-4 opacity-50 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-xs font-mono text-white tracking-widest uppercase">Swipe</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      )}
    </div>
  );
}

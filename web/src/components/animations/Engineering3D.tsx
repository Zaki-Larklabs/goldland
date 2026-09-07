"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Engineering3D({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden perspective-[1200px]">
      {/* Static Background Video (Untransformed for performance) */}
      <video 
        src="/Create_an_ultra_premium%20video.mp4" 
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-right scale-[1.4] origin-right opacity-30 transition-all duration-1000 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-transparent z-0"></div>

      {/* 3D Transformed Layer (Only for lightweight grids) */}
      <motion.div
        style={{ y, scale, rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-[140%] absolute top-[-20%] left-0 z-0 origin-center pointer-events-none"
      >
        {/* Animated blueprint grid floating layers */}
        <motion.div 
          style={{ translateZ: 50 }}
          className="absolute inset-0 border-[rgba(62,214,124,0.1)] pointer-events-none opacity-40 mix-blend-screen"
          animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
        >
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(62,214,124,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(62,214,124,0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
        </motion.div>
        
        <motion.div 
          style={{ translateZ: -100 }}
          className="absolute inset-0 border-[rgba(201,165,68,0.1)] pointer-events-none opacity-20 mix-blend-screen"
          animate={{ backgroundPosition: ["0px 0px", "-50px -50px"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(201,165,68,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,165,68,0.15) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
        </motion.div>
      </motion.div>
      
      <div className="relative z-10 w-full h-full container mx-auto">
        {children}
      </div>
    </div>
  );
}

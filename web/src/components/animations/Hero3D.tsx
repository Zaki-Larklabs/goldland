"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero3D({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <div ref={containerRef} className="relative w-full h-full perspective-[1000px]">
      <motion.div
        style={{ y, opacity, scale, rotateX, transformStyle: "preserve-3d" }}
        className="w-full h-full absolute inset-0 z-0 origin-bottom pointer-events-none"
      >
        {/* Animated 3D Floating Grid */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <motion.div 
            animate={{ 
              backgroundPosition: ["0px 0px", "0px 100px"],
            }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 20 
            }}
            className="absolute -inset-[100%] border-[rgba(201,165,68,0.3)]"
            style={{
              backgroundImage: `linear-gradient(rgba(201,165,68,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,165,68,0.2) 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
              transform: 'rotateX(60deg) translateY(-200px) translateZ(-200px)',
              transformOrigin: 'top center',
            }}
          />
        </div>
      </motion.div>
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-start container mx-auto">
        {children}
      </div>
    </div>
  );
}

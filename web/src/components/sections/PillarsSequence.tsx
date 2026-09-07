"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HardHat, FileCheck, Building2 } from "lucide-react";

export function PillarsSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const frameCount = 100;
    // User requested frames to go in reverse down to 0
    const currentFrame = (index: number) => 
      `/sequences/pillars/frame_${String(index).padStart(3, "0")}.jpg`;

    const images: HTMLImageElement[] = [];
    const sequence = { frame: 99 }; // start at the last frame

    // Preload all images
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[99].onload = render;

    function render() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      const currentContext = currentCanvas.getContext("2d");
      if (!currentContext) return;
      
      const frameIndex = Math.max(0, Math.min(99, Math.round(sequence.frame)));
      if (images[frameIndex] && images[frameIndex].complete) {
        const img = images[frameIndex];
        
        // Scale to cover the canvas (like object-cover)
        const hRatio = currentCanvas.width / img.width;
        const vRatio = currentCanvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShift_x = (currentCanvas.width - img.width * ratio) / 2;
        const centerShift_y = (currentCanvas.height - img.height * ratio) / 2;
        
        currentContext.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
        currentContext.drawImage(
          img, 
          0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
      }
      
      // Reveal the text overlay only towards the end of the scroll (e.g. from frame 40 down to 0)
      if (overlayRef.current) {
        const opacity = Math.max(0, Math.min(1, (40 - frameIndex) / 30));
        overlayRef.current.style.opacity = String(opacity);
        // Add a slight upward translation for a smooth entrance
        const translateY = Math.max(0, (frameIndex - 10) * 1);
        overlayRef.current.style.transform = `translateY(${translateY}px)`;
      }
    }

    const isMobile = window.innerWidth < 768;
    
    // Optimize canvas resolution for mobile
    canvas.width = isMobile ? window.innerWidth : 1920;
    canvas.height = isMobile ? window.innerHeight : 1080;

    const tl = gsap.to(sequence, {
      frame: 0, // Animate backwards down to 0
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: isMobile ? "+=800" : "+=1500", // Shorter scroll distance on mobile
        scrub: isMobile ? 0.5 : 0.2, // Smoother scrubbing on mobile
        pin: true,
      },
      onUpdate: render,
    });

    const handleResize = () => {
      render();
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="force-dark relative h-screen w-full bg-ink overflow-hidden border-y border-white/10">
      <canvas 
        ref={canvasRef} 
        width={1920} 
        height={1080}
        className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-screen" 
        style={{
          backgroundImage: "url('/sequences/pillars/frame_099.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-ink/30" />

      {/* Pillars Overlay Content */}
      <div ref={overlayRef} className="absolute inset-0 flex flex-col items-center justify-end pb-8 pointer-events-none z-10 px-4" style={{ opacity: 0 }}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-10 tracking-tight drop-shadow-2xl text-center">
          Our Pillars of Operation
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
          <div className="bg-ink/40 backdrop-blur-md border border-white/10 rounded-xl p-8 flex flex-col items-center text-center shadow-2xl">
            <HardHat className="h-10 w-10 text-[#C9A544] mb-6 drop-shadow-md" />
            <h3 className="text-xl font-bold text-white mb-4">In-House Engineering</h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              We do not outsource structural or MEP design. Our licensed engineers generate all technical documentation internally, ensuring total accountability.
            </p>
          </div>
          
          <div className="bg-ink/40 backdrop-blur-md border border-white/10 rounded-xl p-8 flex flex-col items-center text-center shadow-2xl">
            <FileCheck className="h-10 w-10 text-[#C9A544] mb-6 drop-shadow-md" />
            <h3 className="text-xl font-bold text-white mb-4">Authority Mastery</h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              We intimately understand the distinct regulatory frameworks of DM, DCD, Trakhees, JAFZA, and DDA. We navigate the red tape so you don't have to.
            </p>
          </div>
          
          <div className="bg-ink/40 backdrop-blur-md border border-white/10 rounded-xl p-8 flex flex-col items-center text-center shadow-2xl">
            <Building2 className="h-10 w-10 text-[#C9A544] mb-6 drop-shadow-md" />
            <h3 className="text-xl font-bold text-white mb-4">Precision Fit-Out</h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Our site execution matches our drawings perfectly. We utilize premium materials and rigorous QA/QC processes on site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SkyscraperSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const frameCount = 100;
    const currentFrame = (index: number) => 
      `/sequences/skyscraper/frame_${String(index).padStart(3, "0")}.jpg`;

    const images: HTMLImageElement[] = [];
    const sequence = { frame: 0 };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = render;

    function render() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      const currentContext = currentCanvas.getContext("2d");
      if (!currentContext) return;

      if (images[sequence.frame] && images[sequence.frame].complete) {
        const img = images[sequence.frame];
        
        // Calculate dimensions to cover the canvas (object-cover equivalent)
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
    }

    const isMobile = window.innerWidth < 768;
    
    // Optimize canvas resolution for mobile
    canvas.width = isMobile ? window.innerWidth : 1920;
    canvas.height = isMobile ? window.innerHeight : 1080;

    const tl = gsap.to(sequence, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: isMobile ? "+=800" : "+=1500", // Shorter scroll distance on mobile
        scrub: isMobile ? 0.5 : 0.2, // Smoother scrubbing on mobile to prevent chunkiness
        pin: true,
      },
      onUpdate: render,
    });

    // Handle resize
    const handleResize = () => {
      // Keep canvas resolution fixed but scale via CSS, or we can update canvas resolution:
      // For performance, a fixed internal resolution is often better, scaled by CSS object-cover.
      render();
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="force-dark relative h-screen w-full bg-ink overflow-hidden border-y border-white/10">
      <canvas 
        ref={canvasRef} 
        width={1920} 
        height={1080}
        className="absolute inset-0 w-full h-full object-cover opacity-60" 
        style={{
          backgroundImage: "url('/sequences/skyscraper/frame_000.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 bg-gradient-to-t from-ink via-transparent to-ink/50">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-2xl text-center">
          Deconstructing <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A544] to-yellow-200">Complexity</span>
        </h2>
        <p className="text-lg md:text-2xl text-gray-200 drop-shadow-lg max-w-2xl text-center px-4">
          We break down massive engineering challenges into precise, manageable, and strictly compliant solutions.
        </p>
      </div>
    </section>
  );
}

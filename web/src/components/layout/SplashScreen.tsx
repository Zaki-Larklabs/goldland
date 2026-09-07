"use client";

import React, { useEffect, useState } from "react";

export function SplashScreen() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Lock body scroll while splash is showing
    document.body.style.overflow = 'hidden';
    
    // Start fading out after 1.8 seconds
    const t1 = setTimeout(() => setFade(true), 1800);
    
    // Remove from DOM and restore scroll after 2.5 seconds
    const t2 = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = 'auto';
    }, 2500);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-[99999] bg-ink flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex flex-col items-center">
        <img 
          src="/images/goldland-logo.png" 
          alt="Goldland Contracting" 
          className="h-16 md:h-20 w-auto object-contain animate-pulse" 
        />
        <div className="mt-8 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brass animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-brass animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-brass animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, Phone, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export function StickyMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after scrolling down slightly
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Also show after a delay just in case
    const timer = setTimeout(() => setVisible(true), 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const waLink = "https://wa.me/971566321734?text=Hi,%20I%20am%20looking%20for%20assistance%20with%20Dubai%20approvals.";
  const phoneLink = "tel:+971566321734";

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full z-[100] md:hidden transition-transform duration-300 transform border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-[#070C1C]/90 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.1)]",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center justify-between px-2 py-2">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { source: "mobile_bar" })}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[#25D366] hover:text-[#25D366]/80 transition-colors"
        >
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>
        
        <div className="w-[1px] h-8 bg-gray-200 dark:bg-gray-800"></div>
        
        <a
          href={phoneLink}
          onClick={() => trackEvent("phone_click", { source: "mobile_bar" })}
          className="flex flex-col items-center justify-center flex-1 py-1 text-gray-700 dark:text-gray-300 hover:text-brass transition-colors"
        >
          <Phone className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
        </a>
        
        <div className="w-[1px] h-8 bg-gray-200 dark:bg-gray-800"></div>
        
        <Link
          href="/#assessment"
          className="flex flex-col items-center justify-center flex-1 py-1 text-brass hover:text-brass/80 transition-colors"
          onClick={(e) => {
            const el = document.getElementById("assessment");
            if (el) {
              e.preventDefault();
              el.scrollIntoView({ behavior: "smooth" });
            } else if (window.location.pathname !== '/') {
              window.location.href = '/#assessment';
            }
          }}
        >
          <ClipboardCheck className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Assess</span>
        </Link>
      </div>
    </div>
  );
}

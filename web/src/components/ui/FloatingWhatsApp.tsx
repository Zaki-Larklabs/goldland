"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingWhatsApp({
  phoneNumber = "971566321734",
  message = "مرحباً، أود الاستفسار عن خدماتكم. Hello, I am looking for assistance with Goldland's services and approvals.",
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after scrolling down slightly or after a few seconds
    const handleScroll = () => {
      if (window.scrollY > 100) setVisible(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const timer = setTimeout(() => setVisible(true), 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-6 z-[100] transition-all duration-500 transform",
        visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-90 pointer-events-none"
      )}
    >
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)] hover:-translate-y-1 transition-all group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        
        {/* Tooltip / Label */}
        <span className="absolute left-16 px-3 py-1.5 bg-white dark:bg-ink text-ink dark:text-white text-sm font-semibold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100 dark:border-border-dark">
          Chat with us
          <div className="absolute top-1/2 -left-1 w-2 h-2 bg-white dark:bg-ink transform -translate-y-1/2 rotate-45 border-l border-b border-gray-100 dark:border-border-dark"></div>
        </span>
      </a>
    </div>
  );
}

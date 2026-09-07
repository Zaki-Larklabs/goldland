"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { ThemeSwitch } from "./ThemeSwitch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Social icon components — inline SVG, no external dependency
const IconLinkedin = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const IconFacebook = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const IconInstagram = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);
const IconYoutube = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/company/goldland-contracting", label: "LinkedIn", Icon: IconLinkedin },
  { href: "https://www.facebook.com/goldlandcontracting", label: "Facebook", Icon: IconFacebook },
  { href: "https://www.instagram.com/goldlandcontracting", label: "Instagram", Icon: IconInstagram },
  { href: "https://www.youtube.com/@goldlandcontracting", label: "YouTube", Icon: IconYoutube },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 z-[100] w-full border-b transition-all duration-300 text-[#F1EEE4]",
        scrolled 
          ? "bg-[#0C1530]/95 backdrop-blur-md border-[rgba(201,165,68,0.2)] shadow-[0_4px_20px_rgba(0,0,0,0.1)]" 
          : "bg-[#0C1530] border-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded">
            <img 
              src="/images/goldland-logo.png" 
              alt="Goldland Contracting" 
              className="h-10 w-auto object-contain transition-opacity group-hover:opacity-90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            />
          </Link>
          <MegaMenu />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Social Links - Desktop */}
          <div className="hidden lg:flex items-center gap-1 mr-1">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-[#C9A544] hover:text-white transition-colors"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
          <div className="hidden lg:block">
            <ThemeSwitch />
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex border-[#C9A544] text-[#C9A544] hover:bg-[#C9A544] hover:text-[#0C1530] transition-colors bg-transparent h-9 px-4">
            <Link href="/admin">Admin</Link>
          </Button>
          <Button asChild variant="default" className="hidden sm:inline-flex h-9">
            <Link href="/contact">Get Approved</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

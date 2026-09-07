import Link from "next/link";
import React from "react";
import { ThemeSwitch } from "./ThemeSwitch";
import { Lock } from "lucide-react";

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-gray-50 text-ink border-t border-border-light pt-16 pb-8 dark:bg-ink dark:text-white dark:border-border-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="space-y-6">
            <Link href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded group">
              <img 
                src="/images/goldland-logo.png" 
                alt="Goldland Contracting" 
                className="h-10 w-auto object-contain dark:brightness-0 dark:invert opacity-90 transition-opacity group-hover:opacity-100"
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              Interior fitout, MEP design and Dubai authority approvals — handled end to end from Al Qusais, Dubai.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-gray-500 hover:text-brass dark:text-gray-400 dark:hover:text-brass transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brass dark:text-gray-400 dark:hover:text-brass transition-colors">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brass dark:text-gray-400 dark:hover:text-brass transition-colors">
                <LinkedinIcon size={20} />
              </a>
            </div>
            <div className="pt-2">
              <ThemeSwitch />
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-semibold mb-6 text-lg">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-600 hover:text-ink dark:text-gray-400 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-1 -ml-1">About Us</Link></li>
              <li><Link href="/services" className="text-gray-600 hover:text-ink dark:text-gray-400 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-1 -ml-1">Services</Link></li>
              <li><Link href="/authority-approvals" className="text-gray-600 hover:text-ink dark:text-gray-400 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-1 -ml-1">Approvals</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-ink dark:text-gray-400 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-1 -ml-1">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold mb-6 text-lg">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services#design" className="text-gray-600 hover:text-ink dark:text-gray-400 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-1 -ml-1">Design Services</Link></li>
              <li><Link href="/authority-approvals" className="text-gray-600 hover:text-ink dark:text-gray-400 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-1 -ml-1">Authority Approvals</Link></li>
              <li><Link href="/projects" className="text-gray-600 hover:text-ink dark:text-gray-400 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-1 -ml-1">Project Management</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold mb-6 text-lg">Contact</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <a href="tel:+971566321734" className="hover:text-ink dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-1 -ml-1 inline-flex items-center">
                  +971 566321734
                </a>
              </li>
              <li>
                <a href="tel:+97142292800" className="hover:text-ink dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-1 -ml-1 inline-flex items-center">
                  +971 4 229 2800
                </a>
              </li>
              <li>
                <a href="mailto:sales@goldlandcontracting.ae" className="hover:text-ink dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-1 -ml-1 inline-flex items-center break-all">
                  sales@goldlandcontracting.ae
                </a>
              </li>
              <li className="leading-relaxed pt-2">
                Office 102, Abdulla Khalifa Bldg,<br />Al Qusais Industrial Area 1,<br />Damascus Street, Dubai, UAE
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-border-light dark:border-border-dark pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Goldland Contracting L.L.C. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p>Interior Fitout · MEP · Approvals</p>
            <Link href="/admin" className="text-gray-400 hover:text-brass dark:text-gray-600 dark:hover:text-brass transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-1">
              <Lock className="w-3 h-3" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Home, Building2, HardHat } from 'lucide-react';
import { VideoMaskOverlay } from "@/components/ui/video-mask-overlay";

export default function NotFound() {
  return (
    <div className="bg-ink min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-center px-4">
      <video 
        src="/Create_an_ultra_premium_photo.mp4" 
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover object-center opacity-10 mix-blend-luminosity pointer-events-none"
      />
      <VideoMaskOverlay intensity={0.9} />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-9xl font-display font-bold text-brass opacity-20 mb-4 tracking-tighter">404</h1>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back to the right place.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 text-left">
          <Link href="/" className="group flex flex-col p-6 bg-white/5 border border-white/10 rounded-xl hover:border-brass/50 hover:bg-white/10 transition-all duration-300">
            <Home className="w-8 h-8 text-brass mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-white font-bold mb-1">Home</span>
            <span className="text-sm text-gray-400 flex items-center gap-2">Return to start <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></span>
          </Link>
          
          <Link href="/authority-approvals" className="group flex flex-col p-6 bg-white/5 border border-white/10 rounded-xl hover:border-brass/50 hover:bg-white/10 transition-all duration-300">
            <Building2 className="w-8 h-8 text-brass mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-white font-bold mb-1">Approvals</span>
            <span className="text-sm text-gray-400 flex items-center gap-2">View authorities <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></span>
          </Link>
          
          <Link href="/services" className="group flex flex-col p-6 bg-white/5 border border-white/10 rounded-xl hover:border-brass/50 hover:bg-white/10 transition-all duration-300">
            <HardHat className="w-8 h-8 text-brass mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-white font-bold mb-1">Services</span>
            <span className="text-sm text-gray-400 flex items-center gap-2">View solutions <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></span>
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-gray-400">
            Need immediate engineering support? <Link href="/contact" className="text-brass hover:underline font-bold">Contact Us</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

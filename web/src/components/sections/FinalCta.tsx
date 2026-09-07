import React from "react";
import { OptimizedVideo } from "@/components/ui/optimized-video";
import { GlobalCta } from "@/components/layout/GlobalCta";

export default function FinalCta() {
  return (
    <section className="relative py-20 md:py-32 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Burj Khalifa Video Background */}
      <OptimizedVideo
        src="/burj%20khalifa.mp4"
        poster="/images/hero-bg.jpg"
        eager={false}
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
      />
      
      {/* Enhanced Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#C9A544]/10 via-transparent to-transparent" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#C9A544] rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10 max-w-4xl text-center">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A544]/20 border border-[#C9A544]/40 rounded-full text-[#C9A544] text-sm font-bold uppercase tracking-wider backdrop-blur-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Ready to Begin?
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
          Don't Let Missing Approvals
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A544] to-[#F4E4A6]">
            Halt Your Project.
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
          Failing to comply with the latest regulations can delay your project by months. Upload your drawings now for a free, no-obligation compliance check.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <GlobalCta />
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-[#C9A544] font-bold text-lg rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Live Chat Support
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-80">
          {[
            { value: "24/7", label: "Support Available" },
            { value: "Free", label: "Initial Consultation" },
            { value: "48hrs", label: "Response Time" },
            { value: "100%", label: "Satisfaction Guarantee" }
          ].map((indicator, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-[#C9A544] mb-2">{indicator.value}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{indicator.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

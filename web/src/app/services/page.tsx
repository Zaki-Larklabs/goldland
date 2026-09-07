"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { VideoMaskOverlay } from "@/components/ui/video-mask-overlay";
import { Building2, PenTool, ClipboardCheck, ArrowRight, Layout, PencilRuler, Zap, Search, ShieldCheck, FileText, CheckCircle2, PhoneCall } from "lucide-react";

export default function ServicesPage() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(el => io.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('in'));
    }
  }, []);

  const authorities = [
    "Dubai Municipality", "DM Food Dept.", "DM Health Dept.", "Villa Modifications",
    "Mezzanine Approval", "Swimming Pool", "Civil Defence (DCD)", "GAS Approval",
    "DDA Approval", "DEWA Approval", "DIEZ Approval", "Concordia",
    "DHA Approval", "DHCC Approval", "Dubai South", "DED Approval",
    "TECOM Approval", "JAFZA Approval", "RTA Approval", "Trakhees",
    "Nakheel", "Emaar", "Deyaar", "Damac"
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-[#C9A544]/30">
      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden pt-32 pb-24 border-b border-white/10">
        <video 
          src="/Create_an_ultra_premium_photo.mp4" 
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover object-left opacity-20 mix-blend-luminosity pointer-events-none"
          style={{ transform: "scale(1.5)", transformOrigin: "left center" }}
        />
        <VideoMaskOverlay intensity={0.9} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 to-[#050505]" />
        
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 mb-6 tracking-wide">
            <Link href="/" className="hover:text-[#C9A544] transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <span className="text-[#C9A544]">Services</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Services &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A544] to-[#F4E4A6]">Approvals</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            Design, authority approvals, and project management — executed with engineering precision, all in one place.
          </p>
        </div>
      </section>

      {/* ============ AUTHORITY APPROVALS ============ */}
      <section id="approvals" className="py-24 relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9A544]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="mb-16 max-w-2xl reveal opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A544]/20 bg-[#C9A544]/10 mb-6">
              <Building2 className="w-4 h-4 text-[#C9A544]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A544]">Folder 01</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Authority Approvals</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              We navigate the complex regulatory landscape, managing submissions for these Dubai authorities, free zones, and developers.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out">
            {authorities.map((auth, idx) => (
              <div key={idx} className="group flex items-center gap-3 px-5 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#C9A544]/50 hover:bg-[#C9A544]/10 transition-all duration-300 backdrop-blur-sm cursor-default">
                <div className="w-2 h-2 rounded-full bg-gray-600 group-hover:bg-[#C9A544] transition-colors" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{auth}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 rounded-xl bg-[#C9A544]/5 border border-[#C9A544]/20 flex items-start md:items-center gap-4 reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out">
            <Search className="w-6 h-6 text-[#C9A544] shrink-0" />
            <p className="text-gray-300 text-sm md:text-base">
              Don't see your authority listed? <Link href="/contact" className="text-[#C9A544] font-semibold hover:underline">Ask us</Link> — we've likely filed with them before and can handle your specific requirements.
            </p>
          </div>
        </div>
      </section>

      {/* ============ DESIGN SERVICES ============ */}
      <section id="design" className="py-24 relative overflow-hidden border-b border-white/5 bg-[#080808]">
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="mb-16 max-w-2xl reveal opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A544]/20 bg-[#C9A544]/10 mb-6">
              <PenTool className="w-4 h-4 text-[#C9A544]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A544]">Folder 02</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Design Services</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Clear, highly accurate, and authority-compliant drawings for every phase of your fit-out project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out">
            {/* Space & Structure */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C9A544]/30 transition-colors group">
              <Layout className="w-10 h-10 text-gray-500 group-hover:text-[#C9A544] mb-6 transition-colors" />
              <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">Space &amp; Structure</h3>
              <ul className="space-y-4">
                {['Architectural & Project Design', 'Furniture & Layout Plans', 'Space Planning & Joinery', '3D Visualisation'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A544]/50 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fit-Out & Millwork */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C9A544]/30 transition-colors group">
              <PencilRuler className="w-10 h-10 text-gray-500 group-hover:text-[#C9A544] mb-6 transition-colors" />
              <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">Fit-Out &amp; Millwork</h3>
              <ul className="space-y-4">
                {['Ceiling & Fire Safety Designs', 'Custom Joinery & Cabinetry', 'Custom Shelving Designs', 'Material Specifications'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A544]/50 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* MEP */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C9A544]/30 transition-colors group">
              <Zap className="w-10 h-10 text-gray-500 group-hover:text-[#C9A544] mb-6 transition-colors" />
              <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">MEP Engineering</h3>
              <ul className="space-y-4">
                {['HVAC (AC Ducting) Design', 'Electrical & Load Schedules', 'Drainage & Water Systems', 'Authority Compliant Drafts'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A544]/50 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROJECT MANAGEMENT ============ */}
      <section id="management" className="py-24 relative overflow-hidden bg-[#0A0D14]">
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="mb-16 max-w-2xl reveal opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A544]/20 bg-[#C9A544]/10 mb-6">
              <ClipboardCheck className="w-4 h-4 text-[#C9A544]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A544]">Folder 03</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Project Management</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              We keep your file moving from start to finish, ensuring compliance, coordination, and rapid NOC acquisition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out">
            {[
              { title: "Approval Coordination & NOC Acquisition", icon: <ShieldCheck className="w-8 h-8" /> },
              { title: "Documentation Management", icon: <FileText className="w-8 h-8" /> },
              { title: "Compliance Assurance", icon: <ClipboardCheck className="w-8 h-8" /> },
              { title: "Stakeholder Communication & Follow-Up", icon: <PhoneCall className="w-8 h-8" /> },
              { title: "Final Record Management", icon: <Building2 className="w-8 h-8" /> },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-4 hover:bg-white/10 transition-colors">
                <div className="text-[#C9A544]/80">{feature.icon}</div>
                <h3 className="text-lg font-semibold leading-snug">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-32 relative bg-black overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#C9A544]/10 to-transparent" />
        <div className="container mx-auto max-w-3xl px-6 relative z-10 reveal opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to initiate your project?</h2>
          <p className="text-xl text-gray-400 mb-10">Get in touch with our engineering team for a free technical consultation.</p>
          <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A544] text-black font-bold text-lg rounded-xl hover:bg-[#F4E4A6] transition-colors">
            Start Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

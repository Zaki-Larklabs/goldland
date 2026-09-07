"use client";

import React, { useState } from "react";
import Link from "next/link";
import { login } from "./actions";
import { ArrowLeft, Lock, ArrowRight, Eye, Shield, FileText, Building2, Users, BarChart3 } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050B14] flex flex-col md:flex-row text-white font-sans selection:bg-[#C9A544] selection:text-black">
      
      {/* LEFT SIDE - Hero Background (60%) */}
      <div className="hidden md:flex flex-col w-[60%] relative p-12 overflow-hidden justify-between border-r border-white/5">
        {/* Background Image & Overlays */}
        <div 
          className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center z-0 transition-transform duration-1000 scale-105" 
          style={{ filter: "brightness(0.6) contrast(1.1) saturate(1.2)" }}
        />
        <div className="absolute inset-0 bg-[#02060F]/60 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02060F] via-[#02060F]/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02060F] via-transparent to-[#050B14] z-10" />
        
        {/* Architectural Grid Lines Overlay */}
        <div className="absolute inset-0 z-10 opacity-20 pointer-events-none" style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Crosshair accents */}
        <div className="absolute top-[120px] right-[100px] w-6 h-6 border-t border-r border-[#C9A544]/50 z-20" />
        <div className="absolute top-1/2 left-[10%] w-[100px] h-[1px] bg-[#C9A544]/30 z-20" />

        {/* Top Nav Logo */}
        <div className="relative z-20 flex justify-between items-start">
          <Link href="/">
            <img src="/images/goldland-logo.png" alt="Goldland" className="h-10 w-auto brightness-0 invert" />
          </Link>
          <div className="text-right text-[10px] text-gray-500 tracking-[0.2em] font-mono leading-relaxed mt-2">
            <p>25.2048° N</p>
            <p>55.2708° E</p>
          </div>
        </div>

        {/* Center Text */}
        <div className="relative z-20 mt-20 max-w-xl">
          <div className="text-[10px] text-gray-400 tracking-[0.2em] mb-8 font-mono space-y-1.5 flex flex-col items-start">
            <div className="w-8 h-[1px] bg-[#C9A544] mb-2" />
            <p>ENGINEERING</p>
            <p>APPROVALS</p>
            <p>BUILDING TOMORROW</p>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-1">
            GOLDLAND
          </h1>
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-[#C9A544] mb-8">
            OPERATIONS CENTER
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            Manage approvals, projects, content and leads from one secure workspace.
          </p>
        </div>

        {/* Bottom Features */}
        <div className="relative z-20 flex items-start gap-12 pt-8">
          <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#C9A544]" />
          <div className="absolute top-0 left-8 right-0 h-[1px] bg-white/10" />
          
          <div className="flex flex-col items-start gap-3 group mt-4">
            <FileText className="w-6 h-6 text-gray-400 group-hover:text-[#C9A544] transition-colors stroke-1" />
            <p className="text-[10px] font-bold tracking-widest text-gray-500 group-hover:text-white transition-colors uppercase">Authority<br/>Approvals</p>
          </div>
          <div className="flex flex-col items-start gap-3 group mt-4">
            <Building2 className="w-6 h-6 text-gray-400 group-hover:text-[#C9A544] transition-colors stroke-1" />
            <p className="text-[10px] font-bold tracking-widest text-gray-500 group-hover:text-white transition-colors uppercase">Projects</p>
          </div>
          <div className="flex flex-col items-start gap-3 group mt-4">
            <Users className="w-6 h-6 text-gray-400 group-hover:text-[#C9A544] transition-colors stroke-1" />
            <p className="text-[10px] font-bold tracking-widest text-gray-500 group-hover:text-white transition-colors uppercase">Leads</p>
          </div>
          <div className="flex flex-col items-start gap-3 group mt-4">
            <BarChart3 className="w-6 h-6 text-gray-400 group-hover:text-[#C9A544] transition-colors stroke-1" />
            <p className="text-[10px] font-bold tracking-widest text-gray-500 group-hover:text-white transition-colors uppercase">Content</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form Container (40%) */}
      <div className="w-full md:w-[40%] flex flex-col justify-between p-8 lg:p-14 relative bg-[#050B14]">
        
        {/* Top Header */}
        <div className="flex justify-between items-center text-[11px] font-semibold tracking-wide text-[#C9A544] mb-16">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Website
          </Link>
          <div className="flex gap-3 text-gray-500">
            {/* Mock theme icons matching design */}
            <svg className="w-4 h-4 hover:text-[#C9A544] cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
          </div>
        </div>

        {/* Form Box Container */}
        <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center pb-20">
          <div className="flex items-center justify-between mb-10 text-[10px] font-bold tracking-widest text-gray-400 border border-white/5 rounded-lg px-4 py-3 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <Lock className="w-3.5 h-3.5" />
              SECURE ADMIN ACCESS
            </div>
            <span className="opacity-40 font-mono">v1.0.0</span>
          </div>

          <h2 className="text-3xl font-display font-bold mb-3 tracking-tight">Welcome back</h2>
          <p className="text-gray-400 text-sm mb-8 tracking-wide">Sign in to continue to the Goldland Admin Portal.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded text-[13px] flex items-center gap-3 font-medium">
                <Shield className="w-4 h-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[11px] font-semibold tracking-wider text-gray-300">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="Enter your email address"
                  className="w-full bg-[#0A111F] border border-white/10 rounded-lg pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#C9A544] focus:border-[#C9A544] transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[11px] font-semibold tracking-wider text-gray-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-500" />
                </div>
                <input 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  placeholder="Enter your password"
                  className="w-full bg-[#0A111F] border border-white/10 rounded-lg pl-11 pr-11 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#C9A544] focus:border-[#C9A544] transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 rounded border border-white/20 bg-white/5 flex items-center justify-center group-hover:border-[#C9A544]/50 transition-colors">
                  <input type="checkbox" className="opacity-0 absolute" />
                </div>
                <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-xs text-[#C9A544] hover:text-[#F4E4A6] transition-colors font-medium">
                Forgot your password?
              </a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-black font-bold py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-[#F4E4A6] hover:to-[#D4AF37] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(201,165,68,0.15)] text-sm tracking-wide mt-2"
            >
              {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
              {!loading && <ArrowRight className="w-4 h-4 ml-1" />}
            </button>

            <div className="relative py-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative bg-[#050B14] px-4 text-[10px] text-gray-500 tracking-wider font-semibold">OR</div>
            </div>

            <button 
              type="button" 
              className="w-full bg-transparent border border-white/10 text-gray-300 font-semibold py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white/5 transition-all text-sm tracking-wide group"
            >
              <Shield className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              Sign in with SSO (Internal)
            </button>
          </form>

          <p className="text-[11px] text-gray-500 text-center mt-12 tracking-wide">
            By signing in, you agree to our <a href="#" className="text-[#C9A544] hover:underline">internal access policy</a>.
          </p>
        </div>

        {/* Footer */}
        <div className="text-[10px] text-gray-600 flex flex-col lg:flex-row justify-between items-center font-medium tracking-wider gap-4 border-t border-white/5 pt-6 pb-2">
          <p>© 2024 Goldland Contracting L.L.C</p>
          <div className="flex gap-4 items-center">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy</span>
            <span className="w-[1px] h-3 bg-white/10" />
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Security</span>
            <span className="w-[1px] h-3 bg-white/10" />
            <span className="text-[#C9A544]">Internal Use Only</span>
          </div>
        </div>

      </div>
    </div>
  );
}

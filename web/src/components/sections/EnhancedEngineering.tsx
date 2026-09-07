"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { 
  Zap, 
  Shield, 
  Award, 
  Users, 
  TrendingUp, 
  CheckCircle2,
  ArrowRight,
  Layers,
  Settings,
  Target
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface EvidenceCardData {
  label: string;
  value: string;
  description: string;
}

const evidenceCards: EvidenceCardData[] = [
  { label: "Years in Dubai", value: "10+", description: "Since 2016" },
  { label: "Authority Types", value: "20+", description: "Across all zones" },
  { label: "Engineers", value: "In-house", description: "MEP & Structural" },
  { label: "Compliance", value: "Strict", description: "Dubai Building Code" }
];

const capabilities = [
  {
    icon: Layers,
    title: "Multi-Discipline Engineering",
    description: "Structural, MEP, and architectural coordination under one roof",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: Shield,
    title: "Authority Submission Support",
    description: "Every drawing verified by our engineering team before submission",
    color: "from-emerald-500 to-teal-400"
  },
  {
    icon: Settings,
    title: "Advanced MEP Systems",
    description: "Smart building integration and energy-efficient design solutions",
    color: "from-purple-500 to-indigo-400"
  },
  {
    icon: Target,
    title: "Code Compliance Expertise",
    description: "Deep knowledge of Dubai Municipality and international standards",
    color: "from-orange-500 to-red-400"
  }
];

export default function EnhancedEngineering() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!containerRef.current || !isInView) return;

    // Animate stats cards
    const cards = containerRef.current.querySelectorAll('.stat-card');
    gsap.fromTo(cards, 
      { 
        y: 60, 
        opacity: 0,
        scale: 0.8,
        rotateY: -15
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      }
    );

    // Animate capability cards
    const capabilityCards = containerRef.current.querySelectorAll('.capability-card');
    gsap.fromTo(capabilityCards, 
      { 
        x: -50, 
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3
      }
    );
  }, [isInView]);

  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,165,68,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,165,68,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A544]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Animated Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A544" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
          <path 
            d="M100,500 Q300,300 500,500 T900,500" 
            stroke="url(#circuitGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M500,100 Q700,300 500,500 T500,900" 
            stroke="url(#circuitGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse delay-500"
          />
        </svg>
      </div>

      <div className="container mx-auto relative z-10" ref={containerRef}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A544]/10 border border-[#C9A544]/30 rounded-full text-[#C9A544] text-sm font-bold uppercase tracking-wider mb-8">
              <Zap className="w-4 h-4" />
              Engineering Excellence
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Engineering-led{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A544] to-[#F4E4A6]">
                Precision
              </span>
            </h2>

            <div className="space-y-6 mb-8">
              <p className="text-xl text-gray-300 leading-relaxed">
                Goldland is not a generic typing center. We are an engineering and architectural firm 
                that understands the structural, mechanical, and safety requirements of Dubai's strictest jurisdictions.
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                Every drawing we submit is verified by our in-house engineering team to strictly adhere to the Dubai Building Code. This is how we deliver engineering excellence, project after project.
              </p>
            </div>

            {/* Capabilities Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  className="capability-card group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-[#C9A544]/50 transition-all duration-300">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${capability.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <capability.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm mb-1 group-hover:text-[#C9A544] transition-colors">
                        {capability.title}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <Link 
              href="/about"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C9A544] to-[#B8941A] text-black font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Users className="w-5 h-5" />
              More About Our Firm
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Right Column - Enhanced Evidence Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            ref={cardsRef}
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A544]/20 via-transparent to-blue-500/20 rounded-3xl blur-3xl" />
            
            {/* Cards Grid */}
            <div className="relative grid grid-cols-2 gap-6">
              {evidenceCards.map((card, index) => (
                <motion.div
                  key={index}
                  className="stat-card group"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-[#C9A544] transition-all duration-300 shadow-2xl">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C9A544]/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                    
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C9A544] to-[#B8941A] rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-[#C9A544]/50 transition-all">
                      {index === 0 && <Award className="w-6 h-6 text-white" />}
                      {index === 1 && <Shield className="w-6 h-6 text-white" />}
                      {index === 2 && <Users className="w-6 h-6 text-white" />}
                      {index === 3 && <TrendingUp className="w-6 h-6 text-white" />}
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#C9A544] mb-2">
                        {card.label}
                      </div>
                      <div className="text-3xl font-bold text-white mb-2 group-hover:text-[#C9A544] transition-colors">
                        {card.value}
                      </div>
                      <div className="text-sm text-gray-400">
                        {card.description}
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#C9A544]/30 group-hover:border-[#C9A544] transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Success Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 p-6 bg-gradient-to-r from-[#C9A544]/10 to-[#B8941A]/5 border border-[#C9A544]/20 rounded-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-6 h-6 text-[#C9A544]" />
                <span className="font-bold text-[#C9A544]">Built on Verifiable Expertise</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our engineering-first approach relies on fully certified, in-house structural and MEP engineers. We strictly enforce code compliance, ensuring every drawing submitted to Dubai authorities meets exact regulatory standards.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
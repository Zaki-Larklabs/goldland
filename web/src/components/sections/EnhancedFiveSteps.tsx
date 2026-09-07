"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { 
  ClipboardList, 
  PenTool, 
  UserCheck, 
  Send, 
  CheckCircle2,
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

const processSteps = [
  { 
    num: "01", 
    title: "Project Review", 
    desc: "We review your space and timeline to determine exact authority requirements.",
    icon: ClipboardList,
    color: "from-blue-500 to-cyan-400",
    details: ["Site assessment", "Timeline analysis", "Authority mapping", "Requirement documentation"]
  },
  { 
    num: "02", 
    title: "Engineering & Design", 
    desc: "Our team drafts architectural, structural, and MEP drawings compliant with the Dubai Building Code.",
    icon: PenTool,
    color: "from-purple-500 to-indigo-400",
    details: ["Architectural drawings", "Structural calculations", "MEP system design", "Code compliance review"]
  },
  { 
    num: "03", 
    title: "Client Sign-off", 
    desc: "You review the complete documentation package before we proceed.",
    icon: UserCheck,
    color: "from-emerald-500 to-teal-400",
    details: ["Documentation review", "Client feedback", "Revisions if needed", "Final approval"]
  },
  { 
    num: "04", 
    title: "Authority Submission", 
    desc: "We file the paperwork and actively follow up with DM, DCD, DDA, or other bodies.",
    icon: Send,
    color: "from-orange-500 to-red-400",
    details: ["Document submission", "Authority coordination", "Progress tracking", "Issue resolution"]
  },
  { 
    num: "05", 
    title: "Final Inspection", 
    desc: "We coordinate site inspections to secure the final completion certificate.",
    icon: CheckCircle2,
    color: "from-green-500 to-emerald-400",
    details: ["Inspection scheduling", "Site preparation", "Authority coordination", "Certificate delivery"]
  }
];

export default function EnhancedFiveSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Auto-advance steps
  useEffect(() => {
    if (!isInView || !isPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView, isPlaying]);

  // Animate timeline
  useEffect(() => {
    if (!timelineRef.current || !isInView) return;

    gsap.fromTo(
      timelineRef.current.querySelectorAll('.step-item'),
      { x: -100, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.15, 
        ease: "power3.out" 
      }
    );
  }, [isInView]);

  const currentStep = processSteps[activeStep];

  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-[#0f172a] via-[#000000] to-[#0f172a] overflow-hidden">
      {/* Enhanced Background without Video */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,165,68,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,165,68,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A544]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Floating Elements */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#C9A544]/30 rounded-full"
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Process Flow Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9A544" stopOpacity="0" />
              <stop offset="50%" stopColor="#C9A544" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C9A544" stopOpacity="0" />
            </linearGradient>
          </defs>
          {processSteps.map((_, index) => (
            <motion.line
              key={index}
              x1={100 + index * 200}
              y1="500"
              x2={300 + index * 200}
              y2="500"
              stroke="url(#flowGradient)"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: index * 0.5 }}
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto relative z-10" ref={containerRef}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A544]/10 border border-[#C9A544]/30 rounded-full text-[#C9A544] text-sm font-bold uppercase tracking-wider mb-8"
          >
            <CheckCircle2 className="w-4 h-4" />
            Our Process
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-[#FDFBF6] mb-6 leading-tight"
          >
            Five Simple{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A544] to-[#F4E4A6]">
              Steps
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#CBD5E1] leading-relaxed max-w-3xl mx-auto mb-8"
          >
            From initial consultation to final certificate, we've streamlined the approval process 
            into five clear, manageable phases.
          </motion.p>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-2 bg-[#FDFBF6]/10 hover:bg-[#FDFBF6]/20 text-[#FDFBF6] rounded-lg transition-all duration-300"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={() => { setActiveStep(0); setIsPlaying(false); }}
              className="flex items-center gap-2 px-4 py-2 bg-[#FDFBF6]/10 hover:bg-[#FDFBF6]/20 text-[#FDFBF6] rounded-lg transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Timeline */}
          <div ref={timelineRef} className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`step-item group cursor-pointer ${
                  activeStep === index ? 'active' : ''
                }`}
                onClick={() => {
                  setActiveStep(index);
                  setIsPlaying(false);
                }}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`relative flex items-start gap-6 p-6 rounded-2xl transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-gradient-to-r from-[#C9A544]/20 to-transparent border-2 border-[#C9A544] shadow-lg shadow-[#C9A544]/20' 
                    : 'bg-[#FDFBF6]/5 hover:bg-[#FDFBF6]/10 border-2 border-[#FDFBF6]/10 hover:border-[#C9A544]/50'
                }`}>
                  {/* Step Number */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg ${
                    activeStep === index 
                      ? 'bg-gradient-to-br from-[#C9A544] to-[#B8941A] text-[#000000]' 
                      : 'bg-gradient-to-br from-[#475569] to-[#334155] text-[#FDFBF6] group-hover:from-[#C9A544] group-hover:to-[#B8941A] group-hover:text-[#000000]'
                  } transition-all duration-300`}>
                    {step.num}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                      activeStep === index ? 'text-[#C9A544]' : 'text-[#FDFBF6] group-hover:text-[#C9A544]'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-[#CBD5E1] leading-relaxed mb-4">
                      {step.desc}
                    </p>

                    {/* Details List */}
                    {activeStep === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-2 gap-2"
                      >
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                            <CheckCircle2 className="w-3 h-3 text-[#C9A544]" />
                            {detail}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Arrow */}
                  <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
                    activeStep === index ? 'text-[#C9A544] translate-x-2' : 'text-[#64748B] group-hover:text-[#C9A544] group-hover:translate-x-2'
                  }`} />

                  {/* Active Indicator */}
                  {activeStep === index && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C9A544] to-[#B8941A] rounded-r"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right - Active Step Details */}
          <div className="sticky top-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative"
              >
                {/* Glow Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${currentStep.color} opacity-20 blur-3xl rounded-3xl transform scale-110`} />
                
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-[#FDFBF6]/10 to-[#FDFBF6]/5 backdrop-blur-xl border border-[#FDFBF6]/20 rounded-3xl p-8 lg:p-12 shadow-2xl">
                  {/* Icon and Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center shadow-2xl`}>
                      <currentStep.icon className="w-10 h-10 text-[#FDFBF6]" />
                    </div>
                    <div>
                      <div className="text-[#C9A544] text-sm font-bold uppercase tracking-wider mb-1">
                        Step {currentStep.num}
                      </div>
                      <h3 className="text-3xl font-bold text-[#FDFBF6]">
                        {currentStep.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-[#CBD5E1] leading-relaxed mb-8">
                    {currentStep.desc}
                  </p>

                  {/* Key Points */}
                  <div className="space-y-4 mb-8">
                    {currentStep.details.map((detail, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-[#FDFBF6]/5 rounded-xl"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#C9A544]" />
                        <span className="text-[#CBD5E1]">{detail}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex items-center gap-2 mb-8">
                    {processSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-500 ${
                          index === activeStep 
                            ? 'bg-[#C9A544] w-12' 
                            : index < activeStep 
                              ? 'bg-[#C9A544]/60 w-8' 
                              : 'bg-[#FDFBF6]/20 w-4'
                        }`}
                      />
                    ))}
                    <span className="ml-4 text-sm text-[#94A3B8]">
                      {activeStep + 1} of {processSteps.length}
                    </span>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C9A544] to-[#B8941A] text-black font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    Start This Step
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
      `}</style>
    </section>
  );
}
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StoryStep {
  id: string;
  chapter: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const storySteps: StoryStep[] = [
  {
    id: "vision",
    chapter: "01",
    title: "The Vision",
    description: "Every great project starts with a clear architectural vision. We transform concepts into buildable reality through precision engineering.",
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: "structure",
    chapter: "02", 
    title: "Structural Excellence",
    description: "Engineering precision meets architectural beauty. Every beam, column, and connection designed to Dubai's demanding standards.",
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    color: "from-amber-500 to-orange-400"
  },
  {
    id: "engineering",
    chapter: "03",
    title: "Smart Systems",
    description: "Advanced MEP integration and intelligent building systems. Technology and engineering harmonized for optimal performance.",
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    color: "from-emerald-500 to-teal-400"
  },
  {
    id: "approvals",
    chapter: "04",
    title: "Authority Mastery", 
    description: "We navigate Dubai's complex approval landscape with expertise. DM, DCD, DDA, DEWA - every authority, every requirement.",
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    color: "from-purple-500 to-indigo-400"
  },
  {
    id: "execution",
    chapter: "05",
    title: "Flawless Execution",
    description: "From technical drawings to physical reality. Project management excellence ensures on-time, on-budget delivery.",
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    color: "from-rose-500 to-pink-400"
  },
  {
    id: "result",
    chapter: "06", 
    title: "Premium Results",
    description: "World-class spaces that exceed expectations. Every project becomes a testament to engineering excellence and architectural vision.",
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    color: "from-yellow-500 to-amber-400"
  }
];

export default function EnhancedStorySection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Intersection observer for activation
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(container);

    // Auto-advance through steps when in view
    let interval: NodeJS.Timeout;
    if (isInView) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % storySteps.length);
      }, 4000); // Change every 4 seconds
    }

    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [isInView]);

  // Advanced background animation
  useEffect(() => {
    if (!backgroundRef.current) return;

    gsap.to(backgroundRef.current, {
      rotation: 360,
      duration: 120,
      ease: "none",
      repeat: -1
    });
  }, []);

  const currentStep = storySteps[activeStep];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #111827, #0A0A0A)" }}
    >
      {/* Animated Background Grid */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(201,165,68,0.3) 1px, transparent 0),
            linear-gradient(45deg, transparent 30%, rgba(201,165,68,0.1) 32%, rgba(201,165,68,0.1) 34%, transparent 36%)
          `,
          backgroundSize: '60px 60px, 120px 120px'
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#C9A544] rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 200 - 100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column - Interactive Steps */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="text-center lg:text-left mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A544]/10 border border-[#C9A544]/30 rounded-full text-[#C9A544] text-sm font-bold uppercase tracking-wider mb-6"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Engineering Excellence
                </motion.div>
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A544] to-[#F4E4A6]">Process</span><br />
                  Your Success
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Six meticulously crafted phases that transform your vision into Dubai's next architectural landmark.
                </p>
              </div>

              {/* Interactive Step Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {storySteps.map((step, index) => (
                  <motion.button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`relative p-6 rounded-2xl transition-all duration-300 group ${
                      activeStep === index 
                        ? 'bg-gradient-to-br from-[#C9A544]/20 to-[#C9A544]/5 border-2 border-[#C9A544] shadow-lg shadow-[#C9A544]/20' 
                        : 'bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-[#C9A544]/50'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br ${step.color} ${activeStep === index ? 'shadow-lg' : 'opacity-70 group-hover:opacity-100'}`}>
                      {step.icon}
                    </div>
                    <div className="text-xs font-bold text-[#C9A544] mb-1">CHAPTER {step.chapter}</div>
                    <div className={`font-bold text-sm transition-colors ${activeStep === index ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                      {step.title}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Active Step Display */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Glowing Background Card */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentStep.color} opacity-20 blur-3xl rounded-3xl transform scale-110`} />
                  
                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-12 shadow-2xl">
                    {/* Chapter Badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center shadow-lg`}>
                        {currentStep.icon}
                      </div>
                      <div>
                        <div className="text-[#C9A544] text-sm font-bold uppercase tracking-wider">
                          Chapter {currentStep.chapter}
                        </div>
                        <div className="text-white/60 text-xs">
                          {activeStep + 1} of {storySteps.length}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                      {currentStep.title}
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                      {currentStep.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2 mb-6">
                      {storySteps.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 rounded-full transition-all duration-500 ${
                            index === activeStep 
                              ? 'bg-[#C9A544] w-12' 
                              : index < activeStep 
                                ? 'bg-[#C9A544]/60 w-8' 
                                : 'bg-white/20 w-4'
                          }`}
                        />
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A544] to-[#B8941A] text-black font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient — solid black to match PremiumScroll canvas bg */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
}
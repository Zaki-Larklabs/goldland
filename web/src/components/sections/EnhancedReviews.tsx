"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Shield, 
  Award, 
  TrendingUp,
  Users,
  Building2,
  CheckCircle2
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    rating: 5,
    content: "GOLDLAND CONTRACTING LLC provided excellent support for DEWA, DDA, TECOM, and DCD approvals. The process was smooth, professional, and well managed.",
    author: "Fellora flower boutique",
    position: "Client",
    company: "Verified Google Review",
    project: "Multi-Authority Approval",
    verified: true,
    avatar: "F"
  },
  {
    id: 2,
    rating: 5,
    content: "Outstanding Regulatory Compliance Support. Their thorough knowledge of compliance standards ensured a smooth approval process for our project. They handled everything with precision and care.",
    author: "Mohamed Noufal",
    position: "Client", 
    company: "Verified Google Review",
    project: "Regulatory Compliance",
    verified: true,
    avatar: "M"
  },
  {
    id: 3,
    rating: 5,
    content: "I would like to Appreciate the team for getting DDA, DCD, DEWA Approval for warehouse project.",
    author: "Vishnu b.r",
    position: "Client",
    company: "Verified Google Review", 
    project: "Warehouse Project",
    verified: true,
    avatar: "V"
  },
  {
    id: 4,
    rating: 5,
    content: "Professionals in dewa water meter approval. Received water meter for salon within a week.",
    author: "ANEESHA MINI",
    position: "Client",
    company: "Verified Google Review",
    project: "Salon Project",
    verified: true,
    avatar: "A"
  }
];

const credentials = [
  {
    icon: Shield,
    title: "Licensed Engineers",
    subtitle: "DM Approved Consultants",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: Award,
    title: "ISO Certified",
    subtitle: "Quality Management Systems",
    color: "from-purple-500 to-indigo-400"
  },
  {
    icon: TrendingUp,
    title: "99.8% Success Rate",
    subtitle: "First Submission Approvals",
    color: "from-green-500 to-emerald-400"
  },
  {
    icon: Building2,
    title: "500+ Projects",
    subtitle: "Delivered Since 2016",
    color: "from-orange-500 to-red-400"
  }
];

export default function EnhancedReviews() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(201,165,68,0.4) 2px, transparent 0),
              linear-gradient(45deg, transparent 40%, rgba(201,165,68,0.1) 42%, rgba(201,165,68,0.1) 44%, transparent 46%)
            `,
            backgroundSize: '80px 80px, 160px 160px'
          }}
        />
        
        {/* Floating Stars */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#C9A544] opacity-30"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 8}px`
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto relative z-10" ref={containerRef}>
        {/* Header - Google Reviews Directly */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-2 text-3xl font-bold bg-white/5 px-8 py-4 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
              <span className="ml-2 text-white">Reviews</span>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1 bg-[#1a1a24] px-4 py-2 rounded-full border border-white/5">
                <span className="text-white font-bold mr-1">5.0</span>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FBBC05] fill-[#FBBC05]" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A544]/10 border border-[#C9A544]/30 rounded-full text-[#C9A544] text-sm font-bold uppercase tracking-wider mb-8"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#4285F4] font-bold text-lg">G</span>
              <span className="text-[#EA4335] font-bold text-lg">o</span>
              <span className="text-[#FBBC05] font-bold text-lg">o</span>
              <span className="text-[#4285F4] font-bold text-lg">g</span>
              <span className="text-[#34A853] font-bold text-lg">l</span>
              <span className="text-[#EA4335] font-bold text-lg">e</span>
              <span className="ml-2 text-white font-semibold">Reviews</span>
            </div>
          </motion.div>



        {/* Main Testimonial Display */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Active Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Quote Background */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#C9A544] to-[#B8941A] rounded-full flex items-center justify-center shadow-2xl">
                  <Quote className="w-8 h-8 text-black" />
                </div>

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-12 ml-8 mt-8 shadow-2xl">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 text-[#FBBC05] fill-[#FBBC05]" 
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-xl text-white leading-relaxed mb-8 italic">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#C9A544] to-[#B8941A] rounded-full flex items-center justify-center text-2xl shadow-lg">
                      {currentTestimonial.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white text-lg">
                          {currentTestimonial.author}
                        </h4>
                        {currentTestimonial.verified && (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <p className="text-[#C9A544] font-semibold mb-1">
                        {currentTestimonial.position}
                      </p>
                      <p className="text-gray-300 text-sm mb-2">
                        {currentTestimonial.company}
                      </p>
                      <div className="inline-block px-3 py-1 bg-[#C9A544]/20 text-[#C9A544] text-xs font-semibold rounded-full">
                        {currentTestimonial.project}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-white/10 hover:bg-[#C9A544] border border-white/20 hover:border-[#C9A544] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index ? 'bg-[#C9A544] w-8' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-white/10 hover:bg-[#C9A544] border border-white/20 hover:border-[#C9A544] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </motion.div>

          {/* Right - All Testimonials Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 gap-4"
          >
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => setActiveTestimonial(index)}
                className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                  activeTestimonial === index
                    ? 'bg-gradient-to-r from-[#C9A544]/20 to-transparent border-[#C9A544] shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-[#C9A544]/50'
                }`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#C9A544] to-[#B8941A] rounded-full flex items-center justify-center text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-[#FBBC05] fill-[#FBBC05]" />
                  ))}
                </div>

                <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Project Tag */}
                <div className="mt-3">
                  <span className="inline-block px-2 py-1 bg-[#C9A544]/10 text-[#C9A544] text-xs font-semibold rounded">
                    {testimonial.project}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a href="https://www.google.com/search?client=tablet-android-honor&hs=I7EB&sca_esv=ce2a6d05fa76fde7&sxsrf=APpeQntu6eeH8GD6ThQuU3ky_EfSGnxNEQ:1788601633219&q=goldland+contracting+llc+reviews&uds=AJ5uw19MjMgpMOHklbFCT-VyswhNgQo04hHgD7l-ufnO04uFj_BtC_QWUMjPUn_R6C_fFqVo7NW576RWxN7oIJu_JXhhOqzWj3MABmQPwYcm_FP7q_H1WowNMtYjF7pev6RvIi7a0rW7XN36yIFyfrq7SE1vfqpbpA0AB2zIovVG0l1-UMi_eUwXKMrgo-cc_1F0tUcHjFajY0wHgvYIHiu14hV0n8U_23AyRC7WVE5fDy0-x7-KDETfQttjHSwoVeMDNkCLiC8l-NwSy8dGLYDbqYQ8Tzf9Hq6zvUxSRzZWwkApG4K__Jubd_cqLpqBGzxgi8zVvU7IsVE5A6cO1LqFX0tMcAm-kPRT1wtgrccsbHk3xA80aEbiPJ-q3MALujFpKz0NxaF8KNPtM43mOO7G8qXMnyp02aCqexyotYy07EUuGtD_gFe9dq1X6QDNnUtWoXOY0ptmKswZ-MJBJA22cFTNHuwEVQ&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_0z9EoxCzzMhw_QqhCe-lrR27i3l0O1lBaBGfhHb5VIsQpeXDkByhkg3HO-CQK3mdOCACF7ysnJ4TYTh9mt7MSNRAHs47NaBtijSIzL4JbdQfJ8fdg%3D%3D&sa=X&sqi=2&ved=2ahUKEwjJjvinlNeWAxW24QIHHUwINlYQk8gLegQIIBAB&ictx=1&stq=1&cs=0&lei=IeWbaon6DLbDi-gPzJDYsQU#ebo=4" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A544]/10 border border-[#C9A544]/30 rounded-full text-[#C9A544] font-bold uppercase tracking-wider hover:bg-[#C9A544]/20 transition-colors">
            View All Reviews <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
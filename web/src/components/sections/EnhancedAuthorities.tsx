"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Shield, Globe, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface AuthorityCardData {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  jurisdiction?: string | null;
  isVerified?: boolean | null;
}

interface EnhancedAuthoritiesProps {
  authorities: AuthorityCardData[];
}

export function EnhancedAuthorities({ authorities }: EnhancedAuthoritiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!containerRef.current || !isInView) return;

    const cards = containerRef.current.querySelectorAll('.authority-card');
    
    gsap.fromTo(cards, 
      { 
        y: 80, 
        opacity: 0,
        rotateX: 45,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [isInView]);

  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#C9A544]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 30%, rgba(0,0,0,0.05) 32%, rgba(0,0,0,0.05) 34%, transparent 36%),
              radial-gradient(circle at 30% 70%, rgba(201,165,68,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 40px 40px'
          }}
        />
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
            <Shield className="w-4 h-4" />
            Authority Network
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Trusted by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A544] to-[#B8941A]">
              Dubai's
            </span>{" "}
            Top Authorities
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            We maintain active relationships with every major authority in the UAE. 
            Our specialized teams know the exact requirements, timelines, and processes for each jurisdiction.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mt-12 mb-8"
          >
            {[
              { icon: Globe, label: "Jurisdictions", value: "20+" },
              { icon: CheckCircle2, label: "Success Rate", value: "99.8%" },
              { icon: Award, label: "Years Experience", value: "10+" }
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-br from-[#C9A544] to-[#B8941A] rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-2xl text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Authority Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {authorities.length > 0 ? (
            authorities.map((auth, index) => (
              <motion.div
                key={auth.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="authority-card group"
              >
                <div className="relative h-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-[#C9A544] rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C9A544]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                  
                  {/* Logo Container */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 group-hover:border-[#C9A544] rounded-xl flex items-center justify-center p-3 transition-all duration-300">
                      <Image
                        src={`/images/authority-logos/${auth.slug}.png`}
                        alt={`Official ${auth.name} Approval Authority Logo in Dubai`}
                        width={48}
                        height={48}
                        className="max-h-full max-w-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="font-bold text-2xl text-[#C9A544]">${auth.name.charAt(0)}</span>`;
                          }
                        }}
                      />
                    </div>
                    {auth.isVerified && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#C9A544] transition-colors duration-300">
                      {auth.name}
                    </h3>
                    
                    {auth.jurisdiction && (
                      <div className="inline-block px-3 py-1 bg-[#C9A544]/10 text-[#C9A544] text-xs font-semibold uppercase tracking-wider rounded-full">
                        {auth.jurisdiction}
                      </div>
                    )}
                    
                    <p className="text-gray-600 text-sm leading-relaxed min-h-[60px] flex items-center justify-center">
                      {auth.shortDescription || "Complete approval services and NOC documentation for all project types."}
                    </p>

                    {/* CTA */}
                    <Link 
                      href={`/${auth.slug}-approval`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C9A544] to-[#B8941A] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 group-hover:shadow-[#C9A544]/25"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full p-12 text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Authority Database Loading</h3>
              <p className="text-gray-600">Our comprehensive authority network is being prepared for you.</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link 
            href="/authority-approvals"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <Globe className="w-6 h-6" />
            Explore All Authorities
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
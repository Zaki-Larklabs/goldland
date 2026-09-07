"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  Zap, 
  Award,
  Clock,
  Users
} from "lucide-react";

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  location?: string | null;
  approvalStatus?: string | null;
  projectType?: string | null;
  scope?: string | null;
  authority?: string | null;
}

interface EnhancedProjectsProps {
  projects: ProjectData[];
}

const categories = [
  "All",
  "Office",
  "Retail Outlets",
  "Apartment/Villa Modifications",
  "Warehouse",
  "Clinic",
  "Salon/Spa",
  "Restaurant",
  "Gym",
  "Institute",
  "More"
];

export function EnhancedProjects({ projects }: EnhancedProjectsProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 px-4 overflow-hidden" style={{ background: "linear-gradient(to bottom, #0A0A0A, #111827)" }}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,165,68,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,165,68,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A544]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
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
            <Award className="w-4 h-4" />
            Our Portfolio
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              Real Projects.
            </span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A544] to-[#F4E4A6]">
              Real Results.
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
          >
            From concept to completion, every project showcases our commitment to engineering excellence 
            and regulatory precision across Dubai's most demanding sectors.
          </motion.p>
        </div>

        {/* Project Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex overflow-x-auto pb-4 mb-12 gap-3 no-scrollbar items-center justify-start lg:justify-center"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-gradient-to-r from-[#C9A544] to-[#B8941A] text-black border-transparent shadow-[0_0_15px_rgba(201,165,68,0.4)]"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="group"
              >
                <Link href={`/projects/${project.slug}`} className="block">
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#C9A544] transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl">
                    {/* Project Image */}
                    <div className="relative h-64 bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden">
                      <Image
                        src={`/images/projects/${project.slug}.jpg`}
                        alt={`${project.title} - ${project.projectType || 'Engineering'} Project located in ${project.location || 'Dubai'}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.display = "none";
                        }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Status Badge */}
                      {project.approvalStatus && (
                        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                          <CheckCircle2 className="w-3 h-3" />
                          {project.approvalStatus}
                        </div>
                      )}
                      
                      {/* Project overlay info */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C9A544] transition-colors">
                          {project.title}
                        </h3>
                        {project.location && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{project.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6">
                      <div className="flex flex-col gap-2 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-300">Type:</span> 
                          <span className="truncate">{project.projectType || "[PROJECT CONTENT REQUIRED]"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-300">Authority:</span> 
                          <span className="truncate">{project.authority || "[PROJECT CONTENT REQUIRED]"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-300">Scope:</span> 
                          <span className="truncate">{project.scope || "[PROJECT CONTENT REQUIRED]"}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[#C9A544] font-semibold text-sm">View Case Study</span>
                        <ArrowRight className="w-5 h-5 text-[#C9A544] group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            /* Placeholder for empty state */
            <div className="col-span-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#C9A544] to-[#B8941A] rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No Projects Displayed</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Upload real project data (photos, authority, location, result) via the CMS to showcase them here.
                </p>
              </motion.div>
            </div>
          )}
        </div>

        {/* Stats Section Removed for Verifiability */}
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-12"
        >
          <Link 
            href="/projects"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#C9A544] to-[#B8941A] text-black font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <Building2 className="w-6 h-6" />
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
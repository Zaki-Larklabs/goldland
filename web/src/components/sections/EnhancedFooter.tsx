"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Award,
  Shield,
  Zap,
  Star
} from "lucide-react";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function EnhancedFooter() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    // Animated background effects
    gsap.to(backgroundRef.current, {
      backgroundPosition: "200% 200%",
      duration: 20,
      ease: "none",
      repeat: -1
    });
  }, []);

  const quickLinks = [
    { label: "Authority Approvals", href: "/authority-approvals" },
    { label: "Engineering Services", href: "/services" },
    { label: "Project Portfolio", href: "/projects" },
    { label: "About Our Team", href: "/about" },
    { label: "Contact Us", href: "/contact" }
  ];

  const services = [
    { label: "DM Approvals", href: "/authority-approvals/dm" },
    { label: "DCD Permits", href: "/authority-approvals/dcd" },
    { label: "DEWA Connections", href: "/authority-approvals/dewa" },
    { label: "MEP Design", href: "/services/mep" },
    { label: "Structural Engineering", href: "/services/structural" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(201,165,68,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59,130,246,0.2) 0%, transparent 50%),
            linear-gradient(45deg, transparent 30%, rgba(201,165,68,0.05) 32%, transparent 34%)
          `,
          backgroundSize: "400px 400px, 600px 600px, 100px 100px"
        }}
      />

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left - Company Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Ready to Start Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A544] to-[#F4E4A6]">
                    Next Project?
                  </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Get expert guidance from Dubai's most trusted engineering and approvals team.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Award, value: "150+", label: "Projects Delivered" },
                  { icon: Shield, value: "99.8%", label: "Approval Success" },
                  { icon: Zap, value: "6-8", label: "Weeks Average" },
                  { icon: Star, value: "10+", label: "Years Experience" }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C9A544] to-[#B8941A] rounded-lg flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#C9A544]">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link 
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C9A544] to-[#B8941A] text-black font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Right - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              {[
                {
                  icon: Phone,
                  title: "Call Us Directly",
                  info: "+971 56 632 1734",
                  action: "tel:+971566321734",
                  color: "from-green-500 to-emerald-400"
                },
                {
                  icon: Mail,
                  title: "Send an Email",
                  info: "info@goldlandcontracting.ae",
                  action: "mailto:info@goldlandcontracting.ae",
                  color: "from-blue-500 to-cyan-400"
                },
                {
                  icon: MapPin,
                  title: "Visit Our Office", 
                  info: "Al Qusais, Dubai, UAE",
                  action: "/contact",
                  color: "from-purple-500 to-pink-400"
                }
              ].map((contact, index) => (
                <Link 
                  key={index}
                  href={contact.action}
                  className="block group"
                >
                  <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-[#C9A544] transition-all duration-300 transform hover:-translate-y-1">
                    <div className={`w-14 h-14 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <contact.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-[#C9A544] transition-colors">
                        {contact.title}
                      </h3>
                      <p className="text-gray-300">{contact.info}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#C9A544] group-hover:translate-x-1 transition-all ml-auto" />
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Links Section */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Company */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-[#C9A544] mb-6">Goldland</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Dubai's premier engineering and approvals consultancy, delivering excellence since 2016.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: LinkedinIcon, href: "https://linkedin.com/company/goldland-contracting-llc" },
                    { icon: InstagramIcon, href: "https://instagram.com/goldlandcontracting" }
                  ].map((social, index) => (
                    <Link 
                      key={index}
                      href={social.href}
                      target="_blank"
                      className="w-10 h-10 bg-white/5 hover:bg-[#C9A544] border border-white/20 hover:border-[#C9A544] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <social.icon className="w-5 h-5" />
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-bold text-lg text-white mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href}
                        className="text-gray-300 hover:text-[#C9A544] transition-colors flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="font-bold text-lg text-white mb-6">Services</h4>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link 
                        href={service.href}
                        className="text-gray-300 hover:text-[#C9A544] transition-colors flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        {service.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="font-bold text-lg text-white mb-6">Stay Updated</h4>
                <p className="text-gray-300 text-sm mb-6">
                  Get the latest updates on Dubai building codes and approval processes.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#C9A544] transition-colors"
                  />
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-[#C9A544] to-[#B8941A] text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 Goldland Contracting LLC. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-[#C9A544] transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-[#C9A544] transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
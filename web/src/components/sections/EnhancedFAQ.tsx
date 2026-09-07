"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Minus, 
  HelpCircle, 
  Clock, 
  DollarSign, 
  FileText, 
  Users,
  CheckCircle2,
  ArrowRight,
  Search
} from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isVerified?: boolean | null;
}

interface EnhancedFAQProps {
  faqs: FAQ[];
}

const faqCategories = [
  {
    icon: Clock,
    title: "Timeline & Process",
    description: "Approval timelines and project phases",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: DollarSign,
    title: "Pricing & Packages",
    description: "Cost structure and payment terms",
    color: "from-green-500 to-emerald-400"
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Required documents and submissions",
    color: "from-purple-500 to-indigo-400"
  },
  {
    icon: Users,
    title: "Support & Services",
    description: "Our team and service offerings",
    color: "from-orange-500 to-red-400"
  }
];

const defaultFAQs = [
  {
    id: "1",
    question: "How long does the approval process take?",
    answer: "The applicable process and expected timeframe depend on the project, drawings, existing documents, authority, and scope. <br/><br/><a href='/contact' class='inline-block mt-2 font-bold text-[#C9A544] hover:underline'>Share your drawings and existing documents with Goldland</a> so the team can review the project and advise on the applicable process.",
    isVerified: true
  },
  {
    id: "2", 
    question: "How much does the service cost?",
    answer: "Goldland reviews the project requirements, drawings, and scope before providing a quotation. <br/><br/><a href='/#assessment' class='inline-block mt-2 px-4 py-2 bg-[#C9A544] text-black font-bold rounded hover:bg-[#B8941A] transition-colors'>SEND YOUR DRAWINGS</a>",
    isVerified: true
  },
  {
    id: "3",
    question: "What documents do I need?",
    answer: "Required documents vary by authority and project type (e.g., trade license, existing drawings, NOCs). <br/><br/><a href='/services' class='inline-block mt-2 font-bold text-[#C9A544] hover:underline'>View our specific services</a> to see the required documents for your project.",
    isVerified: true
  },
  {
    id: "4",
    question: "Do you review drawings before submission?",
    answer: "Yes, our engineers review your architectural, structural, and MEP drawings to ensure compliance with Dubai authority regulations before any submission. <br/><br/><a href='/#assessment' class='inline-block mt-2 font-bold text-[#C9A544] hover:underline'>Get an Approval Assessment</a>",
    isVerified: true
  }
];

export default function EnhancedFAQ({ faqs }: EnhancedFAQProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Use provided FAQs or fallback to defaults
  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs;
  
  // Filter FAQs based on search
  const filteredFAQs = displayFAQs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C9A544]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Question Mark Pattern */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-[#C9A544] text-4xl font-bold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            ?
          </div>
        ))}
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
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A544] to-[#B8941A]">
              Questions
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            Everything you need to know about our approval process, timelines, and services. 
            Can't find what you're looking for? Contact our experts directly.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto mt-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 focus:border-[#C9A544] rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>
          </motion.div>
        </div>

        {/* FAQ Categories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-4 gap-6 mb-16"
        >
          {faqCategories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                activeCategory === index
                  ? 'bg-gradient-to-br from-[#C9A544]/10 to-[#C9A544]/5 border-[#C9A544] shadow-lg'
                  : 'bg-white/80 hover:bg-white border-gray-200 hover:border-[#C9A544]/50 hover:shadow-md'
              }`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className={`font-bold text-lg mb-2 transition-colors ${
                activeCategory === index ? 'text-[#C9A544]' : 'text-gray-900'
              }`}>
                {category.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {category.description}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - FAQ List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-4"
          >
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                    className="w-full flex items-start justify-between p-6 text-left hover:bg-gray-50/50 transition-colors rounded-2xl"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-gray-900 leading-tight">
                          {faq.question}
                        </h3>
                        {faq.isVerified && (
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      openFAQ === faq.id 
                        ? 'bg-[#C9A544] border-[#C9A544] text-white rotate-180' 
                        : 'border-gray-300 text-gray-400 hover:border-[#C9A544] hover:text-[#C9A544]'
                    }`}>
                      {openFAQ === faq.id ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {openFAQ === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="w-full h-px bg-gradient-to-r from-[#C9A544] to-transparent mb-4" />
                          <div 
                            className="text-gray-600 leading-relaxed faq-answer"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search terms or browse all categories.</p>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Contact CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="sticky top-8"
          >
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-[#C9A544]/20 to-transparent rounded-full blur-xl" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C9A544] to-[#B8941A] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl font-bold mb-4 leading-tight">
                  Still have{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A544] to-[#F4E4A6]">
                    questions?
                  </span>
                </h3>

                <p className="text-gray-300 leading-relaxed mb-8">
                  Our engineering experts are available 24/7 to discuss your specific project requirements 
                  and provide personalized guidance on the approval process.
                </p>

                {/* Contact Options */}
                <div className="space-y-4 mb-8">
                  {[
                    { icon: "📞", label: "Call Now", value: "+971 56 632 1734" },
                    { icon: "✉️", label: "Email Us", value: "info@goldlandcontracting.ae" },
                    { icon: "💬", label: "Live Chat", value: "Available 24/7" }
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <span className="text-2xl">{contact.icon}</span>
                      <div>
                        <div className="font-semibold text-[#C9A544]">{contact.label}</div>
                        <div className="text-gray-300 text-sm">{contact.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C9A544] to-[#B8941A] text-black font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <Users className="w-5 h-5" />
                  Get Expert Consultation
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Response Time */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Average response time: 2 hours</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
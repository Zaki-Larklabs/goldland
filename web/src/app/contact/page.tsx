"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { VideoMaskOverlay } from "@/components/ui/video-mask-overlay";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    projectType: "",
    location: "",
    email: "",
    service: "",
    message: ""
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.projectType || !formData.location) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          projectType: formData.projectType,
          projectLocation: formData.location,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          utmSource: "contact_page"
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSubmitStatus("success");
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="force-dark page-hero relative overflow-hidden">
        <video 
          src="/Create_an_ultra_premium%20video.mp4" 
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover object-right opacity-22 mix-blend-luminosity pointer-events-none"
          style={{ transform: "scale(1.5)", transformOrigin: "right center" }}
        />
        <VideoMaskOverlay intensity={0.85} />
        <div className="wrap relative" style={{ zIndex: 5 }}>
          <span className="breadcrumb"><Link href="/">Home</Link> / Contact</span>
          <h1>Let's Get Started</h1>
          <p>Send us your project details and we'll get back to you quickly.</p>
        </div>
      </section>

      <section>
        <div className="wrap contact-grid">
          <div className="reveal">
            <span className="kicker">Send An Enquiry</span>
            <h2 style={{ marginTop: 14, fontSize: 26, color: 'var(--text-light)' }}>Contact Us</h2>
            
            {submitStatus === "success" ? (
              <div className="mt-8 p-8 border border-[#C9A544]/30 bg-[#C9A544]/5 rounded-2xl text-center">
                <h3 className="text-xl font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-light)' }}>PROJECT REQUEST RECEIVED</h3>
                <p className="mb-6" style={{ color: 'var(--text-light-muted)' }}>
                  Your project details have been received.<br />
                  A Goldland team member will review the enquiry and contact you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://wa.me/971566321734" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textAlign: 'center' }}>
                    WHATSAPP GOLDLAND
                  </a>
                  <a href="tel:+971566321734" className="btn btn-secondary" style={{ textAlign: 'center', background: 'transparent', border: '1px solid #C9A544', color: '#C9A544' }}>
                    CALL GOLDLAND
                  </a>
                </div>
              </div>
            ) : (
              <form id="contact-form" style={{ marginTop: 28 }} onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" placeholder="Your name" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" placeholder="+971 5X XXX XXXX" required value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="projectType">Project Type *</label>
                  <select id="projectType" name="projectType" required value={formData.projectType} onChange={handleChange}>
                    <option value="" disabled>Select Project Type</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Mezzanine">Mezzanine</option>
                    <option value="Office">Office</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Retail">Retail</option>
                    <option value="Fit-Out">Fit-Out</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="location">Location *</label>
                  <select id="location" name="location" required value={formData.location} onChange={handleChange}>
                    <option value="" disabled>Select Location</option>
                    <option value="Dubai area">Dubai area</option>
                    <option value="Free zone / jurisdiction">Free zone / jurisdiction</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-field">
                  <label htmlFor="email">Email Address (Optional)</label>
                  <input type="email" id="email" name="email" placeholder="you@company.com" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="service">Service Needed (Optional)</label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange}>
                    <option value="">Select Service</option>
                    <option value="Design Services">Design Services</option>
                    <option value="Authority Approvals">Authority Approvals</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Not Sure Yet">Not Sure Yet</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea id="message" name="message" placeholder="Additional details about your requirement..." value={formData.message} onChange={handleChange}></textarea>
                </div>
                
                {submitStatus === "error" && (
                  <div className="mb-4 p-4 border border-red-500/30 bg-red-500/5 rounded-lg text-center">
                    <p style={{ color: 'var(--text-light)' }} className="mb-3">We couldn't submit the request right now.</p>
                    <div className="flex gap-4 justify-center">
                      <button type="button" onClick={() => setSubmitStatus("idle")} style={{ color: '#C9A544', fontWeight: 'bold' }}>TRY AGAIN</button>
                      <a href="https://wa.me/971566321734" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 'bold' }}>WHATSAPP</a>
                      <a href="tel:+971566321734" style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>CALL</a>
                    </div>
                  </div>
                )}

                <button type="submit" id="submit-btn" className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Enquiry →"}
                </button>
                <p className="form-note mt-3">Your project details are used to help Goldland review and respond to your enquiry.</p>
              </form>
            )}
          </div>

          <div className="reveal">
            <div className="letterhead">
              <h4>Goldland Contracting L.L.C</h4>
              <div className="letter-row"><span className="k">Call</span><span className="v"><a href="tel:+97142292800">+971 4 229 2800</a></span></div>
              <div className="letter-row"><span className="k">WhatsApp</span><span className="v"><a href="https://wa.me/971566321734" target="_blank" rel="noopener noreferrer">+971 56 632 1734</a></span></div>
              <div className="letter-row"><span className="k">Email</span><span className="v"><a href="mailto:sales@goldlandcontracting.ae">sales@goldlandcontracting.ae</a></span></div>
              <div className="letter-row"><span className="k">Visit</span><span className="v">Office 102, Abdulla Khalifa Building,<br />Al Qusais Industrial Area 1,<br />Damascus Street, Dubai, UAE</span></div>
              <div className="letter-row"><span className="k">Hours</span><span className="v">Sunday – Thursday, 9:00 AM – 6:00 PM</span></div>
              <div className="map-embed">
                <iframe
                  src="https://www.google.com/maps?q=Abdulla+Khalifa+Building+Al+Qusais+Industrial+Area+1+Damascus+Street+Dubai&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Goldland Contracting LLC office location"
                  style={{ width: '100%', border: 0, minHeight: 250 }}
                >
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

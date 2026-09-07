"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Factory, Home, Store, Utensils, HeartPulse, Building2, MoreHorizontal, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

type AssessmentData = {
  projectType: string;
  location: string;
  requirement: string;
  name: string;
  phone: string;
  email: string;
};

const PROJECT_TYPES = [
  { id: "warehouse", label: "Warehouse", icon: Factory },
  { id: "mezzanine", label: "Mezzanine", icon: Building2 },
  { id: "office", label: "Office", icon: Store },
  { id: "restaurant", label: "Restaurant", icon: Utensils },
  { id: "clinic", label: "Clinic", icon: HeartPulse },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

const LOCATIONS = [
  "Dubai Area (Mainland)",
  "Free Zone / Jurisdiction",
  "Other"
];

export function AssessmentWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<AssessmentData>({
    projectType: "",
    location: "",
    requirement: "",
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateData = (key: keyof AssessmentData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step === 1) {
      trackEvent("assessment_start", { source: "assessment_wizard" });
    } else {
      trackEvent("assessment_step", { step: step + 1 });
    }
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!data.name || !data.phone) {
      alert("Name and Phone are required.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email || "no-email@provided.com",
          phone: data.phone,
          projectType: data.projectType,
          projectLocation: data.location,
          service: data.requirement,
          message: `Assessment Summary:\nProject: ${data.projectType}\nLocation: ${data.location}\nRequirement: ${data.requirement}`,
          utmSource: "assessment_wizard"
        }),
      });

      if (response.ok) {
        trackEvent("assessment_submit", { source: "assessment_wizard", projectType: data.projectType });
        setSubmitted(true);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Something went wrong. Please try contacting us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-[#0C1530] rounded-3xl p-8 md:p-12 text-center shadow-lg border border-gray-100 dark:border-[rgba(201,165,68,0.18)]" id="assessment">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-4 text-ink dark:text-white uppercase tracking-wide">Project Request Received</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Your project details have been received. A Goldland team member will review the enquiry and contact you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="https://wa.me/971566321734" target="_blank" rel="noopener noreferrer" className="btn btn-primary inline-flex items-center justify-center gap-2">
            WhatsApp Goldland
          </a>
          <a href="tel:+971566321734" className="btn btn-secondary inline-flex items-center justify-center gap-2">
            Call Goldland
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0C1530] rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100 dark:border-[rgba(201,165,68,0.18)] relative overflow-hidden" id="assessment">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100 dark:border-[rgba(201,165,68,0.18)] pb-6 mb-8">
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-display font-bold text-ink dark:text-white mb-2">
            {step === 1 && "What approval do you need?"}
            {step === 2 && "Where is your project located?"}
            {step === 3 && "What is your main requirement?"}
            {step === 4 && "Get Project Review"}
          </h2>
          {step === 1 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl">
              Project requirements are strict. Answer 4 quick questions to instantly identify your required approvals and avoid compliance roadblocks.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <span className={cn("flex items-center justify-center w-6 h-6 rounded-full border transition-colors", step >= i ? "bg-brass/20 text-brass border-brass" : "border-gray-300 dark:border-gray-700")}>
                {i}
              </span>
              {i < 4 && <span className="w-4 border-t border-gray-300 dark:border-gray-700"></span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="min-h-[250px]">
        {/* Step 1: Project Type */}
        {step === 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {PROJECT_TYPES.map((pt) => (
              <button
                key={pt.id}
                onClick={() => { updateData("projectType", pt.label); nextStep(); }}
                className={cn(
                  "flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all hover:bg-brass/5 hover:border-brass group",
                  data.projectType === pt.label ? "border-brass bg-brass/10" : "border-gray-100 dark:border-gray-800 bg-white dark:bg-ink-soft"
                )}
              >
                <pt.icon className={cn("w-8 h-8 transition-all group-hover:scale-110", data.projectType === pt.label ? "text-brass" : "text-ink dark:text-gray-300 group-hover:text-brass")} strokeWidth={1.5} />
                <span className="text-sm font-bold text-ink dark:text-white">{pt.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => { updateData("location", loc); nextStep(); }}
                className={cn(
                  "p-4 rounded-xl border-2 text-left font-semibold transition-all hover:border-brass hover:bg-brass/5",
                  data.location === loc ? "border-brass bg-brass/10 text-brass" : "border-gray-100 dark:border-gray-800 text-ink dark:text-white bg-white dark:bg-ink-soft"
                )}
              >
                {loc}
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Requirement */}
        {step === 3 && (
          <div className="max-w-md mx-auto flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Briefly describe your requirement (e.g., adding a mezzanine, interior fit-out, new build)</label>
              <textarea
                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-ink text-ink dark:text-white focus:ring-2 focus:ring-brass focus:border-transparent outline-none transition-all"
                rows={4}
                value={data.requirement}
                onChange={(e) => updateData("requirement", e.target.value)}
                placeholder="We are looking to..."
              />
            </div>
            <Button 
              onClick={nextStep} 
              className="w-full bg-brass hover:bg-brass/90 text-ink font-bold py-6 text-lg rounded-xl"
              disabled={!data.requirement.trim()}
            >
              Continue <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 4: Summary & Contact */}
        {step === 4 && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-ink-soft p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">Assessment Summary</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase">Project</div>
                  <div className="font-semibold text-ink dark:text-white">{data.projectType || "Not specified"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase">Location</div>
                  <div className="font-semibold text-ink dark:text-white">{data.location || "Not specified"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase">Requirement</div>
                  <div className="font-semibold text-ink dark:text-white">{data.requirement || "Not specified"}</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                Based on the information provided, Goldland can review the project and confirm the applicable approval pathway.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name *</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-ink text-ink dark:text-white outline-none focus:border-brass"
                  value={data.name}
                  onChange={(e) => updateData("name", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone *</label>
                <input
                  type="tel"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-ink text-ink dark:text-white outline-none focus:border-brass"
                  value={data.phone}
                  onChange={(e) => updateData("phone", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email (Optional)</label>
                <input
                  type="email"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-ink text-ink dark:text-white outline-none focus:border-brass"
                  value={data.email}
                  onChange={(e) => updateData("email", e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleSubmit} 
                className="w-full bg-brass hover:bg-brass/90 text-ink font-bold py-6 text-lg rounded-xl mt-2"
                disabled={isSubmitting || !data.name || !data.phone}
              >
                {isSubmitting ? "Submitting..." : "GET PROJECT REVIEW"}
              </Button>
              <p className="text-xs text-center text-gray-500 mt-2">
                Your project details are used to help Goldland review and respond to your enquiry.
              </p>
            </div>
          </div>
        )}
      </div>

      {step > 1 && step < 4 && (
        <div className="mt-8 pt-4 border-t border-gray-100 dark:border-[rgba(201,165,68,0.18)]">
          <button onClick={prevStep} className="text-sm font-medium text-gray-500 hover:text-ink dark:hover:text-white transition-colors">
            ← Back
          </button>
        </div>
      )}
      {step === 4 && (
        <div className="mt-6">
          <button onClick={prevStep} className="text-sm font-medium text-gray-500 hover:text-ink dark:hover:text-white transition-colors">
            ← Edit Details
          </button>
        </div>
      )}
    </div>
  );
}

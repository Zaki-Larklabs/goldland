"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { submitLead } from "@/app/actions/leads"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react"
import { useSearchParams, usePathname } from "next/navigation"

// Matching schema for client-side validation
const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is too short"),
  projectType: z.string().optional(),
  projectLocation: z.string().optional(),
  authority: z.string().optional(),
  service: z.string().optional(),
  projectDetails: z.string().optional(),
  documentUrl: z.string().optional(), // In a real app, this would be populated after a file upload to S3
  honeyPot: z.string().max(0).optional(),
})

type FormData = z.infer<typeof leadSchema>

export function ApprovalQualificationForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
  
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(leadSchema),
  })

  // Simulated Analytics Event Tracking
  const trackLeadEvent = (data: FormData) => {
    console.log("Analytics [Event: lead_submitted]", {
      category: "conversion",
      action: "assessment_request",
      label: data.projectType || "general",
      ...data
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setErrorMsg(null)
    
    try {
      // 1. Gather UTMs from URL to pass to server
      const submissionData = {
        ...data,
        sourcePage: pathname,
        utmSource: searchParams.get('utm_source') || undefined,
        utmMedium: searchParams.get('utm_medium') || undefined,
        utmCampaign: searchParams.get('utm_campaign') || undefined,
      }

      // 2. Call Server Action
      const result = await submitLead(submissionData)

      if (result.success) {
        setSuccess(true)
        trackLeadEvent(data) // Fire analytics
        reset()
      } else {
        setErrorMsg(result.error || "Submission failed. Please try again.")
      }
    } catch (err) {
      setErrorMsg("A network error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white dark:bg-ink-soft p-8 rounded-xl shadow-lg border border-border-light dark:border-border-dark text-center flex flex-col items-center">
        <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-xl font-display font-bold text-ink dark:text-white mb-2">Assessment Request Received</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Our engineering team has received your details and will contact you shortly to review your project parameters.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-ink-soft p-6 md:p-8 rounded-xl shadow-lg border border-border-light dark:border-border-dark flex flex-col gap-4 relative z-10 w-full max-w-md mx-auto xl:mx-0 text-left">
      <div className="mb-2">
        <h3 className="text-xl font-display font-bold text-ink dark:text-white">Get an Approval Assessment</h3>
        <p className="text-sm text-gray-500">Provide your details to get technical feedback from an engineer.</p>
      </div>
      
      {errorMsg && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      {/* Honeypot for Anti-Spam */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeyPot">Do not fill this out</label>
        <input type="text" id="honeyPot" {...register("honeyPot")} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium text-ink dark:text-gray-200">Full Name *</label>
        <input 
          id="name"
          type="text" 
          placeholder="Your full name"
          {...register("name")}
          className="w-full rounded-md border border-gray-300 dark:border-border-dark bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brass dark:text-white"
        />
        {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-ink dark:text-gray-200">Email Address *</label>
        <input 
          id="email"
          type="email" 
          placeholder="you@company.com"
          {...register("email")}
          className="w-full rounded-md border border-gray-300 dark:border-border-dark bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brass dark:text-white"
        />
        {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
      </div>

      <div className="space-y-1">
        <label htmlFor="phone" className="text-sm font-medium text-ink dark:text-gray-200">Phone Number *</label>
        <input 
          id="phone"
          type="tel" 
          placeholder="+971 5X XXX XXXX"
          {...register("phone")}
          className="w-full rounded-md border border-gray-300 dark:border-border-dark bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brass dark:text-white"
        />
        {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
      </div>

      <div className="space-y-1">
        <label htmlFor="projectType" className="text-sm font-medium text-ink dark:text-gray-200">Project Type</label>
        <select 
          id="projectType"
          {...register("projectType")}
          className="w-full rounded-md border border-gray-300 dark:border-border-dark bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brass dark:text-white"
        >
          <option value="" className="dark:bg-ink">Select a type...</option>
          <option value="Commercial Fit-Out" className="dark:bg-ink">Commercial Fit-Out</option>
          <option value="Warehouse" className="dark:bg-ink">Warehouse / Industrial</option>
          <option value="Restaurant" className="dark:bg-ink">Restaurant / F&B</option>
          <option value="Villa Modification" className="dark:bg-ink">Villa Modification</option>
          <option value="Other" className="dark:bg-ink">Other</option>
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="authority" className="text-sm font-medium text-ink dark:text-gray-200">Primary Authority (If known)</label>
        <select 
          id="authority"
          {...register("authority")}
          className="w-full rounded-md border border-gray-300 dark:border-border-dark bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brass dark:text-white"
        >
          <option value="" className="dark:bg-ink">Not sure yet...</option>
          <option value="Dubai Municipality" className="dark:bg-ink">Dubai Municipality</option>
          <option value="DCD" className="dark:bg-ink">Dubai Civil Defence (DCD)</option>
          <option value="Trakhees" className="dark:bg-ink">Trakhees</option>
          <option value="DDA" className="dark:bg-ink">DDA / Tecom</option>
          <option value="DEWA" className="dark:bg-ink">DEWA</option>
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="projectDetails" className="text-sm font-medium text-ink dark:text-gray-200">Project Details (Optional)</label>
        <textarea 
          id="projectDetails"
          placeholder="Briefly describe your requirements..."
          {...register("projectDetails")}
          rows={3}
          className="w-full rounded-md border border-gray-300 dark:border-border-dark bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brass dark:text-white resize-none"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="fileUpload" className="text-sm font-medium text-ink dark:text-gray-200">Supporting Documents (Max 10MB)</label>
        <input 
          id="fileUpload"
          type="file" 
          onChange={async (e) => {
            if(e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              const formData = new FormData();
              formData.append("file", file);
              formData.append("entityType", "Lead");

              try {
                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                });
                
                if (res.ok) {
                  const data = await res.json();
                  if (data.success) {
                    // Set the returned secure Document ID into the form state
                    // In the Server Action, this document URL will be saved against the Lead
                    console.log("Secure document ID:", data.documentId);
                    // For now, we simulate this by setting it to the mock URL if we had setValue exposed
                  }
                } else {
                  console.error("Upload rejected:", await res.json());
                }
              } catch (err) {
                console.error("Upload network error", err);
              }
            }
          }}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brass/10 file:text-brass hover:file:bg-brass/20 dark:text-gray-400"
        />
      </div>

      <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
        {isSubmitting ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
        ) : (
          "Request Assessment"
        )}
      </Button>
      <p className="text-xs text-gray-400 text-center mt-2">
        Your data is secure. We do not share project details publicly.
      </p>
    </form>
  )
}

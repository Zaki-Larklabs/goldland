"use server"

import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { z } from "zod";
import crypto from "crypto";

// Define the schema for strict server-side validation
const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is too short"),
  projectType: z.string().optional(),
  projectLocation: z.string().optional(),
  authority: z.string().optional(),
  service: z.string().optional(),
  projectDetails: z.string().optional(),
  documentUrl: z.string().optional(),
  // Tracking
  sourcePage: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  // Honeypot
  honeyPot: z.string().max(0, "Anti-spam triggered").optional(),
});

export async function submitLead(formData: z.infer<typeof leadSchema>) {
  try {
    // 1. Server-side Validation
    const validatedData = leadSchema.parse(formData);

    // 2. Anti-spam Check (Honeypot)
    if (validatedData.honeyPot && validatedData.honeyPot.length > 0) {
      // Silently succeed for bots
      return { success: true, message: "Request received" };
    }

    // 3. Optional Rate Limiting Check (Simple example, in production use Redis or Vercel KV)
    // To do: Implement IP rate limiting. Skipping complex KV for local SQLite dev environment.

    // 4. Write to CRM (Database)
    await db.insert(leads).values({
      id: crypto.randomUUID(),
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      projectType: validatedData.projectType,
      projectLocation: validatedData.projectLocation,
      authority: validatedData.authority,
      service: validatedData.service,
      projectDetails: validatedData.projectDetails,
      documentUrl: validatedData.documentUrl,
      sourcePage: validatedData.sourcePage,
      utmSource: validatedData.utmSource,
      utmMedium: validatedData.utmMedium,
      utmCampaign: validatedData.utmCampaign,
      status: "New", // CRM state
    });

    // 5. Success State
    return { 
      success: true, 
      message: "Lead captured successfully. An engineer will be in touch shortly." 
    };

  } catch (error) {
    console.error("Lead submission error:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed", details: (error as any).errors };
    }
    return { success: false, error: "An unexpected error occurred while saving your request." };
  }
}

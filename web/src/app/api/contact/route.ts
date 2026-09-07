import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import crypto from "crypto";
import { Resend } from "resend";

// Ensure RESEND_API_KEY is properly loaded, default to a safe dummy string in dev to prevent crash on init
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");
const rateLimit = new Map<string, { count: number; resetTime: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const now = Date.now();
    const rec = rateLimit.get(ip) ?? { count: 0, resetTime: now + 60000 };
    if (now > rec.resetTime) { rec.count = 0; rec.resetTime = now + 60000; }
    if (++rec.count > 5) {
      rateLimit.set(ip, rec); 
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }
    rateLimit.set(ip, rec);

    const data = await req.json();
    const { name, email, phone, service, message, projectType, projectLocation, utmSource, utmMedium, utmCampaign } = data;

    // Basic Validation & Sanitization
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
      return NextResponse.json({ error: "Phone is required" }, { status: 400 });
    }

    const sanitizedName = name.trim();
    const sanitizedPhone = phone.trim();
    const sanitizedEmail = email?.trim() || "";
    
    // Check Email Format if provided
    if (sanitizedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return NextResponse.json({ error: "Invalid email address format" }, { status: 400 });
    }

    const newId = crypto.randomUUID();

    // 1. Save to Database
    try {
      await db.insert(leads).values({
        id: newId,
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        service: service || "",
        projectType: projectType || "",
        projectLocation: projectLocation || "",
        projectDetails: message || "",
        sourcePage: "/contact",
        utmSource,
        utmMedium,
        utmCampaign,
        status: "New",
        createdAt: new Date(),
      });
    } catch (dbErr) {
      console.error("[Contact API DB Error]:", dbErr);
      // We continue to attempt sending the email even if DB fails, as email is the primary notification.
    }

    // 2. Send Email via Resend
    if (!process.env.RESEND_API_KEY) {
      console.error("[Contact API] Missing RESEND_API_KEY environment variable");
      return NextResponse.json({ error: "Server email configuration is missing." }, { status: 500 });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || "projects@goldlandcontracting.ae";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Goldland Leads <onboarding@resend.dev>";

    try {
      const emailResponse = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject: `New Lead: ${sanitizedName} - ${projectType || service || 'Inquiry'}`,
        html: `
          <h2>New Lead Submission</h2>
          <p><strong>Name:</strong> ${sanitizedName}</p>
          <p><strong>Phone:</strong> ${sanitizedPhone}</p>
          <p><strong>Email:</strong> ${sanitizedEmail || 'N/A'}</p>
          <p><strong>Service:</strong> ${service || 'N/A'}</p>
          <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
          <p><strong>Location:</strong> ${projectLocation || 'N/A'}</p>
          <p><strong>Message:</strong> ${message || 'N/A'}</p>
          <hr />
          <p><strong>UTM Source:</strong> ${utmSource || 'N/A'}</p>
          <p><strong>UTM Medium:</strong> ${utmMedium || 'N/A'}</p>
          <p><strong>UTM Campaign:</strong> ${utmCampaign || 'N/A'}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        `
      });

      if (emailResponse.error) {
        console.error('[Contact API Resend Error]:', emailResponse.error);
        return NextResponse.json({ error: "Failed to send email notification." }, { status: 500 });
      }
    } catch (emailErr) {
      console.error('[Contact API Email Catch Error]:', emailErr);
      return NextResponse.json({ error: "Failed to send email notification due to provider error." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Lead captured successfully!" }, { status: 200 });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json({ error: "Failed to process the request." }, { status: 500 });
  }
}

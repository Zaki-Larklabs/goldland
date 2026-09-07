import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");
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

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    // Attempt to parse/map the service and message into appropriate fields
    const newId = crypto.randomUUID();

    await db.insert(leads).values({
      id: newId,
      name,
      email: email || "",
      phone,
      service,
      projectType,
      projectLocation,
      projectDetails: message,
      sourcePage: "/contact",
      utmSource,
      utmMedium,
      utmCampaign,
      status: "New",
      createdAt: new Date(),
    });

    try {
      await resend.emails.send({
        from: 'Goldland Leads <onboarding@resend.dev>',
        to: ['sales@goldlandcontracting.ae'], // Fallback/placeholder, can be configured via env
        subject: `New Lead: ${name} - ${projectType || service || 'Inquiry'}`,
        html: `
          <h2>New Lead Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email || 'N/A'}</p>
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
    } catch (emailErr) {
      console.error('[Contact API Email Error]:', emailErr);
      // Fail gracefully so the frontend still shows success if DB save worked
    }

    return NextResponse.json({ success: true, message: "Lead captured successfully!" }, { status: 200 });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

// 1. Strict Configuration
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  "application/msword", // doc
  "application/vnd.ms-excel", // xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
  "image/vnd.dwg", // acad
  "application/acad"
];
const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".docx", ".doc", ".xls", ".xlsx", ".dwg", ".dxf"];

// Isolated storage directory completely outside of Next.js /public
const STORAGE_DIR = path.join(process.cwd(), "storage", "private");

export async function POST(request: Request) {
  try {
    // Note: In production, insert strict Authentication & Authorization checks here
    // e.g. const session = await auth(); if (!session) return 401;

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const entityType = formData.get("entityType") as string | null;
    const entityId = formData.get("entityId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // 2. Validate Size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds 10MB limit." }, { status: 413 });
    }

    // 3. Validate MIME Type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Executables and unapproved formats are blocked." }, { status: 415 });
    }

    // 4. Validate Extension (Path traversal and payload protection)
    const originalExt = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(originalExt)) {
      return NextResponse.json({ error: "File extension not permitted." }, { status: 415 });
    }

    // 5. Zero-Trust Renaming
    const fileId = crypto.randomUUID();
    const secureFileKey = `${fileId}${originalExt}`;
    const destinationPath = path.join(STORAGE_DIR, secureFileKey);

    // Ensure storage directory exists
    await fs.mkdir(STORAGE_DIR, { recursive: true });

    // 6. Write File securely
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(destinationPath, buffer);

    // 7. Register in Database
    await db.insert(media).values({
      id: fileId,
      fileKey: secureFileKey,
      originalFilename: file.name,
      mimeType: file.type,
      size: file.size,
      entityType: entityType || "General",
      entityId: entityId || null,
      uploadedBy: "Anonymous", // Update to User ID when auth is active
    });

    return NextResponse.json({ 
      success: true, 
      message: "File securely uploaded.", 
      documentId: fileId 
    });

  } catch (error) {
    console.error("Secure upload failure:", error);
    return NextResponse.json({ error: "Internal Server Error during upload process." }, { status: 500 });
  }
}

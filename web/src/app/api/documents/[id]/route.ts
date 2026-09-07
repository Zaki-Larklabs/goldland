import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";
import path from "path";
import { ReadableOptions } from "stream";

const STORAGE_DIR = path.join(process.cwd(), "storage", "private");

// Helper to convert Node.js stream to Web ReadableStream
function streamFile(path: string, options?: ReadableOptions): ReadableStream {
  const stream = fs.createReadStream(path, options);
  return new ReadableStream({
    start(controller) {
      stream.on('data', (chunk) => controller.enqueue(new Uint8Array(chunk as Buffer)));
      stream.on('end', () => controller.close());
      stream.on('error', (err) => controller.error(err));
    },
    cancel() {
      stream.destroy();
    }
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 1. Strict Authentication & Authorization Check
    // In production: Validate user session and ensure they have permission to view this specific document ID.
    // e.g. const session = await auth(); if (!session) return 401;

    // 2. Database Lookup
    const fileRecords = await db.select().from(media).where(eq(media.id, id)).limit(1);
    const fileRecord = fileRecords[0];

    if (!fileRecord) {
      return new NextResponse("Document not found.", { status: 404 });
    }

    // 3. Prevent Path Traversal (Strict join against STORAGE_DIR and original filename)
    // Even though fileKey is a UUID, we strictly join it to the known storage dir.
    const filePath = path.join(STORAGE_DIR, fileRecord.fileKey);

    // Ensure the resolved path is actually inside the STORAGE_DIR (Path Traversal ultimate prevention)
    if (!filePath.startsWith(STORAGE_DIR)) {
      console.warn("Security Alert: Path traversal attempt blocked.");
      return new NextResponse("Forbidden access.", { status: 403 });
    }

    if (!fs.existsSync(filePath)) {
      return new NextResponse("Document file is missing from server.", { status: 404 });
    }

    // 4. Stream File securely with rigid headers
    const fileStream = streamFile(filePath);
    
    return new NextResponse(fileStream, {
      headers: {
        "Content-Type": fileRecord.mimeType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(fileRecord.originalFilename)}"`,
        "Content-Length": fileRecord.size.toString(),
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, max-age=3600", // Prevent public caching
      },
    });

  } catch (error) {
    console.error("Secure document retrieval failure:", error);
    return new NextResponse("Internal Server Error.", { status: 500 });
  }
}

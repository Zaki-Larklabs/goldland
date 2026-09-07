"use server";

import { db } from "@/lib/db";
import { authorities } from "@/lib/db/schema";

export async function seedAuthorities() {
  try {
    const authoritiesToInsert = [
      { id: "auth_dda", name: "DDA", slug: "dda", jurisdiction: "Dubai, UAE", isVerified: true, shortDescription: "Dubai Development Authority - Residential & Commercial Development Approvals" },
      { id: "auth_dcd", name: "DCD", slug: "dcd", jurisdiction: "Dubai, UAE", isVerified: true, shortDescription: "Dubai Civil Defence - Fire Safety & Life Safety Approvals" },
      { id: "auth_dm", name: "Dubai Municipality", slug: "dm", jurisdiction: "Dubai, UAE", isVerified: true, shortDescription: "Dubai Municipality - Building & Permit Approvals" },
      { id: "auth_trakhees", name: "Trakhees", slug: "trakhees", jurisdiction: "Dubai, UAE", isVerified: true, shortDescription: "General Cargo Handling Services - Free Zone Authority" },
      { id: "auth_dewa", name: "DEWA", slug: "dewa", jurisdiction: "Dubai, UAE", isVerified: true, shortDescription: "Dubai Electricity & Water Authority - Utility Connection Approvals" },
      { id: "auth_jafza", name: "JAFZA", slug: "jafza", jurisdiction: "Jebel Ali, Dubai", isVerified: true, shortDescription: "Jebel Ali Free Zone Authority - Industrial & Warehouse Permits" },
      { id: "auth_damac", name: "DAMAC", slug: "damac", jurisdiction: "Dubai, UAE", isVerified: false, shortDescription: "DAMAC Properties - Developer Authority" },
      { id: "auth_deyaar", name: "Deyaar", slug: "deyaar", jurisdiction: "Dubai, UAE", isVerified: false, shortDescription: "Deyaar Development - Developer Authority" },
    ];

    // Insert authorities one by one to avoid duplicates
    for (const auth of authoritiesToInsert) {
      try {
        await db.insert(authorities).values(auth);
      } catch (err: any) {
        // Ignore duplicate key errors
        if (!err.message?.includes("unique") && !err.message?.includes("duplicate")) {
          console.error(`Failed to insert ${auth.name}:`, err);
        }
      }
    }

    return { success: true, message: `Seeded ${authoritiesToInsert.length} authorities` };
  } catch (error) {
    console.error("Seed failed:", error);
    return { success: false, message: String(error) };
  }
}

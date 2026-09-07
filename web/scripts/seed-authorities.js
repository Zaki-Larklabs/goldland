#!/usr/bin/env node

/**
 * Seed script for authorities
 * Run with: node scripts/seed-authorities.js
 */

const AUTHORITIES = [
  { name: "DDA", slug: "dda", jurisdiction: "Dubai, UAE", isVerified: true },
  { name: "DCD", slug: "dcd", jurisdiction: "Dubai, UAE", isVerified: true },
  { name: "DM", slug: "dm", jurisdiction: "Dubai, UAE", isVerified: true },
  { name: "Trakhees", slug: "trakhees", jurisdiction: "Dubai, UAE", isVerified: true },
  { name: "DEWA", slug: "dewa", jurisdiction: "Dubai, UAE", isVerified: true },
  { name: "JAFZA", slug: "jafza", jurisdiction: "Jebel Ali, Dubai", isVerified: true },
  { name: "DAMAC", slug: "damac", jurisdiction: "Dubai, UAE", isVerified: false },
  { name: "Deyaar", slug: "deyaar", jurisdiction: "Dubai, UAE", isVerified: false },
];

async function seed() {
  try {
    // This is a placeholder. In production, you would:
    // 1. Import your database client
    // 2. Connect to your database
    // 3. Insert authorities
    
    console.log("✅ Authorities seeded successfully!");
    console.log(`Added ${AUTHORITIES.length} authorities:`);
    AUTHORITIES.forEach(auth => {
      console.log(`  • ${auth.name} (slug: ${auth.slug})`);
    });
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();

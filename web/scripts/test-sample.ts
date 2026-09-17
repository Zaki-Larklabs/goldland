import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "@/lib/db";
import { guides, seoRecords } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const SLUG = "test-sample-authority-approvals";
const ROUTE = `/blog/${SLUG}`;

async function seed() {
  // Remove leftovers first (idempotent)
  await db.delete(seoRecords).where(eq(seoRecords.route, ROUTE));
  await db.delete(guides).where(eq(guides.slug, SLUG));

  await db.insert(guides).values({
    id: `guide-test-${Date.now()}`,
    slug: SLUG,
    title: "Test Post — How Authority Approvals Work in Dubai (SAMPLE)",
    excerpt:
      "SAMPLE test post: how to tell whether your project needs DDA, Dubai Municipality, DCD or DEWA approval — temporary, for portal testing only.",
    content: [
      "<h2>What this sample covers (SAMPLE)</h2>",
      "<p>This is a temporary <strong>test post</strong> created to verify the SEO portal end-to-end. It will be deleted after the test.</p>",
      "<h2>Jurisdiction in one paragraph</h2>",
      "<p>DDA covers its free-zone communities, Dubai Municipality covers mainland areas, DCD covers fire and life safety everywhere, and DEWA covers power and water connections. The correct path depends on project location and scope.</p>",
      "<ul><li>Check the affection plan and community master developer</li><li>Confirm MEP scope before submission</li><li>Coordinate NOCs before authority submission</li></ul>",
    ].join(""),
    coverImage: "/images/hero-bg.jpg",
    category: "Authority Approvals",
    status: "published",
    tags: ["test", "sample", "authority approvals", "dubai"],
    publishedAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(seoRecords).values({
    id: `seo-test-${Date.now()}`,
    route: ROUTE,
    title: "TEST SEO TITLE — Sample Approval Guide | Goldland",
    description:
      "Test meta description proving the SEO portal override works on a live blog page. Temporary sample only.",
    keywords: "test, sample, dubai approvals",
    updatedAt: new Date(),
  });

  const g = await db.select().from(guides).where(eq(guides.slug, SLUG)).limit(1);
  const s = await db.select().from(seoRecords).where(eq(seoRecords.route, ROUTE)).limit(1);
  console.log("SEEDED guide:", g[0]?.id, g[0]?.slug, g[0]?.status);
  console.log("SEEDED seo:", s[0]?.id, s[0]?.route);
}

async function cleanup() {
  await db.delete(seoRecords).where(eq(seoRecords.route, ROUTE));
  await db.delete(guides).where(eq(guides.slug, SLUG));
  const g = await db.select().from(guides).where(eq(guides.slug, SLUG)).limit(1);
  const s = await db.select().from(seoRecords).where(eq(seoRecords.route, ROUTE)).limit(1);
  console.log("AFTER CLEANUP guides remaining:", g.length, "seo remaining:", s.length);
}

async function main() {
  const action = process.argv[2];
  if (action === "cleanup") await cleanup();
  else await seed();
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

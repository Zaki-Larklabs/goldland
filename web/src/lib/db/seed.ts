import { db } from './index';
import { authorities, services, projectTypes, projects, faqs } from './schema';
import { v4 as uuidv4 } from 'uuid'; // need to install uuid or just generate random strings

// We can just use hardcoded strings for initial structurally necessary IDs to make linking easier

const runSeed = async () => {
  console.log("Seeding Goldland Database...");

  try {
    // 1. Seed Authorities (Verified Source Data)
    console.log("Seeding Authorities...");
    const dmId = "auth-dm-001";
    const ddaId = "auth-dda-002";
    const dcdId = "auth-dcd-003";

    await db.insert(authorities).values([
      {
        id: dmId,
        slug: "dubai-municipality",
        name: "Dubai Municipality",
        shortDescription: "Primary civic and structural authority in Dubai.",
        jurisdiction: "Mainland Dubai",
        isVerified: true,
      },
      {
        id: ddaId,
        slug: "dda",
        name: "Dubai Development Authority",
        shortDescription: "Regulatory authority for major free zones like Dubai Media City and Internet City.",
        jurisdiction: "TECOM Freezones",
        isVerified: true,
      },
      {
        id: dcdId,
        slug: "dcd",
        name: "Dubai Civil Defence",
        shortDescription: "Authority responsible for fire and life safety approvals.",
        jurisdiction: "All Dubai",
        isVerified: true,
      }
    ]).onConflictDoNothing();

    // 2. Seed Services
    console.log("Seeding Services...");
    const archId = "svc-arch-001";
    const mepId = "svc-mep-002";

    await db.insert(services).values([
      {
        id: archId,
        slug: "architectural-design",
        name: "Architectural Design",
        category: "Design",
        description: "Comprehensive architectural drafting and space planning for authority submission."
      },
      {
        id: mepId,
        slug: "mep-engineering",
        name: "MEP Engineering",
        category: "Engineering",
        description: "Mechanical, Electrical, and Plumbing design and approval."
      }
    ]).onConflictDoNothing();

    // 3. Seed Project Types
    console.log("Seeding Project Types...");
    const whId = "pt-wh-001";
    const fitoutId = "pt-fit-002";

    await db.insert(projectTypes).values([
      {
        id: whId,
        slug: "warehouse",
        name: "Warehouse Construction & Modification",
      },
      {
        id: fitoutId,
        slug: "commercial-fit-out",
        name: "Commercial Fit-Out",
      }
    ]).onConflictDoNothing();

    // 4. Seed Projects (Placeholder/Structurally Necessary)
    console.log("Seeding Projects...");
    const proj1 = "proj-001";
    
    await db.insert(projects).values([
      {
        id: proj1,
        slug: "al-quoz-warehouse-mezzanine",
        title: "Al Quoz Logistics Warehouse Mezzanine",
        projectTypeId: whId,
        authorityId: dmId,
        location: "Al Quoz Industrial Area",
        approvalStatus: "Completed"
      }
    ]).onConflictDoNothing();

    // 5. Seed FAQs
    console.log("Seeding FAQs...");
    await db.insert(faqs).values([
      {
        id: "faq-001",
        question: "How long does Dubai Municipality approval take for a warehouse?",
        answer: "Typically, initial architectural approval takes 7-10 working days, provided all structural and MEP drawings meet the Dubai Building Code standards.",
        authorityId: dmId,
        isVerified: true
      },
      {
        id: "faq-002",
        question: "Do I need DCD approval for a mezzanine floor?",
        answer: "Yes. Any structural addition that affects fire egress routes or sprinkler coverage requires a revised fire safety layout approved by Dubai Civil Defence.",
        authorityId: dcdId,
        isVerified: true
      }
    ]).onConflictDoNothing();

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Seeding failed: ", err);
  }
};

runSeed();

import { db } from '../../db';
import { authorities } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { ScoringEngine, ScoringField } from '../utils/ScoringEngine';
import authoritiesJson from '../../../data/authorities.json';

export interface AuthorityKnowledge {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  jurisdiction: string | null;
  isVerified: boolean | null;
}

export class AuthorityRepository {
  private static readonly extendedAuthorities: AuthorityKnowledge[] = [
    { id: "auth-dewa", slug: "dewa", name: "Dubai Electricity & Water Authority (DEWA)", shortDescription: "Electrical, water and solar — load, connection, Shams Dubai", description: "DEWA is the sole utility authority for electricity and water in Dubai. Goldland provides engineering-led DEWA coordination for load, connection and solar.", jurisdiction: "Dubai", isVerified: false },
    { id: "auth-rta", slug: "rta", name: "Roads & Transport Authority (RTA)", shortDescription: "Gate level, access and traffic — coordinated via DM BPS", description: "RTA approvals for gate level, access and traffic impact where projects touch roads or ROW. Coordinated via municipality submission.", jurisdiction: "Dubai", isVerified: false },
    { id: "auth-trakhees", slug: "trakhees", name: "Trakhees (PCFC / EHS)", shortDescription: "Palm, JAFZA corridor and coastal free zones", description: "Trakhees EHS jurisdiction for Palm Jumeirah and PCFC zones. Coordinated pathway confirmed per project.", jurisdiction: "Dubai Free Zones", isVerified: false },
    { id: "auth-jafza", slug: "jafza", name: "JAFZA — Jebel Ali Free Zone", shortDescription: "Industrial and logistics coordination in JAFZA", description: "JAFZA coordination for warehouses and industrial units in Jebel Ali Free Zone.", jurisdiction: "JAFZA", isVerified: false },
    { id: "auth-dubai-south", slug: "dubai-south", name: "Dubai South", shortDescription: "Aviation and expo corridor approvals", description: "Dubai South approvals for logistics and commercial projects in Dubai South district.", jurisdiction: "Dubai South", isVerified: false },
    { id: "auth-emaar", slug: "emaar", name: "Emaar — Master Community", shortDescription: "Downtown, Marina, Creek — NOC via Emaar community portal", description: "Emaar master community NOC for Downtown Dubai, Marina, Creek Harbour etc. Coordinated via community portal + DM/DCD.", jurisdiction: "Emaar Communities", isVerified: false },
    { id: "auth-nakheel", slug: "nakheel", name: "Nakheel — Master Community", shortDescription: "Palm, Deira Islands — community NOC coordination", description: "Nakheel NOC for Palm Jumeirah and Deira Islands projects.", jurisdiction: "Nakheel Communities", isVerified: false },
    { id: "auth-tecom", slug: "tecom", name: "Tecom / DCCA", shortDescription: "Design and creative clusters — DCCA pathway", description: "TECOM/DCCA approvals for design districts and creative clusters.", jurisdiction: "DCCA Free Zones", isVerified: false },
    { id: "auth-diez", slug: "diez", name: "DIEZ", shortDescription: "Dubai Integrated Economic Zones", description: "DIEZ approvals for Dubai Airport Freezone (DAFZA), Dubai Silicon Oasis (DSO) and Dubai CommerCity.", jurisdiction: "DIEZ Free Zones", isVerified: false },
    { id: "auth-concordia", slug: "concordia", name: "Concordia (DMCC / JLT)", shortDescription: "JLT building management and fit-out NOC", description: "Concordia coordination for JLT and associated communities.", jurisdiction: "JLT / DMCC", isVerified: false },
    { id: "auth-sharjah", slug: "sharjah", name: "Sharjah Municipality", shortDescription: "Sharjah projects — coordinated pathway", description: "Sharjah Municipality coordination where project extends to Sharjah jurisdiction.", jurisdiction: "Sharjah", isVerified: false },
    { id: "auth-solar", slug: "solar", name: "Solar / Shams Dubai (DEWA)", shortDescription: "Solar PV grid integration via Shams Dubai", description: "DEWA Shams Dubai solar PV connection for net metering.", jurisdiction: "Dubai", isVerified: false },
    { id: "auth-fire-systems", slug: "fire-systems", name: "Fire Systems — Life Safety", shortDescription: "Fire alarm, suppression and emergency lighting — DCD aligned", description: "Fire systems approvals coordinated with DCD life safety requirements.", jurisdiction: "Dubai", isVerified: false },
  ];

  private static async getAuthorities(): Promise<AuthorityKnowledge[]> {
    let verified: AuthorityKnowledge[] = [];
    try {
      const data = await db.select().from(authorities).where(eq(authorities.isVerified, true));
      if (data && data.length > 0) verified = data;
    } catch (error) {
      console.warn("DB fetch failed, falling back to JSON:", error);
    }

    // Always merge with JSON to ensure we don't lose un-seeded data
    const jsonAuthorities = authoritiesJson.map(a => ({
      id: a.id, slug: a.slug, name: a.name, shortDescription: a.shortDescription || null, description: a.fullDescription || null, jurisdiction: a.jurisdiction || null, isVerified: a.status === 'verified'
    }));
    
    const verifiedSlugs = new Set(verified.map(v => v.slug.toLowerCase()));
    const missingFromJson = jsonAuthorities.filter(a => !verifiedSlugs.has(a.slug.toLowerCase()));
    
    verified = [...verified, ...missingFromJson];

    // Merge verified + extended coordinated (dedupe by slug)
    const seen = new Set(verified.map(v => v.slug.toLowerCase()));
    const extended = this.extendedAuthorities.filter(e => !seen.has(e.slug.toLowerCase()));
    return [...verified, ...extended];
  }

  static async findBySlug(slug: string): Promise<AuthorityKnowledge | undefined> {
    const allAuthorities = await this.getAuthorities();
    return allAuthorities.find(a => a.slug.toLowerCase() === slug.toLowerCase());
  }

  static async search(query: string): Promise<AuthorityKnowledge[]> {
    const allAuthorities = await this.getAuthorities();
    
    const fields: ScoringField<AuthorityKnowledge>[] = [
      { name: 'name', weight: 10 },
      { name: 'slug', weight: 10 },
      { name: 'jurisdiction', weight: 8 },
      { name: 'shortDescription', weight: 5 },
      { name: 'description', weight: 2 },
    ];

    return ScoringEngine.rank(allAuthorities, query, fields, 2); // Return top 2 to preserve context tokens
  }

  static async getAll(): Promise<AuthorityKnowledge[]> {
    return this.getAuthorities();
  }
}

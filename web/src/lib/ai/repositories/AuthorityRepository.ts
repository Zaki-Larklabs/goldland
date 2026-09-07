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
  private static async getAuthorities(): Promise<AuthorityKnowledge[]> {
    try {
      const data = await db.select().from(authorities).where(eq(authorities.isVerified, true));
      if (data && data.length > 0) {
        return data;
      }
    } catch (error) {
      console.warn("DB fetch failed, falling back to JSON:", error);
    }
    
    // Fallback to JSON if DB is empty or fails
    return authoritiesJson.map(a => ({
      id: a.id,
      slug: a.slug,
      name: a.name,
      shortDescription: a.shortDescription || null,
      description: a.fullDescription || null,
      jurisdiction: a.jurisdiction || null,
      isVerified: a.status === 'verified'
    }));
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

import { db } from '../../db';
import { services } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { ScoringEngine, ScoringField } from '../utils/ScoringEngine';
import servicesJson from '../../../data/services.json';

export interface ServiceKnowledge {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
}

export class ServiceRepository {
  private static async getServices(): Promise<ServiceKnowledge[]> {
    try {
      const data = await db.select().from(services);
      if (data && data.length > 0) {
        return data;
      }
    } catch (error) {
      console.warn("DB fetch failed, falling back to JSON:", error);
    }

    // Fallback to JSON if DB is empty or fails
    return servicesJson.map(s => ({
      id: s.id,
      slug: s.slug,
      name: s.name,
      description: s.description || null,
      category: s.category || "General",
    }));
  }

  static async findBySlug(slug: string): Promise<ServiceKnowledge | undefined> {
    const allServices = await this.getServices();
    return allServices.find(s => s.slug.toLowerCase() === slug.toLowerCase());
  }

  static async search(query: string): Promise<ServiceKnowledge[]> {
    const allServices = await this.getServices();
    
    const fields: ScoringField<ServiceKnowledge>[] = [
      { name: 'name', weight: 10 },
      { name: 'slug', weight: 8 },
      { name: 'category', weight: 6 },
      { name: 'description', weight: 4 },
    ];

    return ScoringEngine.rank(allServices, query, fields, 3);
  }

  static async getAll(): Promise<ServiceKnowledge[]> {
    return this.getServices();
  }
}

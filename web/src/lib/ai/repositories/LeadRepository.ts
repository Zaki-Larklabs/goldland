import { db } from '../../db';
import { leads } from '../../db/schema';
import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  projectLocation: z.string().optional(),
  authority: z.string().optional(),
  service: z.string().optional(),
  projectDetails: z.string().optional(),
  sourcePage: z.string().optional()
});

export type LeadInput = z.infer<typeof leadSchema>;

export class LeadRepository {
  static async saveLead(data: LeadInput): Promise<boolean> {
    try {
      // 1. Validate Input
      const validatedData = leadSchema.parse(data);

      // 2. Save to Database
      const id = `lead_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      
      await db.insert(leads).values({
        id,
        ...validatedData,
        status: 'New'
      });

      // 3. Send Notification (Simulated Email for V1)
      console.log(`[LeadRepository] SUCCESS - Lead saved: ${validatedData.name} - ${validatedData.email}`);
      console.log(`[LeadRepository] Simulated Email sent to sales@goldlandcontracting.ae`);

      return true;
    } catch (error) {
      console.error("[LeadRepository] ERROR saving lead:", error);
      return false;
    }
  }
}

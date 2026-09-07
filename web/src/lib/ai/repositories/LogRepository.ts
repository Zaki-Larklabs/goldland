import { db } from '../../db';
import { unansweredQuestions } from '../../db/schema';
import { z } from 'zod';

export const logSchema = z.object({
  question: z.string(),
  intent: z.string().optional(),
  pageContext: z.string().optional(),
  sessionId: z.string().optional()
});

export type LogInput = z.infer<typeof logSchema>;

export class LogRepository {
  static async logUnansweredQuestion(data: LogInput): Promise<void> {
    try {
      const validated = logSchema.parse(data);
      const id = `log_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

      await db.insert(unansweredQuestions).values({
        id,
        question: validated.question,
        pageContext: validated.pageContext,
        sessionId: validated.sessionId,
        status: 'Pending'
      });
      
      console.log(`[LogRepository] Logged unanswered question: "${validated.question}"`);
    } catch (error) {
      console.error("[LogRepository] ERROR logging unanswered question:", error);
    }
  }
}

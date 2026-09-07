export interface ScoringField<T> {
  name: keyof T;
  weight: number;
}

export class ScoringEngine {
  /**
   * Tokenizes a search query into meaningful lowercase keywords.
   */
  static tokenize(query: string): string[] {
    return query
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Remove punctuation
      .split(/\s+/)
      .filter(token => token.length > 2); // Ignore very short words like 'is', 'a'
  }

  /**
   * Scores an array of items based on the provided weighted fields.
   * Higher score = better match.
   */
  static rank<T>(items: T[], query: string, fields: ScoringField<T>[], topK: number = 3): T[] {
    const tokens = this.tokenize(query);
    if (tokens.length === 0) return items.slice(0, topK);

    const scoredItems = items.map(item => {
      let score = 0;
      
      tokens.forEach(token => {
        fields.forEach(field => {
          const value = item[field.name];
          if (typeof value === 'string') {
            const valLower = value.toLowerCase();
            // Exact match gets higher multiplier
            if (valLower === token) {
              score += field.weight * 2;
            } else if (valLower.includes(token)) {
              score += field.weight;
            }
          } else if (Array.isArray(value)) {
            // Array of strings (e.g. services or keywords)
            value.forEach(v => {
              if (typeof v === 'string') {
                const valLower = v.toLowerCase();
                if (valLower === token) {
                  score += field.weight * 1.5;
                } else if (valLower.includes(token)) {
                  score += field.weight * 0.8; // Partial match in array
                }
              }
            });
          }
        });
      });

      return { item, score };
    });

    // Sort by score descending, filter out 0 score, return topK
    return scoredItems
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map(x => x.item);
  }
}

# AI V1 KNOWLEDGE MODEL

## 1. Schema & Metadata Requirements
Every piece of knowledge (Authority, Service, FAQ) served to the AI must support the following metadata:
- `verificationStatus`: e.g., "verified", "pending", "rejected"
- `published`: boolean
- `source`: URL or reference to the official document
- `reviewer`: Name of the engineer/admin who approved it
- `reviewedAt`: ISO Timestamp
- `expiresAt`: ISO Timestamp (optional, for time-sensitive regulations)

## 2. Retrieval Rules
The `KnowledgeRepository` and `AuthorityRepository` will strictly filter queries:
- **ONLY** return records where `verificationStatus === 'verified'`.
- **ONLY** return records where `published === true`.
- **ONLY** return records where `expiresAt` is null or in the future.

## 3. Unanswered Question Logging
When the repository returns no results, or the AI determines the retrieved knowledge does not confidently answer the user's query:
1. The AI triggers an internal tool/event: `logUnansweredQuestion`.
2. The system logs:
   - `question`
   - `intent` (inferred)
   - `pathname`
   - `timestamp`
3. This log is saved to the database for the Goldland team to review and subsequently update the Knowledge Model.

## 4. Future Compatibility (pgvector)
In V1, records are stored in structured JSON/SQLite tables and queried via exact match or LIKE operators. 
In V2, this exact schema will be migrated to PostgreSQL, where an `embedding` column (vector) will be added. The repository interfaces (`findRelevantKnowledge(query)`) will remain identical, ensuring zero changes to the core chatbot orchestration.

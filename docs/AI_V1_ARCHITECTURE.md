# AI V1 ARCHITECTURE

## 1. Overview
The Goldland AI Assistant V1 is a simple, stateless, tool-driven retrieval augmented generation (RAG) system built on the Vercel AI SDK and OpenAI. It prioritizes strict adherence to verified Goldland knowledge, real lead capture, and immediate human escalation over complex multi-agent reasoning.

## 2. Core Components

### 2.1 Chat UI (`src/components/chatbot/Chatbot.tsx`)
- Uses `useChat` from `@ai-sdk/react`.
- Maintains local session context (Project Type, Authority, Location, etc.) derived from user messages or current page context.
- Passes `pathname` and session state via the `body` parameter to the API route.

### 2.2 API Route (`src/app/api/chat/route.ts`)
- Uses `streamText` from `@ai-sdk/openai`.
- Implements strict rate-limiting.
- Injects a system prompt that enforces strict adherence to verified knowledge and strict refusal of unsupported claims (fees, timelines).
- Orchestrates tool calling.

### 2.3 Repository Abstraction Layer
- `KnowledgeRepository`: Interface for fetching general FAQs and guides.
- `AuthorityRepository`: Interface for fetching authority requirements.
- `ServiceRepository`: Interface for fetching service details.
- `LeadRepository`: Interface for saving qualified leads.
- **V1 Implementation**: Reads from local JSON/SQLite with basic search logic.
- **V2 Migration**: Repositories will simply swap their internal implementation to query PostgreSQL + pgvector.

## 3. Data Flow

### API Flow
1. User sends message + context (pathname, session).
2. `route.ts` applies rate limiting.
3. System prompt instructs LLM to use tools if knowledge is needed.
4. LLM calls `searchKnowledgeBase` or `getAuthorityInfo`.
5. Repository fetches verified JSON data.
6. Guardrail logic ensures LLM doesn't hallucinate fees/timelines.
7. Final answer streamed to UI.

### Lead Flow
1. User expresses intent for a project.
2. LLM calls `submitLead(details)`.
3. Route validates details via Zod.
4. `LeadRepository.save(details)` saves to SQLite/DB.
5. Email notification sent (e.g., via Resend).
6. Success message returned to LLM, which thanks the user.

### Guardrail Flow
- **Input**: User asks "How much will DDA approval cost for my warehouse?"
- **Action**: LLM searches knowledge base. No fee is found (or fees are explicitly banned from prediction).
- **Response**: LLM states: "I cannot provide exact fees as they depend on specific project requirements. Please let me connect you with an engineer."
- **Fallback**: LLM provides WhatsApp link and Contact Form tool.

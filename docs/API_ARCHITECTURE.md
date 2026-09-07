# API Architecture

The application heavily utilizes React Server Components (RSCs) and Server Actions for data fetching and mutation, eliminating the need for traditional REST endpoints for internal CRUD. However, specific API endpoints are required for external integrations, webhooks, and AI streaming.

## 1. Public APIs (Route Handlers)

### `POST /api/leads`
- **Purpose:** Submit contact form / approval assessment.
- **Input:** `{ name, email, phone, service, message }`
- **Output:** `{ success: true, leadId }`
- **Auth:** Public.
- **Validation:** Zod schema parsing.
- **Rate Limiting:** IP-based via middleware (e.g., max 5 requests / 15 mins).
- **Error Handling:** Returns 400 on Zod failure, 429 on rate limit, 500 on DB failure.

## 2. AI APIs

### `POST /api/chat`
- **Purpose:** Handle user chat messages and stream LLM responses.
- **Input:** `{ messages: [{ role: 'user', content: '...' }] }`
- **Output:** text/event-stream (Streaming response)
- **Auth:** Public.
- **Validation:** Vercel AI SDK built-in.
- **Rate Limiting:** Strict IP limiting to prevent LLM credit drain.
- **Process:** Queries vector DB for RAG, injects context into system prompt, streams LLM output.

## 3. Upload APIs

### `POST /api/upload`
- **Purpose:** Securely upload files/documents from clients.
- **Input:** `FormData` containing `file`.
- **Output:** `{ url: string, path: string }`
- **Auth:** Public for lead forms (restricted bucket), Authenticated for CMS.
- **Validation:** MIME type checking (PDF, JPEG, PNG, WEBP), size limits (e.g., max 5MB).
- **Security:** Uploads bypass public access. Supabase Storage policies dictate read access.

## 4. Admin & Authenticated APIs
*Note: Most admin actions will utilize Next.js Server Actions.*
- **Authentication:** Validated via Supabase Auth session token.
- **Authorization:** Role-Based Access Control (RBAC). Only users with `super_admin` or `content_admin` roles can execute mutation server actions.

## 5. Webhooks & Integrations
- Reserved for future CRM integrations or payment processing. Will require standard HMAC signature verification.

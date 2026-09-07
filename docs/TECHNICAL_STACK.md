# Technical Stack

## Framework
- **Next.js 16 (App Router):** Preserved. Provides React Server Components (RSC) for incredible SEO and performance, server actions, and file-based routing.
- **React 19:** Preserved. Core UI layer.
- **TypeScript:** Preserved. Strict type safety across the entire stack.

## Styling
- **Tailwind CSS v4:** Preserved. Utility-first styling with existing brand variables.
- **shadcn/ui (Planned):** Will be introduced for complex admin and marketing components (accessible dialogs, forms, dropdowns).

## Database & Backend
- **Supabase (PostgreSQL):** Introduced. Chosen for its out-of-the-box Auth, Storage, and fast PostgreSQL performance. Existing technical debt indicated missing dependencies; this rectifies it.
- **Drizzle ORM:** Introduced. Chosen for its type-safe SQL query building, which pairs perfectly with Next.js Server Components. The placeholder `schema.ts` will be fully utilized.

## Validation & Forms
- **Zod:** Introduced. Type-safe schema validation for both client forms and API payloads.
- **React Hook Form:** Introduced. Replaces the legacy `FormData` and `mailto:` hacks with a controlled, performant form state system.

## AI
- **Vercel AI SDK:** Introduced. Will power the `api/chat/route.ts` endpoint for streaming AI responses.

## QA & Observability
- **Vitest:** Introduced for unit testing utilities and schemas.
- **Playwright:** Introduced for end-to-end critical path testing (Lead generation, form submission).
- **Sentry:** Introduced. Will capture client and server errors automatically.

## Migration Justification
- **Preserved:** Next.js, Tailwind, React. They form a solid foundation and there is zero cost to keeping them.
- **Migrated:** Static `.html` structures have already been ported. Now, "Fake" dynamic routes (hardcoded arrays) will be migrated to query the actual PostgreSQL database via Drizzle.
- **Deprecated:** Legacy `main.js` and `chatbot.js` vanilla JS files are fully deprecated in favor of React components and Hooks. The `mailto:` form action is deprecated.
- **Introduced:** Supabase, Drizzle, Zod, AI SDK. These are strictly required to fulfill the CMS, AI, and Lead capturing mandates in the Master Requirements.

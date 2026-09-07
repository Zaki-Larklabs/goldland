# Technical Debt Report

## 1. Missing Dependencies
The codebase contains imports and code for libraries that are **not present** in `package.json`. This is a critical failure point.
- **ORM:** Code uses `drizzle-orm` and `postgres` (e.g., `lib/db/index.ts`, `lib/db/schema.ts`), but they are not installed.
- **Database:** Supabase clients are referenced but `@supabase/supabase-js` is not installed.
- **Validation:** Master Requirements mandate `zod`, but it is not installed.
- **AI:** Master Requirements mandate an AI Assistant, but the `ai` (Vercel AI SDK) and provider packages are missing.

## 2. "Fake" Dynamic Content
Dynamic routes like `/authority-approvals/[slug]/page.tsx` validate slugs against a hardcoded array (`["dubai-municipality", "dda", ... ]`) instead of querying the database. This violates the CMS-driven architecture mandate.

## 3. Client-Side Form Submissions
The `/contact` route uses a client-side `FormData` handler that constructs a `mailto:` link. 
- **Debt:** Leads are not captured in the database.
- **Debt:** No server-side validation.

## 4. UI Rendering Inefficiencies
- Animations rely on a global `.reveal` observer inside a `useEffect` on every page. While functional, wrapping entire page components in `"use client"` just for scroll animations defeats some of the benefits of React Server Components (RSCs).
- Images use standard `<img src="...">` tags. Next.js `<Image>` should be used for automatic WebP/AVIF optimization and layout stability (preventing Cumulative Layout Shift).

## 5. Incomplete Database Schema
`schema.ts` only defines `authorities`, `services`, and `projects`. It is missing critical tables for the Topical Authority Model, including `leads`, `guides`, `case_studies`, `reviews`, and `team`.

## 6. Missing Environment Variables
There is no `.env.example` or `.env.local` defining the required connection strings (`DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`) or API keys.

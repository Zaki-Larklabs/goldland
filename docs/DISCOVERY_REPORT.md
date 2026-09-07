# DISCOVERY REPORT: Goldland Contracting LLC

## A. Executive Summary
The existing codebase consists of a basic Next.js 16 setup using Tailwind CSS and a legacy static HTML site (`c:\goldland\files`). While foundational visual layers (homepage, about, services, contact) have been migrated into the Next.js App Router, the application lacks the critical data layer, backend architecture, and CMS integration required by the Master Requirements. Major technical debt exists in the form of missing dependencies (Drizzle, Supabase, AI SDK) despite placeholder code expecting them.

## B. Current Architecture
- **Framework:** Next.js 16.3.3 (App Router)
- **Styling:** Tailwind CSS v4, global CSS variables
- **Database:** PostgreSQL (Placeholder `drizzle-orm` setup, but dependencies missing)
- **Authentication:** None implemented
- **CMS:** None implemented
- **Storage:** None implemented

## C. Current Route Map
See `CURRENT_ROUTE_INVENTORY.md` for full details. Includes static pages (`/`, `/about`, `/services`, `/contact`) and placeholder dynamic routes (`/authority-approvals/[slug]`, `/projects/[slug]`, `/guides/[slug]`).

## D. Current Component Map
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/chatbot/Chatbot.tsx` (Placeholder UI without AI integration)

## E. Current Data Model
Basic Drizzle schema (`lib/db/schema.ts`) defining:
- `authorities`
- `services`
- `projects`
Missing: `case_studies`, `guides`, `team`, `reviews`, `faqs`, `leads`.

## F. Current SEO Architecture
- Static `sitemap.ts` and `robots.ts` exist.
- Metadata is missing on dynamic routes (`generateMetadata` is not implemented).
- No structured data (JSON-LD) implementation.
- No canonical links generated for dynamic content.

## G. Current Security Model
- No authentication or role-based access control.
- Forms are purely client-side `mailto:` links; no backend lead validation or rate-limiting.

## H. Current Performance
- Strong baseline (Next.js server-rendered static pages).
- Heavy reliance on client-side `IntersectionObserver` (`use client`) for animations, which may impact LCP if not optimized.
- Images are not fully migrated to Next/Image for optimization.

## I. Current Content Architecture
- Legacy HTML (`c:\goldland\files`) content has been ported to JSX.
- Dynamic CMS content (Authorities, Projects) is missing; pages rely on hardcoded arrays or generic text.

## J. Current Technical Debt
See `TECHNICAL_DEBT.md` for full breakdown. Most critical is the absence of required backend packages (`drizzle-orm`, `postgres`, `supabase`) while code references them.

## K. Critical Issues
1. Missing `drizzle-orm`, `postgres`, and Supabase client libraries in `package.json`.
2. Dynamic pages will fail to build or run properly if they attempt to query the DB.
3. Chatbot is an empty shell; AI routing is absent.

## L. High-Priority Issues
1. Forms currently use `mailto:` instead of capturing structured leads in a database.
2. Missing SEO metadata generation for dynamic routes.
3. Complete absence of the Content Management System.

## M. Medium-Priority Issues
1. Images use standard `<img>` tags rather than Next.js `<Image>`.
2. Lack of automated testing (Vitest/Playwright).

## N. Existing Assets Worth Preserving
- Legacy design tokens (Ink, Brass) and typography mapping (Space Grotesk, IBM Plex).
- The CSS `reveal` animation pattern.
- Authority logos in `c:\goldland\files\images\authority-logos`.

## O. Existing Functionality Worth Preserving
- The responsive Header and Footer components.
- The Next.js App Router structural layout.

## P. Recommended Migration Strategy
1. Install and configure missing backend dependencies (Drizzle, Supabase, AI SDK).
2. Expand the database schema to cover all Master Requirements entities.
3. Connect the dynamic routes to the database.
4. Integrate the Vercel AI SDK for the chatbot.
5. Apply dynamic SEO rules and metadata.

## Q. Recommended Target Architecture
- **Frontend:** Next.js App Router, Tailwind CSS, shadcn/ui.
- **Backend:** Supabase (PostgreSQL, Auth, Storage).
- **ORM:** Drizzle.
- **AI:** Vercel AI SDK.
- **Validation:** Zod.

## R. Risks
- Launching without the backend will result in empty dynamic pages (`/authority-approvals/[slug]`).
- The `IntersectionObserver` logic in static pages might conflict with Next.js hydration if not managed properly.

## S. Unknowns
- Status of the Supabase project (Keys, Region, Auth config).
- Approved AI Provider (OpenAI, Anthropic) and associated API keys.

## T. Required Human Inputs
- Supabase credentials (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `DATABASE_URL`).
- AI Provider API Keys.
- Official company contact info and verified project data for CMS seeding.

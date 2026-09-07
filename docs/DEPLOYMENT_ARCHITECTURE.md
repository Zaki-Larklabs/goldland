# Deployment Architecture

## 1. Hosting Platform
- **Frontend & API:** Vercel (or equivalent Node.js server environment). Next.js App Router is optimized natively for Edge/Serverless environments.
- **Database & Storage:** Supabase Cloud (Managed PostgreSQL).

## 2. Environments
- **Local:** Developer machines. Uses local `.env.local` connected to a local Supabase instance (Docker) or a shared development cloud DB.
- **Preview / Staging:** Deployed automatically via Git branches. Connected to a Staging Database. Used for QA, Content Approval, and Client Review.
- **Production:** `main` branch. Connected to the Production Database. Zero downtime deployments.

## 3. CI/CD Pipeline
1. **Push to Branch:** Triggers GitHub Actions (or Vercel built-in CI).
2. **Linting & Type Checking:** `eslint` and `tsc --noEmit` must pass.
3. **Testing:** Vitest and Playwright smoke tests must pass.
4. **Preview Deployment:** Vercel generates a preview URL.
5. **Merge to Main:** Triggers Production Build.
6. **Database Migrations:** Drizzle `push` or `migrate` is applied securely during the CI CD pipeline before the build completes to ensure schema synchronization.

## 4. Caching & Edge
- **Next.js Data Cache:** Content from Supabase (e.g., Authority pages) is fetched and cached heavily using `fetch` cache tags (e.g., `tags: ['authorities']`).
- **ISR (Incremental Static Regeneration):** Pages are invalidated dynamically via On-Demand Revalidation when an admin updates the CMS.
- **Edge CDN:** Static assets (fonts, CSS, JS) are heavily cached globally at the edge.

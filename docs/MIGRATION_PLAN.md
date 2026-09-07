# Database & Environment Migration Plan

This document outlines the exact technical sequence required to transition the Goldland application from the local SQLite testing environment to the production PostgreSQL environment on Vercel.

## Phase 1: Database Provisioning
1. **Provision Vercel Postgres:** In the Vercel dashboard, attach a new Postgres storage instance to the Goldland project.
2. **Environment Variables:** Copy the provided `POSTGRES_URL` connection strings into the production Vercel environment variables.

## Phase 2: Drizzle ORM Switchover
Currently, `src/lib/db/index.ts` uses `@libsql/client` (SQLite). This must be swapped to PostgreSQL.
1. **Dependency Update:**
   ```bash
   npm uninstall @libsql/client
   npm install pg
   npm install -D @types/pg
   ```
2. **Schema Update:** Modify `src/lib/db/schema.ts` to import from `drizzle-orm/pg-core` instead of `sqlite-core`. Change `integer("...", { mode: "boolean" })` to native `boolean("...")`.
3. **Database Client Update:** Update `index.ts` to use `drizzle-orm/node-postgres`.

## Phase 3: Production Migration Execution
1. **Generate Migration Files:** 
   ```bash
   npx drizzle-kit generate
   ```
2. **Push to Production:** (Warning: Ensure you are authenticated with the production DB string).
   ```bash
   npx drizzle-kit push
   ```

## Phase 4: CI/CD Finalization
- Commit the finalized Postgres schema.
- Trigger a production build on Vercel.
- Verify that the API routes (e.g., Lead Capture and Document Upload) correctly interact with the new Postgres tables.

# Current Route Inventory

## 1. Next.js App Router (Active Routes)

### Static Routes
- `/` (Homepage, ported from legacy `index.html`)
- `/about` (Ported from legacy `about.html`)
- `/services` (Ported from legacy `services.html`)
- `/contact` (Ported from legacy `contact.html`)
- `/faqs` (Placeholder)
- `/reviews` (Placeholder)
- `/team` (Placeholder)

### Dynamic Routes
- `/authority-approvals` (Index)
- `/authority-approvals/[slug]` (Dynamic template, currently hardcoded to validate 10 specific slugs)
- `/project-approvals` (Index)
- `/project-approvals/[slug]` (Dynamic template)
- `/projects` (Index)
- `/projects/[slug]` (Currently missing template)
- `/guides` (Index)
- `/guides/[slug]` (Dynamic template)

### API Routes
- `/api/chat/route.ts` (Chatbot endpoint, placeholder)

## 2. Legacy Website (`c:\goldland\files`)
- `index.html` (Migrated)
- `about.html` (Migrated)
- `services.html` (Migrated)
- `contact.html` (Migrated)

## 3. SEO Utilities
- `/sitemap.xml` (Generated via `sitemap.ts`)
- `/robots.txt` (Generated via `robots.ts`)
- `/favicon.ico` (Present)

## Assessment
The route topology matches the *intent* of the Master Requirements (Section 10), but the dynamic routes are currently shells. There are no CMS-backed URLs rendering real database records.

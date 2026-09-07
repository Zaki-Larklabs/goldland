# Technical SEO Architecture

## 1. Domain & Rendering
- **Primary Domain:** `goldlandcontracting.ae`
- **Protocol:** Enforce HTTPS via strict HSTS headers.
- **Rendering:** All core content (Home, Authority pages, Services, Projects, Guides) MUST be Server-Side Rendered (SSR) or statically generated via Next.js React Server Components (RSC). Client-side rendering is strictly reserved for interactive widgets (e.g., Chatbot, Modals, Forms).

## 2. Metadata Generation
- **Dynamic Meta Tags:** Every dynamic route MUST implement Next.js `generateMetadata`.
- **Title Structure:** `[Primary Entity / Service] in Dubai | Goldland Contracting`
- **Description Structure:** Maximum 155 characters. Must contain primary keyword and a clear CTA (e.g., "Get expert [Service] approvals in Dubai. Certified engineers for fast clearance...").

## 3. Structured Data (JSON-LD)
- **Organization:** Placed on the Homepage (`@type: LocalBusiness`, `@type: Organization`). Must include logo, contact points, and social profiles.
- **Service:** Placed on `/services/*`, `/authority-approvals/*`, and `/project-approvals/*`.
- **Project/Case Study:** Placed on `/projects/*`.
- **FAQPage:** Placed on `/faqs` and dynamically injected into `/authority-approvals/*` pages that feature an FAQ section.
- **BreadcrumbList:** Placed on all pages below the root.

## 4. OpenGraph & Twitter Cards
- Global `opengraph-image.png` (1200x630) for static pages.
- Dynamic `generateImageMetadata` (or `@vercel/og`) for Authority and Project pages to create highly shareable link previews.

## 5. Sitemaps
- Automatically generated at `/sitemap.xml`.
- Split sitemaps if URLs exceed 10,000 (though unlikely for V1).
- Pings Google automatically on new content publish (via Supabase webhooks).

## 6. URL Structure & Breadcrumbs
- URLs must be lowercase, hyphen-separated, and readable.
- Valid: `/authority-approvals/dubai-municipality`
- Invalid: `/authorityApprovals/dubai_municipality?id=123`
- Breadcrumb UI must map exactly to URL depth (e.g., `Home > Authority Approvals > Dubai Municipality`).

## 7. Image SEO
- All images must use the Next.js `<Image>` component.
- Output formats: WebP / AVIF.
- Strict requirement for descriptive `alt` tags (e.g., `alt="Dubai Municipality approved warehouse mezzanine structure"` instead of `alt="warehouse"`).

## 8. Pagination, Filters, & 404s
- Pagination (e.g., on `/projects`) should use standard `?page=2` parameters.
- See `INDEXABILITY_RULES.md` for filter/parameter handling.
- Custom `/not-found.tsx` to handle 404s gracefully, presenting the user with a search bar and core service links to prevent bounce.

## 9. Redirects
- Comprehensive 301 redirect map for all legacy URLs (e.g., `about.html` -> `/about`).
- Managed via Next.js `next.config.js` or middleware.

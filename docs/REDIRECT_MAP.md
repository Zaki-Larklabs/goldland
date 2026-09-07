# Redirect Map & Verification Rules

This document serves as the master specification for all legacy URL redirects. It guarantees that we preserve SEO equity and prevent "soft 404s" (e.g., blanket redirecting everything to the homepage).

## Verification Assertions
1. **No Redirect Chains:** No `Old URL -> New URL 1 -> New URL 2`.
2. **No Loops:** No `URL A -> URL B -> URL A`.
3. **No Blanket Homepage Redirects:** Legacy pages that no longer exist (e.g., an outdated team member) must 404 naturally unless an explicitly relevant sub-category exists.
4. **Canonical Check:** The final destination URL must self-canonicalize.

## Official Redirect Map

| Old URL | New URL | Status Code | Reason |
| :--- | :--- | :--- | :--- |
| `/index.html` | `/` | 301 Permanent | Deprecated legacy static file extension. |
| `/home` | `/` | 301 Permanent | Deprecated legacy naming convention. |
| `/about.html` | `/about` | 301 Permanent | Deprecated legacy static file extension. |
| `/services.html` | `/services` | 301 Permanent | Deprecated legacy static file extension. |
| `/contact.html` | `/#assessment` | 301 Permanent | The dedicated contact page is deprecated in favor of the Assessment form on the homepage. |
| `/services/dda-approvals.html` | `/authority-approvals/dda` | 301 Permanent | Consolidating specific service pages into the new semantic Authority framework. |
| `/services/dm-approvals.html` | `/authority-approvals/dubai-municipality` | 301 Permanent | Migrating to standardized Authority URL slugs. |

## Implementation
These rules are implemented in the production Next.js application via `next.config.ts`, ensuring execution at the edge routing layer before any React rendering occurs.

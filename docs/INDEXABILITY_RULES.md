# Indexability & Crawl Rules

*Rule: Maintain a pristine index. Prevent thin, duplicate, or infinite-space URLs from being crawled.*

## 1. robots.txt
```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /search
Disallow: /*?filter=*
Disallow: /*?sort=*

Sitemap: https://goldlandcontracting.ae/sitemap.xml
```

## 2. Parameter URL Rules
- **Filtering & Sorting:** If the `/projects` page uses URL parameters for filtering (e.g., `?authority=dda&type=warehouse`), these URLs MUST include a `rel="canonical"` pointing back to the clean root `/projects`.
- **Search Queries:** The internal search route (`/search?q=xyz`) must be `noindex, nofollow` to prevent search results from being indexed as thin pages.

## 3. Thin Content & Orphans
- Any Authority or Project page that does not yet have substantial content (e.g., under 300 words, no case studies, no evidence) should be marked `noindex` until it is fleshed out by the content team.
- Ensure all pages are accessible within 3 clicks from the Homepage. No orphan pages.

## 4. Canonicals
- Every indexed page MUST have a self-referencing canonical tag.
- HTTP to HTTPS, non-www to www (or vice versa, depending on domain preference) must be enforced via 301 redirects, never just canonicals.

## 5. Duplicate Intent Rules
- Do not create location-spam pages (e.g., `/warehouse-approval-al-quoz`, `/warehouse-approval-dip`). 
- **Consolidate:** All warehouse intents go to `/project-approvals/warehouse`. Mention specific freezones/locations contextually within the body or via the Authority mappings.

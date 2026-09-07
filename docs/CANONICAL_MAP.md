# Canonical Map

| Route Type | URL Pattern | Canonical Status | Notes |
|------------|-------------|------------------|-------|
| Homepage   | `/` | `https://goldlandcontracting.ae` | Set in `layout.tsx` |
| About      | `/about` | `.../about` | Set |
| Services   | `/services/[slug]` | `.../services/[slug]` | Dynamic canonical set |
| Authority  | `/authority-approvals/[slug]` | `.../authority-approvals/[slug]` | Dynamic canonical set |
| Projects   | `/projects/[slug]` | `.../projects/[slug]` | Dynamic canonical set |
| Guides     | `/guides/[slug]` | `.../guides/[slug]` | Dynamic canonical set |

**Status:** Canonicals are properly implemented across the Next.js routing structure. No major issues found.

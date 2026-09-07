# Security Architecture

## 1. Secret Management
- **Environment Variables:** All secrets (Database URLs, API Keys) are stored securely in `.env.local` (excluded via `.gitignore`) and injected by the deployment platform (Vercel/Supabase).
- **Client Exposure:** ONLY variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.
- **Supabase Keys:** Only the `NEXT_PUBLIC_SUPABASE_ANON_KEY` is exposed. The `SUPABASE_SERVICE_ROLE_KEY` is strictly confined to server environments for admin overrides.

## 2. Row Level Security (RLS)
Supabase RLS policies enforce access rules directly at the database layer:
- **Public Tables (`authorities`, `projects`, etc.):** `SELECT` is public. `INSERT`/`UPDATE`/`DELETE` require authenticated `admin` role.
- **Private Tables (`leads`):** `INSERT` is public (via API route). `SELECT` requires authenticated `admin` or `sales` role.

## 3. Admin RBAC (Role-Based Access Control)
Roles are assigned via Supabase Custom Claims or a secure `user_roles` table:
- `super_admin`: Full access.
- `content_admin`: Can manage CMS entities.
- `sales`: Can view leads, cannot edit content.

## 4. Upload Security
- **MIME Validation:** Server-side validation against a strict allowlist.
- **Storage Policies:** Uploads from public forms go to a private bucket where `SELECT` is restricted to admins. Public assets (hero images, logos) go to a public bucket.
- **Size Limits:** Hard limit on file streams to prevent DDOS via massive payloads.

## 5. Rate Limiting & Anti-Spam
- Implemented via Next.js Middleware or Edge config.
- Strict rate limits on `/api/leads` and `/api/chat`.

## 6. Secure Headers & Logging
- **Headers:** Implementation of `next.config.js` security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
- **Logging:** Integration with Sentry. Logs strip PII (Personally Identifiable Information) before transmission. No secrets are logged.

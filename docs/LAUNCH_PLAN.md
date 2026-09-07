# Launch & Post-Deployment Plan

This document dictates the immediate operations required the moment the new DNS propagates, ensuring SEO indexation is caught instantly and the application functions correctly in the wild.

## 1. Zero-Hour Checks
- **SSL Certificate:** Verify Vercel has successfully issued and applied the Let's Encrypt SSL certificate for `goldlandcontracting.ae`.
- **Redirect Verification:** Physically attempt to access `goldlandcontracting.ae/services.html` and verify it 301 redirects to `/services` without chaining.
- **Lead Capture Test:** Submit a test lead through the Homepage Assessment form. Verify that:
  - The UI shows a success state.
  - The file uploads successfully to the private bucket.
  - The record is accurately inserted into the production PostgreSQL database.
- **Chatbot Escalation:** Ask the Chatbot a restricted question (e.g., "What are your fees?"). Verify it immediately fires the Human Escalation fallback UI.

## 2. SEO & Indexation Commands
- **Google Search Console (GSC):**
  1. Log into GSC.
  2. Navigate to Sitemaps and submit `https://goldlandcontracting.ae/sitemap.xml`.
  3. Use the URL Inspection tool on the Homepage (`/`) and manually click **Request Indexing**.
- **Robots Verification:** Load `https://goldlandcontracting.ae/robots.txt` in a browser and verify it does NOT contain a blanket `Disallow: /` command (which Vercel sometimes injects on preview deployments).

## 3. Monitoring
- **Error Tracking:** Monitor the Vercel Runtime Logs for the first 24 hours. Keep a specific eye out for `500` errors on dynamic routes, which would indicate a missing PostgreSQL record or incorrect database schema migration.
- **Unanswered Questions Log:** Check the `unanswered_questions` table at Day 3. Review what real clients are asking the AI and generate new Knowledge Base guides to fulfill those gaps.

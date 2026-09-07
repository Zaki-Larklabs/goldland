# OPTIMIZATION ROADMAP

## TODAY (P0 - Critical Issues)
1. **Lead Notification:** Implement email alerts or Slack webhooks in `/api/contact/route.ts` so the team is actually notified when a lead enters the DB.
2. **Security:** Add basic rate-limiting to the contact and chat APIs to prevent spam submissions.

## THIS WEEK (P1 - High Impact)
1. **Analytics Validation:** Verify GA4 tags are firing correctly for `assessment_submit` and `whatsapp_click`.
2. **Local SEO:** Implement proper `LocalBusiness` JSON-LD schema on the homepage and contact page.

## THIS MONTH (P2 - Growth)
1. **Trust Content:** Gather and publish missing case studies and redacted documentation evidence.
2. **Cannibalization Cleanup:** Ensure `authority-approvals` and `project-approvals` target strictly distinct search intents.

## LATER (P3)
1. Advanced CRM integrations.
2. Performance optimizations for 3D scrolling on low-end devices.

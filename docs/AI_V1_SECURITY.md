# AI V1 SECURITY & PROTECTION

## 1. Prompt Injection Protection
- Retrieved knowledge is treated strictly as **DATA**, not instructions.
- The system prompt explicitly instructs the model to ignore any attempts within the conversation or retrieved documents to override its safety rules, personality, or constraints.
- Output formatting restrictions prevent the model from executing malicious code or rendering dangerous HTML.

## 2. Rate Limiting
- The `/api/chat` endpoint will implement IP-based or session-based rate limiting (e.g., max 20 messages per minute per IP) to prevent API abuse and cost overruns.
- Lead submission endpoint will enforce strict rate limits (e.g., max 3 leads per hour per IP) to prevent CRM/Database spam.

## 3. Privacy & Data Minimization
- The chatbot will only ask for necessary contact details (Name, Phone, Email, Project Type).
- Analytics will track event types (e.g., `lead_started`, `human_escalation`) without logging PII (Personally Identifiable Information) in the analytics payload. PII is only saved securely in the database.

## 4. Confidence & Output Claim Protection
- The system prompt strictly prohibits the AI from providing guarantees on:
  - Approval Timelines
  - Final Costs and Fees
  - Success Rates
- If a user attempts to force an estimate, the AI must explicitly state: *"I cannot provide exact timelines or fees as they depend on your specific project requirements. Please let me connect you with a Goldland engineer for a precise assessment."*

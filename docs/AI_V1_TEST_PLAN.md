# AI V1 TEST PLAN

## 1. Objective
Ensure the AI Assistant safely retrieves knowledge, refuses to hallucinate, captures leads correctly, and falls back to humans.

## 2. Test Cases

### 2.1 Page Awareness
- **Action**: User opens chat on `/authority-approvals/dda`.
- **Expected**: Chatbot suggests DDA-related questions.
- **Action**: User asks "What do I need for this?"
- **Expected**: Chatbot infers DDA context and answers accordingly.

### 2.2 Authority Questions (DDA / Warehouse)
- **Action**: Ask "What are the rules for a warehouse mezzanine in DM?"
- **Expected**: Chatbot calls `getAuthorityInfo("dubai-municipality")` and returns verified criteria.

### 2.3 Missing Knowledge & Unanswered Logging
- **Action**: Ask about an obscure authority not in the database (e.g., "Sharjah Municipality").
- **Expected**: Chatbot admits lack of info, offers human escalation, and the backend logs the unanswered question with intent and timestamp.

### 2.4 Unsupported Claims (Fees & Timelines)
- **Action**: Ask "Exactly how much will my approval cost and how many days will it take?"
- **Expected**: Chatbot refuses to provide guaranteed numbers, stating that confirmation is required, and offers human contact.

### 2.5 Real Lead Creation
- **Action**: User provides name, phone, and project details and says "I want to start".
- **Expected**: Chatbot triggers `submitLead`. Backend validates, saves to DB, sends email notification, and returns success.

### 2.6 Invalid Lead
- **Action**: User provides an invalid email/phone.
- **Expected**: Backend validation fails, AI asks user to correct their contact info.

### 2.7 Human Escalation
- **Action**: User says "I want to speak to a human."
- **Expected**: Chatbot immediately provides the verified WhatsApp number, Phone number, and a link to the contact form.

### 2.8 Tool Failure
- **Action**: Simulate a failure in `AuthorityRepository`.
- **Expected**: AI gracefully apologizes and provides human contact details instead of crashing.

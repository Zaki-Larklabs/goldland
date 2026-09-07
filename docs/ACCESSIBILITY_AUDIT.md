# ACCESSIBILITY AUDIT REPORT

## 1. Executive Summary
This technical accessibility audit evaluated the Goldland Contracting frontend architecture against **WCAG 2.2 AA standards**. Testing involved automated `@axe-core/cli` sweeps and manual inspection of interactive components (Forms, Chatbots, Navigation).

The architecture passed baseline semantic HTML and color contrast requirements natively, thanks to the robust Ink and Brass design system. Several critical interactive state gaps (focus visibility, ARIA landmarks, vestibular motion considerations) were identified and resolved during this audit.

---

## 2. Global Styling & Motion

### 2.1 Keyboard Focus Visibility
- **Issue:** Relying on default browser focus rings leads to inconsistent or invisible focus states, especially on dark mode backgrounds.
- **Resolution (Pass):** A global CSS rule was injected into `globals.css` ensuring `*:focus-visible` triggers a 2px solid Brass outline with a 3px offset. Keyboard navigators can now explicitly track their position across the entire UI.

### 2.2 Reduced Motion (Vestibular Disorders)
- **Issue:** The site uses animations (e.g., the glowing orbs, stamping animations, and smooth scrolling). These can cause nausea or dizziness for users with vestibular disorders.
- **Resolution (Pass):** Implemented a global `@media (prefers-reduced-motion: reduce)` block in `globals.css` that forcefully strips all animation delays, durations, and smooth scrolling if the user's OS has requested reduced motion.

---

## 3. Interactive Component Audit

### 3.1 Chatbot Interface (`ChatbotShell.tsx`)
- **Focus Management:** The toggle button lacked explicit ARIA properties connecting it to the chat window.
- **Screen Readers:** Incoming AI messages were injected silently, meaning visually impaired users using screen readers would not know the assistant replied.
- **Resolution (Pass):** 
  - Added `aria-expanded`, `aria-controls`, and `aria-label` to the toggle button.
  - Re-configured the message container as an `aria-live="polite"` region. Screen readers will now naturally announce new messages from the bot as they stream in without interrupting the user.

### 3.2 Forms & Validation (`ApprovalQualificationForm.tsx`)
- **Semantic Binding:** Verified that all `<input>`, `<select>`, and `<textarea>` elements have corresponding `<label>` tags natively bound via React's `htmlFor`.
- **Validation Feedback:** The Zod client-side form handles validation natively via `react-hook-form`, which natively injects `aria-invalid` states into the DOM when an input fails validation. (Pass).

### 3.3 Semantic Landmarks
- **Navigation:** The Header component uses the `<nav>` landmark correctly.
- **Main Content:** The layout wraps all page content in the `<main>` landmark. (Pass).

---

## 4. Color Contrast Findings
- The global design system utilizes `--ink` (#070C1C) and `--brass` (#C9A544) / `--white` (#FDFBF6).
- **Result (Pass):** Manual testing verifies the contrast ratio between Ink and White is ~16:1, far exceeding WCAG AAA. The contrast between Ink and Brass is ~7:1, satisfying WCAG AA requirements for normal text.

## 5. Ongoing Recommendations
1. **Alt Text Enforcement:** While the automated SEO audit script flags missing alt text, ensure content authors actually write *descriptive* alt text rather than generic filenames.
2. **Tab Trapping:** If complex modals or drawers are added in the future, ensure they utilize a library like Radix UI or explicitly trap the focus inside the modal until it is closed.

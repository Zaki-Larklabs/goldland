# Goldland Contracting LLC — Digital Design System

## 1. Brand Principles
The Goldland Digital Design System ("Approvals Dossier") is built on the foundation of architectural precision, premium engineering capability, and official Dubai authority clearance. The interface must communicate trustworthiness, technical competence, and exactitude. 
**Design Character:** Premium, Architectural, Engineering-led, Precise, Professional, Dubai-oriented, Trustworthy.
**Anti-Patterns:** Avoid generic contractor templates, cheap WordPress layouts, SaaS-style dashboards, excessive animation, and visual clutter.

## 2. Visual Hierarchy
Information must be structured like an official dossier:
- **Primary:** Core authority outcomes, structural decisions, primary CTAs.
- **Secondary:** Engineering details, project specifications, metadata, sub-navigation.
- **Tertiary:** Helper text, breadcrumbs, footnotes, legal disclaimers.
Generous whitespace and stark contrasts between sections (e.g., Ink background to Vellum background) denote major shifts in context.

## 3. Typography
- **Primary / Display (Headings, `.kicker`):** Space Grotesk. Communicates modernity, engineering precision, and structure.
- **Secondary / Body (Paragraphs, UI labels):** IBM Plex Sans. Highly legible, trustworthy, excellent numeric rendering for engineering specs.
- **Weights:** Light (300) for large aesthetic typography, Regular (400) for body, Medium (500)/SemiBold (600) for structural UI components, Bold (700) for high-impact metrics.

## 4. Color Tokens
```css
/* Core Brand */
--ink: #070C1C;          /* Deepest navy, official */
--ink-soft: #0C1530;     /* Elevated navy */
--ink-mute: #16244A;     /* Muted navy for borders */
--brass: #B59345;        /* Premium gold/brass */
--brass-lt: #C9A544;     /* Highlight brass */
--brass-glow: rgba(201, 165, 68, 0.15);
--vellum: #F4F0E4;       /* Primary light background */
--vellum-alt: #EBE5D3;   /* Secondary light background */
--white: #FFFFFF;

/* Status / Utility */
--stamp-red: #D33636;    /* Official approval stamp */
--success: #2E7D32;
--warning: #ED6C02;
--danger: #D32F2F;
--text-dark: #1A1A1A;
--text-dim: rgba(26, 26, 26, 0.65);
--text-light: #F4F0E4;
--border-light: rgba(7, 12, 28, 0.1);
--border-dark: rgba(244, 240, 228, 0.1);
```

## 5. Light Theme
- **Background:** `--vellum`
- **Surface (Cards):** `--white` or `--vellum-alt`
- **Text:** `--ink` (primary), `--text-dim` (secondary)
- **Borders:** `--border-light`
- **Accents:** `--brass` for interactive elements, `--stamp-red` for critical alerts/stamps.

## 6. Dark Theme
- **Background:** `--ink`
- **Surface (Cards):** `--ink-soft`
- **Text:** `--text-light` (primary), `rgba(244,240,228,.65)` (secondary)
- **Borders:** `--border-dark`
- **Accents:** `--brass-lt` for interactive elements.

## 7. Spacing System
A strict 4px/8px baseline architectural grid:
- `sp-1`: 4px (micro adjustments)
- `sp-2`: 8px (inner component spacing)
- `sp-3`: 16px (standard padding)
- `sp-4`: 24px (card padding, section gaps)
- `sp-6`: 32px (large component gaps)
- `sp-8`: 48px (minor section spacing)
- `sp-12`: 72px (major section spacing)
- `sp-16`: 96px (hero spacing)

## 8. Grid System
- Desktop uses a fluid 12-column CSS Grid.
- Tablet defaults to an 8-column Grid.
- Mobile defaults to a 4-column Grid.
- Gaps are consistently `24px` on desktop, scaling down to `16px` on mobile.

## 9. Container Widths
- **Maximum Content Width:** `1280px` (Architectural wide format).
- **Reading Width:** `65ch` (For blog/guide content to ensure legibility).
- **Padding:** Global horizontal padding of `24px` on desktop, `16px` on mobile.

---
## Component Taxonomy

### 10. Buttons
- **Primary:** Solid `--brass` background, `--ink` text. Hover: Slight brightness increase, translateY(-1px).
- **Secondary:** Outline `--ink` (Light) or Outline `--white` (Dark). Hover: Fill background.
- **Ghost:** Transparent background, underline on hover.
- **Destructive:** Solid `--stamp-red`.

### 11. Forms
- **Inputs:** Minimalist bottom-border only (blueprint style) or crisp rectangular bounds. 
- **Labels:** IBM Plex Medium, upper-case, small tracking.
- **Validation:** Real-time feedback using `--stamp-red` for errors.

### 12. Cards
- **Base:** Sharp corners (or max `4px` radius). Minimal box-shadow. 
- **Border:** 1px solid `--border-light/dark`.
- **Hover:** Subtle `-y` translation, glow using `--brass-glow`.

### 13. Tables
- Used for authority matrices and technical specs.
- Clean lines, alternate row shading (`--vellum-alt` / `--ink-soft`).
- Sticky headers for long datasets.

### 14. Badges
- Status indicators (e.g., "Approved", "Pending", "DM", "DDA").
- Pill shape, bold text, specific color coding based on status or authority.

### 15. Breadcrumbs
- Essential for SEO and deep navigation.
- Separated by slashes (`/`), muted text, current page is bold and unlinked.

### 16. Navigation
- Translucent/glassmorphism header adhering to the top of the viewport.
- Contains Brand (left), Main Links (center), CTA (right).

### 17. Mega Menu
- Used for "Services" and "Authorities".
- Dropdown panel spanning viewport width, displaying structured columns (e.g., Dubai Municipality, DCD, DDA) with short descriptions.

### 18. Modals
- Used for lead capture / approval assessments.
- Centered, stark overlay (`rgba(7, 12, 28, 0.8)`). 
- Sharp corners, prominent close button.

### 19. Drawers
- Used for mobile navigation and chatbot interface on mobile.
- Slides from right. Contains accordion sub-menus.

### 20. Accordions
- Used for FAQs and process breakdowns.
- Minimalist borders between items. Simple `+` / `-` toggle icons.

### 21. Tabs
- Used for toggling between Design, Approvals, and Management scopes.
- Underline indicator (`--brass`) on active state.

### 22. Hero Sections
- Blueprint grid background overlay.
- Large typographic H1. "Vellum" accent cards overlapping the grid.

### 23. CTA Sections
- High contrast (usually `--ink` background).
- Clear, commanding typography. Two button choices (Primary & Secondary).

### 24. Project Cards
- Aspect ratio: `4:3` or `16:9` imagery.
- Metadata below image: Location, Authority, Service scope.

### 25. Authority Cards
- Features authority logo (if permitted) or strict typography.
- Lists jurisdictions and supported project types.

### 26. Case Study Cards
- Focus on metric-driven results.
- "Challenge -> Solution -> Result" preview.

### 27. Review Cards
- Quotation mark iconography.
- Author name, project context, and star rating.

### 28. Team Cards
- Professional headshot.
- Name, Role, Key Credentials (e.g., "DM Certified Engineer").

### 29. Evidence Cards
- Displays redacted certificates or official documentation.
- Clicking opens a Lightbox/Modal viewer.

### 30. Timeline
- Vertical line with nodes connecting approval stages (01 Assess, 02 Design, 03 Submit...).

### 31. Before/After
- Interactive slider component overlaying two images (Site condition vs. Fit-out complete).

### 32. Gallery
- Masonry or CSS Grid layout for project imagery. Lazy loaded.

### 33. Chatbot
- Floating action button (FAB) bottom right.
- Chat UI: clear distinction between User (Solid background) and Assistant (Outline/Brand background).

### 34. Search
- Prominent input, quick-results dropdown displaying Authority, Guide, and Project categories.

### 35. Filters
- Sidebar or horizontal scroll bar.
- Chip-style toggle buttons for Authority and Project Type filtering.

### 36. Loading States
- Skeleton loaders mirroring the final component structure. No generic spinners except inside buttons.

### 37. Empty States
- Clear, helpful messaging. E.g., "No projects found for this authority. Contact us for specifics."

### 38. Error States
- Polite, non-technical error boundaries. Prominent "Return Home" or "Contact Support" CTAs.

---
## Responsive Behavior
- **320px / 375px / 390px / 412px (Mobile):** Stacked 1-column layouts, touch-friendly tap targets (min `44px`), hamburger menu.
- **768px (Tablet):** 2-column grids for cards, adjusted typography scaling.
- **1024px (Small Desktop):** 3-column grids, horizontal mega-menu enabled.
- **1280px (Standard Desktop):** 4-column grids for rich project galleries, max container width reached.
- **1440px+ (Large Desktop):** Content remains centered at `1280px` max-width. Blueprint background textures bleed to edges.

## Accessibility Requirements
- **WCAG 2.1 AA Compliance:** Minimum target for all components.
- **Contrast:** Ensure text against `--vellum` and `--ink` meets 4.5:1 contrast ratios.
- **Keyboard Navigation:** All interactive elements (`a`, `button`, `input`) must have a distinct, visible `:focus-visible` ring (e.g., `outline-2 outline-offset-2 outline-brass`).
- **Semantic HTML:** Strict usage of `<nav>`, `<main>`, `<article>`, `<section>`, and correct `h1`-`h6` heading hierarchy.
- **ARIA:** Proper ARIA labels for icon-only buttons, mega menus, and modals (`aria-expanded`, `aria-hidden`).

## Reduced Motion Behavior
- Support for `@media (prefers-reduced-motion: reduce)`.
- All `.reveal` animations, parallax effects, and smooth scrolls must be disabled or replaced with simple opacity cross-fades.
- Orb/glow drifts must be stopped or hidden.

---
*Note: Do not create page-specific, one-off styles when a reusable component from this taxonomy can solve the requirement.*

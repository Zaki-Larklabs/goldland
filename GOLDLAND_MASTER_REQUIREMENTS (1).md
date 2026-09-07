# GOLDLAND CONTRACTING LLC — MASTER WEBSITE REQUIREMENTS & DELIVERY SKILL
## Version 1.0 — Principal Architecture / Full-Stack / Technical SEO / UX / AI Specification

> **Purpose:** This document is the single implementation contract for rebuilding the Goldland Contracting LLC digital platform. It is intended to be pasted into an AI coding agent such as Antigravity and also used by developers, designers, SEO specialists, content editors, and project owners as the source roadmap.
>
> **Primary objective:** Build Goldland as a premium Dubai authority-approvals, engineering, design, fit-out and project-management digital platform — not merely a brochure website.

---

# 00. DOCUMENT CONTROL

| Field | Requirement |
|---|---|
| Project | Goldland Contracting LLC Website |
| Primary domain | `https://goldlandcontracting.ae/` |
| Secondary/legacy domain | `https://fitoutapprovals.ae/` |
| Region | Dubai, UAE |
| Primary language | English |
| Future language option | Arabic-ready architecture |
| Primary business focus | Authority Approvals |
| Secondary focus | Design & Engineering |
| Secondary focus | Project Management |
| Secondary focus | Interior Fit-Out / MEP / Contracting |
| Primary conversion | Approval Assessment |
| Secondary conversion | WhatsApp / Call |
| Architecture | SEO-first, content-driven, CMS-backed, scalable |
| Deployment philosophy | Production-grade, observable, secure, reversible |
| Status | Master requirements / implementation roadmap |

---

# 01. SOURCE-OF-TRUTH HIERARCHY

When information conflicts, use this hierarchy:

1. **Verified Goldland operational/business information**
2. **Official authority/government information**
3. **Approved Goldland source documents**
4. **Current website content**
5. **Competitor/reference websites**
6. **General industry knowledge**
7. **AI inference**

Never use levels 5–7 to invent a Goldland fact.

Competitor websites are for structural/market research only. Never copy:
- wording
- testimonials
- images
- proprietary diagrams
- layouts
- claims
- project evidence
- ratings
- credentials

Any unsupported business fact must be represented as:
- `[VERIFY]`
- `[CONTENT REQUIRED]`
- `[ADMIN INPUT REQUIRED]`

Never silently invent missing content.

---

# 02. BUSINESS CONTEXT

## 2.1 Brand

**GOLDLAND CONTRACTING L.L.C**

Current brand descriptor:

**INTERIOR FITOUT – MEP – APPROVALS**

Strategic positioning for the new platform:

**Dubai Authority Approvals + Engineering + Design + Fit-Out**

The website should communicate that Goldland can support the technical/design/coordination side of an approval journey rather than presenting approval as simple paperwork.

## 2.2 Existing service pillars

### A. Authority Approvals

Current source material references work involving:

- Dubai Municipality (DM)
- Dubai Civil Defence (DCD)
- Dubai Development Authority (DDA)
- Trakhees
- Concordia
- DIEZ
- Dubai South
- TECOM
- JAFZA
- DHCC
- DHA
- DEWA
- RTA
- DED / Dubai Department of Economy and Tourism terminology where verified
- Nakheel
- Emaar
- Deyaar
- DAMAC

**Important:** a listed authority/developer is not automatically proof of an official partnership, accreditation, endorsement, or current authorization. Verify every such statement before publication.

### B. Design Services

Source material includes:

- Architectural & Project Design
- Furniture & Layout Plans
- Ceiling & Fire Safety Designs
- Custom Joinery & Cabinetry
- Custom Cabinetry & Shelving Designs
- HVAC / AC Ducting Design
- Electrical Layouts and Load Schedule Design
- Drainage & Water Systems
- 3D Visualization
- Space Planning & Joinery Design

### C. Project Management

Source material includes:

- Approval Coordination & NOC Acquisition
- Documentation Management
- Compliance Assurance
- Stakeholder Communication & Follow-Up
- Record Management

### D. Approval support workflow

Source material describes a workflow broadly equivalent to:

1. Understand client requirements
2. Recommend required designs/services
3. Prepare/finalize design
4. Obtain client approval
5. Submit client-approved design to the relevant authority
6. Coordinate final inspection
7. Complete the relevant process/project

Do not convert this into a universal authority procedure. Authority requirements vary by project, location, jurisdiction, scope, and current rules.

---

# 03. STRATEGIC OBJECTIVE

The digital platform must achieve these outcomes simultaneously:

1. Premium corporate credibility
2. Search-engine discoverability
3. Strong topical authority around Dubai approvals
4. Real project evidence
5. Real team and credential evidence
6. Strong local SEO
7. Qualified lead generation
8. AI-assisted qualification and support
9. Scalable content management
10. High performance
11. Accessibility
12. Security
13. Analytics and attribution
14. Low maintenance cost
15. Easy future expansion

## Core principle

**DO NOT BUILD A WEBSITE. BUILD A DIGITAL GOLDLAND PLATFORM.**

The platform connects:

`AUTHORITY`
→ `PROJECT TYPE`
→ `ENGINEERING`
→ `DESIGN`
→ `DOCUMENTATION`
→ `SUBMISSION`
→ `INSPECTION`
→ `PROJECT`
→ `EVIDENCE`
→ `REVIEW`
→ `LEAD`

---

# 04. PRIMARY BUSINESS POSITIONING

## Recommended core positioning

**Dubai Authority Approvals, Engineering & Fit-Out**

Recommended supporting proposition:

> Goldland Contracting supports businesses, property owners and project stakeholders with authority approvals, technical design, engineering coordination, NOCs, inspections, project management and fit-out services across Dubai.

This text is a positioning template, not a verified final claim. Review against actual Goldland capability before publication.

## Avoid unsupported claims such as

- guaranteed approval
- 100% approval
- fastest approval
- official government partner
- approved contractor
- guaranteed timeline
- guaranteed fee
- guaranteed success rate

unless independently verified and approved for publication.

---

# 05. DOMAIN STRATEGY

## 5.1 Primary domain

`goldlandcontracting.ae`

This should become the primary SEO/entity destination.

## 5.2 Secondary domain

`fitoutapprovals.ae`

Treat as a legacy/secondary acquisition asset if both domains are controlled.

Do not let both domains publish substantially overlapping pages targeting the same intents.

## 5.3 Migration strategy

Before redirecting anything:

1. Crawl both domains
2. Export all URLs
3. Export title tags
4. Export meta descriptions
5. Export canonical URLs
6. Record status codes
7. Record indexability
8. Record organic traffic
9. Record Search Console queries where available
10. Record backlinks/referring domains where available
11. Identify duplicate content
12. Identify strong URLs
13. Map each old URL to the best new destination
14. Implement one-to-one 301 redirects
15. Avoid mass redirecting all pages to homepage
16. Keep redirect documentation in `/docs/REDIRECT_MAP.md`

## 5.4 Canonical principle

Every search intent should have one primary canonical destination.

---

# 06. RECOMMENDED TECH STACK

## 6.1 Frontend / full-stack framework

**Next.js + React + TypeScript + App Router**

Reason:
- Full-stack React architecture
- Server-side rendering/server components
- File-system routing
- Strong metadata/routing support
- Suitable for content-heavy SEO architecture
- Suitable for interactive features without turning the whole application into a client-only SPA

Use the latest stable version available at project initialization, but pin versions in `package.json` and lockfile.

Reference: Next.js documentation describes Next.js as a React framework for full-stack applications and identifies the App Router as the newer router supporting modern React features.

## 6.2 Styling

**Tailwind CSS**

Use current stable Tailwind implementation at project start.

Do not create a huge CSS framework on top of Tailwind.

Use:
- design tokens
- utility classes
- component-level styles when justified
- CSS variables for theme values

Tailwind CSS v4 is current and its official upgrade documentation states Node.js 20+ is required by the v4 upgrade tooling. Confirm environment compatibility before installation.

## 6.3 UI component foundation

Recommended:

**shadcn/ui-style component architecture**

Principles:
- accessible primitives
- component ownership stays inside project
- avoid vendor lock-in
- customize visual layer heavily to Goldland

Do not make the site look like an untouched component library.

## 6.4 Database / backend platform

Recommended default:

**Supabase + PostgreSQL**

Use it for:
- relational content data where suitable
- leads
- CMS data
- authentication
- storage
- database functions where needed

Supabase currently provides PostgreSQL, Auth, Storage, Realtime and server-side functions. Use Row Level Security for protected records.

Do not place highly confidential data in publicly queryable tables.

## 6.5 ORM / DB access

Preferred:

**Drizzle ORM** for typed SQL-oriented access.

Alternative:
Prisma if the existing repository already uses Prisma successfully.

Do not migrate ORM purely for fashion. Preserve a stable existing ORM where practical.

## 6.6 Validation

**Zod**

Use for:
- forms
- API inputs
- CMS payloads
- AI structured output
- lead qualification payloads
- upload metadata

## 6.7 Forms

**React Hook Form + Zod**

Use server-side validation as well.

Never trust client validation.

## 6.8 Authentication / admin

Use:
- Supabase Auth if Supabase is selected
- secure session handling
- role-based permissions

Roles:

- `super_admin`
- `content_admin`
- `seo_admin`
- `sales`
- `editor`
- `reviewer`

Least privilege is mandatory.

## 6.9 Storage

Use object storage for:
- project images
- project videos
- certificates
- document uploads
- team photos
- before/after assets

If Supabase Storage is selected:
- separate buckets by purpose/security
- apply access policies
- keep private uploads private
- use signed URLs for restricted files
- do not expose client documents publicly

Supabase documentation recommends storing larger files outside the database and controlling access with storage policies.

## 6.10 Search

Phase 1:
- PostgreSQL full-text search / indexed search

Phase 2:
- dedicated search engine only if scale demands it

Do not introduce Elasticsearch/OpenSearch on day one without evidence that PostgreSQL search is insufficient.

## 6.11 AI

Architecture:

`Next.js Server`
→ `AI Gateway / Server Route`
→ `Retrieval Layer`
→ `Goldland Knowledge Base`
→ `LLM`

Never:

`Browser`
→ `LLM API key`

Never expose provider secrets to frontend.

Use a provider-agnostic AI service interface so model providers can change without rewriting application code.

## 6.12 Analytics

Required:
- Google Analytics 4
- Google Search Console
- Google Tag Manager where necessary

Optional:
- Microsoft Clarity or another privacy-compliant UX analytics system if approved

Do not load unnecessary tracking scripts.

## 6.13 Error monitoring

Recommended:
- Sentry or equivalent

Track:
- server errors
- client errors
- failed submissions
- API failures
- AI failures
- upload failures

## 6.14 Testing

Recommended:
- Vitest for unit tests
- Playwright for end-to-end tests
- axe-based accessibility tests
- Lighthouse/PageSpeed checks
- TypeScript strict mode
- ESLint
- Prettier

---

# 07. ENVIRONMENT & INFRASTRUCTURE

## Environments

Create:

- Local
- Preview/Staging
- Production

Never use production database credentials locally.

## Environment variables

Examples:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

DATABASE_URL=

AI_PROVIDER=
AI_API_KEY=

SMTP_HOST=
SMTP_USER=
SMTP_PASSWORD=

GOOGLE_ANALYTICS_ID=
GOOGLE_TAG_MANAGER_ID=

SENTRY_DSN=

WHATSAPP_NUMBER=
BUSINESS_PHONE=
BUSINESS_EMAIL=
```

Secrets must never be committed.

Create `.env.example` without secrets.

---

# 08. REPOSITORY STRUCTURE

Recommended:

```text
/
├── app/
│   ├── (marketing)/
│   ├── authority-approvals/
│   ├── project-approvals/
│   ├── design-engineering/
│   ├── project-management/
│   ├── projects/
│   ├── case-studies/
│   ├── guides/
│   ├── reviews/
│   ├── team/
│   ├── about/
│   ├── contact/
│   ├── api/
│   ├── admin/
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── not-found.tsx
│   ├── error.tsx
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   ├── marketing/
│   ├── seo/
│   ├── projects/
│   ├── authorities/
│   ├── forms/
│   ├── chatbot/
│   ├── reviews/
│   └── admin/
│
├── lib/
│   ├── seo/
│   ├── analytics/
│   ├── auth/
│   ├── db/
│   ├── storage/
│   ├── ai/
│   ├── validation/
│   ├── redirects/
│   └── utils/
│
├── db/
│   ├── schema/
│   ├── migrations/
│   └── seeds/
│
├── content/
│   ├── authorities/
│   ├── services/
│   ├── projects/
│   ├── guides/
│   └── faqs/
│
├── public/
│   ├── brand/
│   ├── icons/
│   └── static/
│
├── docs/
│   ├── PRD.md
│   ├── DESIGN_SYSTEM.md
│   ├── ARCHITECTURE.md
│   ├── SEO_ARCHITECTURE.md
│   ├── CONTENT_MODEL.md
│   ├── KEYWORD_MAP.md
│   ├── REDIRECT_MAP.md
│   ├── ANALYTICS_PLAN.md
│   ├── SECURITY.md
│   ├── DEPLOYMENT.md
│   ├── QA_CHECKLIST.md
│   └── CONTENT_VERIFICATION.md
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── todo.md
├── package.json
├── tsconfig.json
├── eslint.config.*
├── README.md
└── .env.example
```

Adapt to the existing repository instead of destroying a working structure without assessment.

---

# 09. DESIGN SYSTEM

## 9.1 Brand character

The interface should communicate:

- premium
- architectural
- engineering-led
- precise
- trustworthy
- modern
- Dubai-oriented
- professional
- technically competent

Do not make it resemble:
- cheap contractor templates
- generic WordPress themes
- overdone agency sites
- SaaS dashboards
- crypto websites

## 9.2 Visual foundation

Use Goldland's existing dark navy/blue identity as the foundation.

Suggested token model:

```css
--color-brand-primary
--color-brand-primary-strong
--color-brand-primary-soft
--color-accent
--color-background
--color-surface
--color-surface-elevated
--color-text
--color-text-muted
--color-border
--color-success
--color-warning
--color-danger
```

Do not randomly invent a large palette.

## 9.3 Typography

Use a professional sans-serif family with:
- high readability
- strong numerals
- good Arabic fallback
- variable font where practical

Keep font loading optimized.

## 9.4 Layout

Use:
- wide content container
- architectural grid
- strong baseline spacing
- generous whitespace
- restrained border system
- premium cards
- clear CTA hierarchy

## 9.5 Themes

Support:

- Light
- Dark

Respect system preference initially.

Remember user preference.

Do not simply invert colors.

Every component must have intentional light/dark treatment.

---

# 10. INFORMATION ARCHITECTURE

Primary navigation:

```text
Home
Authority Approvals
Project Approvals
Design & Engineering
Project Management
Projects
Case Studies
Guides
About
Team
Reviews
Contact
```

Recommended route structure:

```text
/
├── authority-approvals/
│   ├── dubai-municipality/
│   ├── dda/
│   ├── dcd/
│   ├── trakhees/
│   ├── dewa/
│   ├── rta/
│   ├── jafza/
│   ├── diez/
│   ├── dubai-south/
│   ├── dha/
│   ├── dhcc/
│   ├── concordia/
│   └── developer-approvals/
│
├── project-approvals/
│   ├── warehouse/
│   ├── warehouse-mezzanine/
│   ├── mezzanine-floor/
│   ├── villa-modification/
│   ├── commercial-fitout/
│   ├── restaurant/
│   ├── cafe/
│   ├── salon/
│   ├── pharmacy/
│   ├── clinic/
│   ├── office/
│   ├── shop/
│   ├── swimming-pool/
│   ├── signage/
│   └── structural-modification/
│
├── design-engineering/
│   ├── architectural-design/
│   ├── structural-design/
│   ├── mep/
│   ├── hvac/
│   ├── electrical/
│   ├── plumbing-drainage/
│   ├── fire-safety-design/
│   ├── shop-drawings/
│   ├── space-planning/
│   └── 3d-visualization/
│
├── project-management/
│
├── projects/
├── case-studies/
├── guides/
├── reviews/
├── team/
├── about/
└── contact/
```

---

# 11. HOMEPAGE REQUIREMENTS

## Section 1 — Hero

Recommended H1:

**Dubai Authority Approvals, Engineering & Fit-Out**

Supporting copy must explain:
- service
- geography
- customer
- outcome

Primary CTA:
**GET AN APPROVAL ASSESSMENT**

Secondary:
**WHATSAPP AN ENGINEER**

Tertiary:
**VIEW REAL PROJECTS**

## Section 2 — Approval qualification

Headline:

**What Approval Do You Need?**

Step 1:
Project type

Step 2:
Authority

Step 3:
Service

Step 4:
Lead/contact

Project options:
- Warehouse
- Mezzanine
- Office
- Restaurant
- Cafe
- Clinic
- Pharmacy
- Salon
- Villa
- Retail
- Other

Authority options must come from verified CMS data.

## Section 3 — Authority approvals

Use:
- authority name
- short useful description
- text link
- logo only where appropriate and permitted

Avoid a page made solely of logos.

## Section 4 — Project types

Cards:
- Warehouse
- Mezzanine
- Office
- Restaurant
- Clinic
- Pharmacy
- Salon
- Retail
- Villa
- Commercial Fit-Out

## Section 5 — Why Goldland

Use evidence-driven differentiators:

- Real Project Experience
- Engineering & Design Capability
- Documentation Support
- Authority Coordination
- Inspection Coordination
- Project Management

Numbers only when verified.

## Section 6 — Real projects

Feature real project imagery.

Card:
- project
- location
- type
- authority
- scope
- CTA

## Section 7 — Approval process

Use a visual timeline:

```text
01 ASSESS
02 DESIGN
03 DOCUMENT
04 SUBMIT
05 REVISE
06 INSPECT
07 COMPLETE
```

Do not imply every authority follows exactly this process.

## Section 8 — Evidence

Show:
- project photographs
- certificates
- before/after
- case studies
- drawings
- team
- credentials

Only approved/authorized evidence.

## Section 9 — Reviews

Real reviews only.

## Section 10 — FAQ

Visible crawlable content.

## Section 11 — AI assistant

CTA:
**Talk to a Goldland Approval Specialist**

## Section 12 — Final CTA

**GET YOUR PROJECT ASSESSED**

---

# 12. AUTHORITY PAGE TEMPLATE

Example:

`/authority-approvals/dda/`

Required sections:

1. Hero
2. What the authority is / what is relevant to the service
3. When approval may be relevant
4. Project types
5. Goldland service scope
6. Design/engineering considerations
7. Documentation
8. Approval process
9. Inspection/comment handling
10. Common issues
11. Real projects
12. Evidence
13. FAQs
14. Related services
15. Related project types
16. Related guides
17. CTA

Every authority page must:
- be indexable
- have unique metadata
- be internally linked
- contain real useful information
- avoid unverified procedural claims

---

# 13. PROJECT APPROVAL PAGE TEMPLATE

Example:

`/project-approvals/warehouse-mezzanine/`

Sections:

1. Hero
2. What the service involves
3. Who may need it
4. Site/project considerations
5. Engineering/design considerations
6. Documentation
7. Authority coordination
8. Inspection
9. Common approval problems
10. Real projects
11. Before/after
12. Related authorities
13. Related services
14. FAQs
15. CTA

---

# 14. PROJECT DATABASE

Create CMS-backed project records.

Fields:

```text
id
title
slug
status
projectType
location
area
authority
year
clientType
scope
services[]
disciplines[]
challenge
solution
process
result
approvalStatus
photos[]
beforeAfter[]
drawings[]
documents[]
certificate[]
videos[]
testimonial
relatedAuthorities[]
relatedServices[]
relatedGuides[]
seoTitle
metaDescription
canonical
ogImage
publishedAt
lastReviewedAt
```

Statuses:
- draft
- review
- published
- archived

---

# 15. CASE STUDY TEMPLATE

Required structure:

```text
Project Overview
Client/Project Context
Challenge
Goldland Scope
Design & Engineering
Authority Coordination
Submission
Comments/Revisions
Inspection
Result
Evidence
Before/After
Gallery
Testimonial
Related Services
Related Authority
Related Guides
CTA
```

Only verified facts.

If a result is confidential:
- omit it
- provide generalized information
- mark content as restricted internally

---

# 16. EVIDENCE SYSTEM

Create a reusable component:

**REAL PROJECTS. REAL EVIDENCE.**

Supported evidence:

- approved project photographs
- approval certificates
- authority submission examples
- redacted drawings
- before/after
- site photographs
- project locations
- team profiles
- engineering credentials
- trade license information
- client testimonials
- Google reviews
- real project categories

Evidence rules:

1. Authentic
2. Authorized
3. Traceable
4. Correctly captioned
5. Properly redacted
6. Never misrepresented

Never publish:
- identity documents
- private client data
- confidential drawings
- passwords
- API keys
- private project addresses
- sensitive internal records

---

# 17. TRUST / CREDENTIALS

Build a trust layer using real evidence.

Possible sections:

- Company information
- Trade license
- Professional registrations
- Engineering credentials
- Certifications
- Team
- Project evidence
- Reviews
- Office details

Only show credentials that Goldland can substantiate.

---

# 18. TEAM SYSTEM

Create:

`/team/`

Team profile fields:

```text
name
role
qualification
experience
specialization
credentials
bio
photo
linkedin
authorPageSlug
```

For technical guides, consider:
- Author
- Technical reviewer
- Last reviewed date

Never fabricate professional qualifications.

---

# 19. REVIEWS SYSTEM

Create:

`/reviews/`

Support:
- Google review excerpts
- testimonials
- service category
- project category
- source
- date
- permission status

Potential categories:
- Authority Approvals
- Fit-Out
- Mezzanine
- Design
- MEP
- Construction
- Project Management

Review schema must only be used when appropriate under current search-engine rules.

Never fabricate:
- rating
- review text
- customer
- project
- review count

---

# 20. KNOWLEDGE HUB

Route:

`/guides/`

This is not a generic blog.

Brand it as:

**Goldland Dubai Approval Guide**

Content clusters:

## Authority guides
- DDA
- Dubai Municipality
- DCD
- Trakhees
- DEWA
- RTA
- JAFZA
- DIEZ
- Dubai South
- DHA
- DHCC

## Project guides
- Warehouse
- Warehouse Mezzanine
- Mezzanine
- Villa Modification
- Restaurant
- Clinic
- Pharmacy
- Office
- Shop
- Salon

## Process guides
- Authority submission
- Required documentation
- Approval drawings
- Inspection
- Common comments
- Revision process

## Engineering guides
- Structural
- MEP
- HVAC
- Fire safety
- Electrical
- Plumbing

---

# 21. TOPICAL AUTHORITY MODEL

Build topic graphs, not isolated pages.

Example:

```text
DDA
├── DDA Approval Dubai
├── DDA Documents
├── DDA Process
├── DDA Fit-Out
├── DDA Mezzanine
├── DDA Warehouse
└── DDA Case Studies
```

Warehouse:

```text
Warehouse
├── Warehouse Approval Dubai
├── Warehouse Mezzanine
├── Structural Design
├── Fire Safety
├── MEP
└── Warehouse Case Studies
```

Restaurant:

```text
Restaurant
├── Restaurant Approval
├── Municipality
├── Fire Safety
├── MEP
├── Kitchen Design
├── Gas
└── Restaurant Case Studies
```

Each graph must be represented through real internal links.

---

# 22. KEYWORD-TO-PAGE OWNERSHIP

Maintain `/docs/KEYWORD_MAP.md`.

Example:

| Search Intent | Canonical URL |
|---|---|
| DDA approval Dubai | `/authority-approvals/dda/` |
| DDA approval documents | `/guides/dda-approval-documents/` |
| DDA approval process | `/guides/dda-approval-process/` |
| warehouse approval Dubai | `/project-approvals/warehouse/` |
| warehouse mezzanine approval Dubai | `/project-approvals/warehouse-mezzanine/` |
| mezzanine approval Dubai | `/project-approvals/mezzanine-floor/` |
| DCD approval Dubai | `/authority-approvals/dcd/` |

Before publishing any new page:
- check existing intent owner
- check for duplication
- check cannibalization
- check whether improvement is better than new page

---

# 23. INTERNAL LINKING RULES

Every substantial page should link to:

- parent topic
- related authority
- related project type
- relevant service
- related guide
- relevant project/case study
- conversion CTA

Do not create random “related posts”.

Links should represent actual semantic relationships.

---

# 24. DUBAI AUTHORITY DIRECTORY

Create:

`/dubai-authority-approvals/`

This can become a high-value hub.

Include:

- Authority directory
- Project selector
- Approval concepts
- Process explanation
- Documentation
- Engineering/design
- Inspection
- Real Goldland projects
- FAQs
- Assessment CTA

The page must be useful as a standalone resource.

---

# 25. AUTHORITY / PROJECT MATRIX

Create a data-driven matrix.

Rows:
Project types

Columns:
Authorities

Values:
- Applicable
- Potentially applicable
- Scope-dependent
- Location-dependent
- Verification required

Never present uncertain requirements as facts.

Add a visible notice:

> Final approval requirements can vary by project scope, location, authority jurisdiction, building status and current regulations. Goldland should verify the applicable pathway for each project.

This language is a template; review before publication.

---

# 26. SEARCH/FILTER SYSTEM

Projects and case studies must support filtering by:

- Authority
- Project type
- Service
- Location
- Year

Important:

Do not allow every filter combination to become indexable.

Prevent SEO index explosion from parameterized/filter URLs.

Only deliberately selected combinations should become SEO landing pages.

---

# 27. SEO METADATA SYSTEM

Every indexable page must support:

```text
title
description
canonical
robots
openGraphTitle
openGraphDescription
openGraphImage
twitterCard
```

Generate programmatically from CMS where possible.

Never duplicate titles across pages.

---

# 28. TECHNICAL SEO

Implement:

- HTTPS
- clean URLs
- canonical URLs
- XML sitemap
- robots.txt
- 301 redirects
- 404 page
- semantic HTML
- unique metadata
- breadcrumbs
- valid structured data
- image alt text
- descriptive filenames
- internal links
- no orphan pages
- no accidental noindex
- no duplicate canonical conflicts

Important SEO copy must be present in server-rendered/search-accessible HTML.

---

# 29. STRUCTURED DATA

Use only when appropriate:

- Organization
- LocalBusiness / ProfessionalService
- Service
- WebPage
- BreadcrumbList
- Article
- Person
- ImageObject
- VideoObject
- FAQPage where eligible and supported
- Review-related markup only where permitted and accurate

Never:
- invent ratings
- invent reviews
- mark invisible content
- claim credentials that are not visible and verified

---

# 30. LOCAL SEO

Maintain consistent:

**Name**
GOLDLAND CONTRACTING L.L.C

**Phone**
+971 58 308 8189

**Telephone**
+971 4 229 2800

**Email**
sales@goldlandcontracting.ae

**Address**
Office 102, Abdulla Khalifa Building,
Al Qusais Industrial Area 1,
Damascus Street,
Dubai, UAE

**VERIFY THESE VALUES AT FINAL IMPLEMENTATION.**

Requirements:
- consistent NAP
- Google Business Profile
- structured business information
- appropriate local citations
- genuine Dubai-focused project evidence
- no fake area pages

---

# 31. CONVERSION ARCHITECTURE

Primary CTA:

**GET AN APPROVAL ASSESSMENT**

Secondary:
**WHATSAPP AN ENGINEER**

Third:
**CALL GOLDLAND**

Fourth:
**EMAIL GOLDLAND**

## Lead form

Fields:

- name
- phone
- email
- project type
- location
- authority
- required service
- project details
- optional file upload

Use progressive disclosure so the form is not intimidating.

---

# 32. LEAD QUALIFIER

Recommended flow:

```text
PROJECT
↓
AUTHORITY
↓
SERVICE
↓
LOCATION
↓
DRAWINGS?
↓
SCOPE
↓
CONTACT
↓
ASSESSMENT
```

Do not automatically issue technical/legal/authority conclusions.

Use language such as:
- “may be relevant”
- “requires confirmation”
- “Goldland team can review”

where necessary.

---

# 33. CHATBOT ARCHITECTURE

Name:

**Goldland Approval Assistant**

## Functional model

```text
Visitor
  ↓
Chat UI
  ↓
Server
  ↓
Intent detection
  ↓
Knowledge retrieval
  ↓
Verified Goldland content
  ↓
LLM response generation
  ↓
Safety/claim checks
  ↓
Answer / escalate
```

## Knowledge sources

- authorities
- services
- project types
- documents
- processes
- FAQs
- verified company information
- published guides
- approved case studies
- approved internal knowledge

## Never hallucinate

The chatbot must never fabricate:
- fees
- requirements
- approval results
- credentials
- partnerships
- project counts
- review ratings
- timelines

If data is unavailable:

> “This needs confirmation from Goldland’s technical/approval team.”

## Escalation

Provide:
- WhatsApp
- phone
- email
- lead form

## Page-aware behavior

Examples:

DDA page:
- prioritize DDA questions

Warehouse page:
- prioritize warehouse questions

Mezzanine page:
- prioritize structural/mezzanine questions

Restaurant page:
- prioritize restaurant/authority/MEP topics

Still allow free-form questions.

---

# 34. CHATBOT KNOWLEDGE BASE ADMIN

Admin can:

- add knowledge
- edit knowledge
- publish/unpublish
- mark verified
- assign reviewer
- set last reviewed
- archive outdated content
- review unanswered questions

Knowledge record:

```text
id
title
category
content
source
verified
reviewer
lastReviewedAt
status
relatedAuthority
relatedService
relatedProjectType
```

---

# 35. AI SAFETY LAYER

Every AI response should pass through a claim policy.

Potential response states:

- `verified`
- `qualified`
- `needs-human-confirmation`

High-risk questions:
- legal
- compliance
- authority requirements
- fees
- official deadlines
- safety
- engineering decisions

should receive cautious answers with human-verification guidance.

---

# 36. MEDIA ARCHITECTURE

Organize media by purpose:

```text
brand/
projects/
case-studies/
team/
certificates/
authority-evidence/
guides/
videos/
```

Use:
- WebP
- AVIF where useful
- responsive sizes
- lazy loading below fold
- explicit dimensions
- compression
- proper caching

Do not load huge original images into cards.

---

# 37. BEFORE/AFTER COMPONENT

Create an accessible before/after slider.

Requirements:
- keyboard accessible
- touch friendly
- no CLS
- lazy loaded
- labels
- captions
- optional project metadata

Use only genuine before/after project media.

---

# 38. DOCUMENT / CERTIFICATE VIEWER

For public documents:
- show thumbnails
- use redacted versions
- allow zoom
- protect originals where necessary

For private customer uploads:
- private storage
- signed access
- retention policy
- deletion policy
- audit logs

---

# 39. SECURITY ARCHITECTURE

Mandatory:

- HTTPS
- secure cookies
- CSRF protection where relevant
- input validation
- server-side authorization
- rate limiting
- anti-spam
- upload restrictions
- malware handling workflow
- secure headers
- no exposed API keys
- no service-role keys client-side
- logs without sensitive secrets
- backups
- dependency updates

## Upload restrictions

Validate:
- extension
- MIME type
- file size
- filename
- content signature where practical

Never trust browser-provided MIME types alone.

---

# 40. PRIVACY

Collect only necessary customer information.

Provide:
- Privacy Policy
- Terms where appropriate
- data retention policy
- file-upload handling notice
- contact details for privacy requests where required

Never store sensitive documents longer than operationally necessary.

---

# 41. ACCESSIBILITY

Target WCAG-conscious UX.

Requirements:
- semantic HTML
- keyboard navigation
- visible focus
- good color contrast
- accessible labels
- accessible dialogs
- accessible accordions
- accessible chatbot
- descriptive alt text
- logical heading hierarchy
- reduced motion
- usable forms

Test with:
- keyboard
- screen-reader smoke test
- automated accessibility scan

---

# 42. PERFORMANCE

Targets:

- LCP < 2.5s
- INP < 200ms
- CLS < 0.1

Optimize:

- server rendering
- image sizes
- AVIF/WebP
- lazy loading
- preload only critical assets
- font strategy
- code splitting
- minimal client JS
- CDN/cache
- compression
- database indexes
- API response times

Do not sacrifice valuable SEO content only to obtain an artificial performance score.

---

# 43. ANIMATION RULES

Permitted:
- reveal-on-scroll
- subtle parallax
- hover states
- card transitions
- count-up statistics
- timeline motion
- image transitions
- microinteractions

Not permitted:
- animation blocking content
- heavy 3D scenes as default
- excessive particle effects
- huge animation libraries without clear value
- delayed content rendering purely for spectacle

Respect:

`prefers-reduced-motion`

---

# 44. ANALYTICS EVENT PLAN

Track at minimum:

```text
cta_click
approval_assessment_start
approval_assessment_complete
form_start
form_submit
whatsapp_click
phone_click
email_click
chat_open
chat_lead
chat_escalation
file_upload
project_view
case_study_view
guide_view
authority_page_view
review_click
```

Attach:
- page path
- authority
- project type
- service
- campaign
- UTM data
- timestamp

Avoid collecting unnecessary personal information in analytics events.

---

# 45. SEO MONITORING

Use:
- Google Search Console
- GA4
- rank monitoring
- sitemap/indexing monitoring
- Core Web Vitals
- backlink monitoring where available
- content freshness monitoring

Monthly review should cover:

1. organic clicks
2. impressions
3. CTR
4. average position
5. queries
6. landing pages
7. indexing
8. sitemap
9. Core Web Vitals
10. conversions
11. top growth pages
12. declining pages
13. new queries
14. cannibalization
15. internal linking opportunities
16. competitor changes

---

# 46. CONTENT GOVERNANCE

Every authority/process article should have:

```text
Author
Reviewer
Last reviewed
Source/reference
Verification status
```

Recommended statuses:

- draft
- technical-review
- seo-review
- approved
- published
- needs-update
- archived

This is especially important because authority procedures may change.

---

# 47. CONTENT QA

Before publishing an authority-related page, check:

- business claim verified?
- authority claim verified?
- document list verified?
- process verified?
- timeline verified?
- fee verified?
- project evidence authorized?
- statistics verified?
- credential verified?
- CTA correct?
- internal links present?
- metadata unique?
- schema correct?

If any critical answer is “no”:
do not publish the unsupported claim.

---

# 48. COMPETITOR STRATEGY

Research competitors:

- Bin Moosa
- Taslleeh
- Fitout Approvals
- other relevant Dubai authority-approval companies

Analyze:

- service taxonomy
- content depth
- authority pages
- project pages
- review signals
- trust signals
- UX
- internal linking
- titles
- FAQs
- local SEO
- backlinks where available

Do not copy.

## Competitive advantage for Goldland

The moat should be:

**real projects**
+
**real evidence**
+
**real team**
+
**real approvals**
+
**engineering knowledge**
+
**original case studies**
+
**verified reviews**

A competitor can copy a keyword.
They cannot easily copy Goldland's authentic evidence library.

---

# 49. GEO / AI SEARCH READINESS

Design content so that AI search systems can understand:

- who Goldland is
- where Goldland operates
- what services are provided
- which authorities/projects are relevant
- what proof exists
- who the experts are
- which cases were completed

Make key information explicit in HTML.

Use:
- structured data
- clear headings
- authoritative page titles
- concise answer sections
- project facts
- people/expert information
- citations/source references within appropriate guides

Do not create special fake “AI pages”.

---

# 50. CONTENT ENTITY GRAPH

Think of Goldland as a graph:

```text
Goldland
│
├── Authorities
│   ├── DDA
│   ├── DM
│   ├── DCD
│   └── ...
│
├── Services
│   ├── Approval Coordination
│   ├── Architectural
│   ├── MEP
│   └── ...
│
├── Projects
│   ├── Warehouse
│   ├── Mezzanine
│   ├── Office
│   └── ...
│
├── People
│
├── Guides
│
└── Reviews
```

Each entity should have explicit relations.

---

# 51. CMS DATA MODEL

## Authority

```text
id
name
slug
shortDescription
description
jurisdiction
logo
websiteUrl
verificationStatus
services[]
projectTypes[]
documents[]
process[]
faqs[]
projects[]
guides[]
seo
```

## Service

```text
id
name
slug
category
shortDescription
description
scope
authorities[]
projectTypes[]
documents[]
process[]
faqs[]
projects[]
guides[]
seo
```

## Project

See Section 14.

## Team Member

See Section 18.

## Review

```text
id
reviewerName
source
rating
date
service
project
content
permissionStatus
verified
```

## Guide

```text
id
title
slug
category
primaryEntity
secondaryEntities[]
content
author
reviewer
sourceReferences[]
lastReviewedAt
status
seo
```

## FAQ

```text
id
question
answer
authority
service
projectType
verified
reviewer
lastReviewedAt
status
```

---

# 52. DATABASE RELATIONSHIPS

Preferred relationships:

```text
Authority
  ↕
Service
  ↕
ProjectType
  ↕
Project
  ↕
CaseStudy
  ↕
Guide
  ↕
FAQ
```

Many-to-many relationships should use junction tables rather than repeated text arrays when query/reporting needs justify it.

Index:
- slug
- status
- published_at
- authority_id
- project_type_id
- service_id
- location where practical

---

# 53. ADMIN DASHBOARD

Modules:

```text
Dashboard
Authorities
Services
Project Types
Projects
Case Studies
Guides
FAQs
Reviews
Team
Media
Leads
Chatbot Knowledge
SEO
Redirects
Analytics
Settings
```

Dashboard indicators:

- new leads
- unpublished content
- content needing review
- unanswered chatbot questions
- recent projects
- SEO alerts
- failed forms
- system health

---

# 54. LEADS DATABASE

Fields:

```text
id
name
phone
email
projectType
location
authority
service
message
fileReferences
sourcePage
utmSource
utmMedium
utmCampaign
status
assignedTo
createdAt
updatedAt
```

Statuses:

- New
- Contacted
- Qualified
- Proposal
- Won
- Lost
- Follow-up

Do not put sensitive lead data into analytics events.

---

# 55. REDIRECT MANAGEMENT

Create admin-managed redirect records:

```text
sourcePath
destinationPath
statusCode
reason
createdAt
updatedAt
```

Allow only:
- 301
- 302 when explicitly required

Prevent redirect chains.

Prevent loops.

Test all high-value redirects.

---

# 56. SEO HEALTH TOOLING

If practical, implement an admin SEO-health page checking:

- missing title
- missing description
- duplicate title
- duplicate slug
- missing canonical
- noindex
- missing H1
- broken related links
- missing alt text
- orphan page
- invalid structured data payload
- unpublished related content
- thin content flag
- outdated review date

This is a QA aid, not a substitute for external crawlers.

---

# 57. ROUTING RULES

Use human-readable slugs.

Good:

`/authority-approvals/dda/`

Bad:

`/service?id=182`

Use nested routes when they communicate hierarchy.

Avoid unnecessary locale prefixes until multilingual implementation is actually launched.

Reserve future:

`/ar/...`

architecture if Arabic is planned.

---

# 58. INTERNATIONALIZATION READINESS

Build content model so that:
- English is primary
- Arabic can be added later
- text is not hard-coded into image assets
- metadata can be localized
- slugs can be localized if needed
- structured data can support language attributes

Do not ship incomplete Arabic pages merely for SEO.

---

# 59. IMAGE SEO

Filename example:

`dubai-warehouse-mezzanine-approval-goldland.webp`

Alt example:

`Warehouse mezzanine project completed by Goldland in Dubai`

Caption when useful:

`Warehouse mezzanine project — Dubai`

Do not write alt text that claims something not visible.

---

# 60. VIDEO STRATEGY

Use short videos where they actually add value:

- project walkthrough
- before/after
- approval explainer
- engineering process
- site progress
- client testimonial

Videos should:
- be compressed
- lazy loaded
- poster image optimized
- caption/subtitle where appropriate

Do not autoplay heavy video with sound.

---

# 61. HOMEPAGE TRUST STRIP

Design a reusable component:

```text
REAL PROJECTS
REAL ENGINEERING
REAL EVIDENCE
REAL TEAM
REAL REVIEWS
```

Each item should open a meaningful destination.

---

# 62. FAQ SYSTEM

FAQ sources should be:
- actual sales questions
- actual chatbot unanswered questions
- engineer-reviewed questions
- authority-related questions

Every answer should be concise but genuinely useful.

Do not create 50 artificial questions merely to increase page length.

---

# 63. CONTENT REFRESH SYSTEM

For authority/process guides:
- review quarterly or at a suitable interval based on change rate
- immediately review when authority rules change
- record last-reviewed date
- flag stale pages in admin

For project pages:
- generally immutable after publication except corrections/additions

For company information:
- review on material company change

---

# 64. SEO CANNIBALIZATION CONTROL

Before creating a page:

```text
QUERY
↓
SEARCH INTENT
↓
EXISTING OWNER?
↓
YES → IMPROVE / CONSOLIDATE
NO → CREATE
```

Never create:
- near-duplicate authority pages
- city/area pages with no unique content
- multiple pages with the same primary intent
- AI-spun variants of the same article

---

# 65. LOCATION SEO

Only create location pages when there is genuine unique value.

Possible legitimate contexts may include:
- actual project locations
- authority jurisdictions
- industrial zones
- free zones
- operational service areas

Do not create:

`/dda-approval-al-qusais/`
`/dda-approval-jlt/`
`/dda-approval-business-bay/`

just because the names have search volume.

---

# 66. BROCHURE DIGITIZATION STRATEGY

Use the existing brochure as source content, but upgrade it.

Existing brochure strengths:
- clear three-pillar structure
- authority list
- project management
- design services
- contact details
- authority/developer logos

New digital version should additionally include:
- real project evidence
- team
- certificates
- case studies
- testimonials
- process
- project categories
- QR/CTA
- authority directory

---

# 67. URL MIGRATION PRINCIPLES

Preserve strong legacy URLs where reasonable.

When changing:
- map old → new
- 301 old → best equivalent
- update internal links
- update canonicals
- update sitemap
- monitor Search Console

Never leave old and new versions competing indefinitely.

---

# 68. DEPLOYMENT STRATEGY

## Before deployment

1. Build
2. Type-check
3. Lint
4. Test
5. Accessibility scan
6. SEO crawl
7. Lighthouse/PageSpeed
8. Link test
9. Form test
10. Chatbot test
11. Upload test
12. Analytics test
13. Redirect test
14. Sitemap test
15. Robots test
16. Schema test
17. Security test

## Deployment

Use preview deployment for every meaningful change.

Production deployment requires:
- green tests
- migration backup
- reversible changes
- documented release notes

---

# 69. DATABASE MIGRATION RULES

Never perform destructive migrations without:

- backup
- migration file
- rollback plan
- affected-table analysis
- staging test

Avoid deleting existing columns/tables simply because new architecture no longer uses them.

Mark deprecated first.
Remove only after safe migration period.

---

# 70. BACKUP / RECOVERY

Back up:
- database
- storage metadata
- critical content
- redirects
- CMS configuration

Document:
- RPO
- RTO
- recovery procedure

No secret keys inside backups that are shared publicly.

---

# 71. OBSERVABILITY

Monitor:

Application errors
API errors
DB errors
AI errors
Form failures
Upload failures
Performance
Uptime

Create alerts for:
- critical server error spikes
- failed lead submissions
- chatbot API outage
- storage failure

---

# 72. RATE LIMITING

Rate-limit:

- lead form
- chatbot
- upload endpoint
- admin login
- public API endpoints

Add abuse protection to prevent:
- spam
- credential stuffing
- chatbot abuse
- file upload abuse

---

# 73. SEO SITEMAPS

Potential sitemaps:

```text
/sitemap.xml
```

Generated dynamically.

Include:
- authority pages
- service pages
- project pages
- case studies
- guides
- team
- reviews where indexable

Do not include:
- admin
- search
- filter parameters
- draft pages
- noindex pages
- temporary pages

---

# 74. ROBOTS RULES

Disallow:
- admin
- internal APIs
- private paths
- irrelevant query paths

Do not block legitimate public SEO content.

---

# 75. 404 STRATEGY

Custom 404 should:
- explain page missing
- link to main services
- link to authority approvals
- link to project approvals
- link to projects
- include search/contact CTA

Do not redirect every missing URL to homepage.

---

# 76. ERROR STATES

Design polished states for:

- loading
- empty
- not found
- upload failed
- form failed
- chatbot unavailable
- server error

Never expose stack traces to visitors.

---

# 77. UX COMPONENT INVENTORY

Build reusable components:

```text
Header
MegaMenu
MobileMenu
Breadcrumbs
Hero
CTASection
AuthorityCard
ServiceCard
ProjectCard
CaseStudyCard
EvidenceCard
StatsStrip
ProcessTimeline
FAQAccordion
ReviewCard
TeamCard
ContactForm
LeadQualifier
Chatbot
BeforeAfterSlider
ProjectGallery
CertificateGallery
AuthorityMatrix
RelatedContent
RelatedServices
RelatedProjects
TrustStrip
VideoLightbox
Search
FilterBar
Pagination
```

---

# 78. HEADER

Desktop:
- logo
- Authority Approvals
- Project Approvals
- Design & Engineering
- Projects
- Guides
- About
- CTA

Mobile:
- menu
- sticky CTA
- WhatsApp/call

Header should remain lightweight.

---

# 79. FOOTER

Include:

- company identity
- services
- authority approvals
- project types
- projects
- guides
- contact
- address
- phone
- email
- WhatsApp
- social links where verified
- privacy
- terms
- sitemap

Do not overwhelm with 100 links.

---

# 80. SEARCH EXPERIENCE

Create site search for:

- authorities
- services
- projects
- guides
- FAQs

Search result cards should indicate category:

`Authority`
`Project`
`Guide`
`Service`

Use semantic ranking.

---

# 81. CONTENT AUTHORING FLOW

```text
Draft
↓
Technical Review
↓
SEO Review
↓
Evidence Verification
↓
Publish
↓
Monitor
↓
Refresh
```

No production publication directly from unreviewed AI generation.

---

# 82. AI CONTENT POLICY

AI can assist with:
- outline
- research organization
- FAQ grouping
- internal links
- summaries
- metadata suggestions

AI must not independently invent:
- authority rules
- credentials
- project evidence
- reviews
- statistics
- client names
- legal claims

Use human review for technical/authority-sensitive information.

---

# 83. PROJECT PHOTO POLICY

For every real Goldland project:

Capture, where permitted:
- site context
- before
- during
- after
- completed space
- relevant design/detail
- authority evidence

Store metadata:
- project ID
- date
- photographer/source
- permission status

---

# 84. CLIENT CONSENT

Before publishing:
- client name
- logo
- testimonial
- project photographs
- location
- drawings
- certificates

record permission status.

Suggested CMS:

```text
permissionStatus:
pending
approved
restricted
revoked
```

If revoked:
unpublish or replace promptly.

---

# 85. CONTENT EVIDENCE SCORE

Optional internal scoring system:

```text
0 = no evidence
1 = company claim only
2 = internal documentation
3 = project evidence
4 = project + document evidence
5 = third-party evidence + project evidence
```

Use internally to prioritize strong pages.

Do not show this score publicly.

---

# 86. PAGE QUALITY SCORE

Optional internal score:

```text
Intent Match
Content Depth
Originality
Evidence
Internal Links
Technical SEO
UX
Conversion
Freshness
```

Mark pages needing improvement.

---

# 87. FEATURE PRIORITIES

## P0 — Must have

- Homepage
- Authority pages
- Project approval pages
- Project database
- Case studies
- Contact/lead system
- SEO foundation
- Analytics
- CMS
- Mobile UX
- Security
- Core Web Vitals
- Domain migration strategy

## P1 — High value

- AI chatbot
- authority matrix
- advanced project filters
- reviews
- team profiles
- evidence gallery
- before/after
- guide hub
- admin SEO tools

## P2 — Valuable enhancements

- video library
- advanced search
- richer CRM integration
- automated SEO QA
- content freshness alerts

## P3 — Later

- multilingual launch
- customer portal
- advanced predictive lead scoring
- advanced analytics warehouse

---

# 88. PHASED IMPLEMENTATION ROADMAP

## PHASE 0 — DISCOVERY

Tasks:
- inspect repository
- inspect current routes
- inspect components
- inspect dependencies
- inspect current website
- inventory URLs
- inventory assets
- inspect analytics
- inspect domain structure
- inspect existing content
- inspect current SEO
- identify duplicates

Deliverable:
`docs/DISCOVERY_REPORT.md`

Do NOT rebuild before this phase is complete.

---

## PHASE 1 — ARCHITECTURE

Tasks:
- finalize sitemap
- finalize route model
- finalize database schema
- finalize CMS entities
- finalize design system
- finalize SEO model
- finalize redirect map
- finalize analytics events
- finalize security architecture
- finalize deployment plan

Deliverables:
- PRD
- Architecture
- Content model
- SEO architecture
- Keyword map
- Redirect map
- Design system

---

## PHASE 2 — FOUNDATION

Build:
- Next.js app
- TypeScript strict
- Tailwind
- design tokens
- layout
- header
- footer
- theme system
- analytics abstraction
- database
- auth/admin foundation
- storage
- SEO utilities
- sitemap
- robots
- structured data utilities

---

## PHASE 3 — CORE SEO PAGES

Build:
- homepage
- authority index
- authority template
- project approval index
- project approval template
- design/engineering pages
- project management
- contact

---

## PHASE 4 — EVIDENCE PLATFORM

Build:
- projects
- case studies
- before/after
- document evidence
- certificate gallery
- team
- reviews

---

## PHASE 5 — KNOWLEDGE HUB

Build:
- guides
- categories
- authors
- reviewers
- FAQs
- related content
- search
- internal linking

---

## PHASE 6 — AI ASSISTANT

Build:
- knowledge base
- retrieval
- chatbot UI
- lead capture
- human escalation
- page awareness
- admin
- analytics
- safety layer

---

## PHASE 7 — SEO / LOCAL / ANALYTICS

Complete:
- metadata
- schema
- sitemap
- internal links
- NAP
- GBP connection
- conversions
- Search Console
- GA4
- dashboards

---

## PHASE 8 — MIGRATION

- redirect implementation
- legacy URL mapping
- canonical checks
- old-content consolidation
- domain checks
- production crawl
- Search Console validation

---

## PHASE 9 — QA

Run:
- functionality
- SEO
- accessibility
- performance
- security
- mobile
- forms
- uploads
- chatbot
- analytics
- redirects

---

## PHASE 10 — LAUNCH

Launch only after release gates pass.

Then monitor:
- indexing
- errors
- traffic
- conversions
- ranking changes
- Core Web Vitals

---

# 89. RELEASE GATES

No production launch until all P0 items are:

- built
- tested
- reviewed
- documented

Critical gate failures:
- broken forms
- exposed secrets
- incorrect redirects
- wrong canonical
- accidental noindex
- missing sitemap
- severe mobile layout issue
- inaccessible CTA
- broken analytics
- fabricated/unverified content

---

# 90. AUTOMATED QA CHECKLIST

## Code

```text
[ ] TypeScript clean
[ ] Lint clean
[ ] Tests pass
[ ] Build passes
[ ] No console errors
[ ] No secrets in repository
```

## SEO

```text
[ ] Titles unique
[ ] Descriptions unique
[ ] Canonicals valid
[ ] Robots valid
[ ] Sitemap valid
[ ] No accidental noindex
[ ] H1 structure correct
[ ] Structured data valid
[ ] Internal links valid
[ ] 404 correct
[ ] Redirects tested
```

## UX

```text
[ ] Mobile
[ ] Tablet
[ ] Desktop
[ ] Keyboard
[ ] Dark theme
[ ] Light theme
[ ] Reduced motion
[ ] Forms
[ ] Uploads
[ ] Chatbot
```

## Performance

```text
[ ] LCP target
[ ] INP target
[ ] CLS target
[ ] Images optimized
[ ] Fonts optimized
[ ] JS minimized
[ ] Caching configured
```

---

# 91. MANUAL QA MATRIX

Test:

### Browsers
- Chrome
- Safari
- Edge
- Firefox

### Device classes
- small mobile
- standard mobile
- large mobile
- tablet
- laptop
- desktop
- large desktop

### Functional
- nav
- search
- filters
- forms
- WhatsApp
- phone
- email
- chatbot
- uploads
- lightbox
- before/after

### Accessibility
- keyboard
- visible focus
- labels
- contrast
- screen reader smoke test

---

# 92. SEO LAUNCH CHECKLIST

```text
[ ] Important pages indexable
[ ] No accidental noindex
[ ] Sitemap submitted
[ ] Robots validated
[ ] Canonicals correct
[ ] Redirects validated
[ ] Broken links fixed
[ ] Duplicate pages handled
[ ] Unique metadata
[ ] Schema validated
[ ] Images optimized
[ ] ALT text complete
[ ] Internal links complete
[ ] Breadcrumbs correct
[ ] Open Graph correct
[ ] Mobile UX validated
[ ] Core Web Vitals validated
```

---

# 93. CONTENT LAUNCH CHECKLIST

```text
[ ] All critical authority claims verified
[ ] All credentials verified
[ ] All statistics verified
[ ] All reviews genuine
[ ] All project evidence authorized
[ ] All project locations verified
[ ] All team credentials verified
[ ] All approval process content reviewed
[ ] All guide dates populated
[ ] No obvious AI filler
[ ] No keyword stuffing
[ ] No duplicate intent pages
```

---

# 94. SEO CONTENT ROADMAP

Priority order:

## Cluster 1
DDA

## Cluster 2
Dubai Municipality

## Cluster 3
DCD

## Cluster 4
Trakhees

## Cluster 5
DEWA

## Cluster 6
Warehouse

## Cluster 7
Mezzanine

## Cluster 8
Villa Modification

## Cluster 9
Commercial Fit-Out

Then expand to:
- restaurant
- clinic
- pharmacy
- office
- retail
- salon
- structural modification
- signage
- other verified business categories

Each cluster should include:
- money page
- supporting guides
- FAQs
- case studies
- real evidence
- internal links

---

# 95. FIRST-HAND EXPERTISE STRATEGY

Goldland's strongest future content should come from:

- engineers
- architects
- project managers
- authority coordinators
- actual project records
- site photos
- real approval examples
- actual customer questions

Create an internal process to convert real operational knowledge into:
- guides
- FAQs
- case studies
- project notes
- chatbot knowledge

---

# 96. SEARCH CONSOLE FEEDBACK LOOP

Monthly process:

```text
Search Console
↓
New queries
↓
Map query to existing page
↓
Improve page
OR
create missing intent page
↓
Internal linking
↓
Monitor
```

Never create pages automatically from every query.

---

# 97. CHATBOT FEEDBACK LOOP

```text
User question
↓
Answered?
YES → log topic
NO → unanswered queue
↓
Expert verifies answer
↓
Knowledge base updated
↓
Chatbot improves
```

This creates a continuously improving Goldland knowledge system.

---

# 98. PROJECT FEEDBACK LOOP

Every completed project should trigger:

```text
Project completed
↓
Collect approved evidence
↓
Create project record
↓
Create case study
↓
Attach authorities
↓
Attach services
↓
Attach project type
↓
Attach testimonial
↓
Publish
↓
Add internal links
```

This continuously grows the site's topical authority.

---

# 99. SEO MOAT STRATEGY

The website must become harder to copy over time.

Build:

```text
Real Projects
+
Real Photos
+
Real Documents
+
Real Team
+
Real Expertise
+
Real Reviews
+
Authority Knowledge
+
Case Studies
+
First-Hand Guides
+
Structured Relationships
```

This is the core long-term advantage.

---

# 100. ANTI-PATTERNS

Do NOT:

1. Build everything as one huge homepage.
2. Publish duplicate service pages.
3. Make every city an SEO page.
4. Generate hundreds of AI articles.
5. Copy competitor text.
6. Use generic stock images as project proof.
7. Fake statistics.
8. Fake reviews.
9. Invent approval requirements.
10. Expose API keys.
11. Put important SEO copy behind client-only interaction.
12. Let filter URLs generate thousands of indexable pages.
13. Use heavy JS unnecessarily.
14. Create schema for invisible content.
15. Guarantee authority outcomes without evidence.
16. Replace every useful existing URL blindly.
17. Rewrite the database destructively without migration planning.

---

# 101. DEFINITION OF DONE — WEBSITE

A page is “done” only when:

```text
Content
+
UX
+
SEO
+
Accessibility
+
Performance
+
Security
+
Analytics
+
Internal linking
+
Conversion
+
Evidence
```

have been considered.

---

# 102. DEFINITION OF DONE — PROJECT

A project is done when:

```text
[ ] Requirements documented
[ ] Design approved
[ ] Data model complete
[ ] Code complete
[ ] Tests pass
[ ] Security checked
[ ] SEO checked
[ ] Accessibility checked
[ ] Performance checked
[ ] Analytics tested
[ ] Production tested
[ ] Documentation updated
```

---

# 103. REQUIRED DOCUMENTATION FILES

Maintain these documents throughout development:

```text
docs/PRD.md
docs/DISCOVERY_REPORT.md
docs/ARCHITECTURE.md
docs/DESIGN_SYSTEM.md
docs/SEO_ARCHITECTURE.md
docs/CONTENT_MODEL.md
docs/KEYWORD_MAP.md
docs/REDIRECT_MAP.md
docs/ANALYTICS_PLAN.md
docs/SECURITY.md
docs/DEPLOYMENT.md
docs/QA_CHECKLIST.md
docs/CONTENT_VERIFICATION.md
docs/AI_KNOWLEDGE_POLICY.md
todo.md
```

Do not let these become stale.

---

# 104. GIT WORKFLOW

Recommended:

```text
main
├── develop
├── feature/*
├── fix/*
└── chore/*
```

Rules:
- small commits
- descriptive messages
- review before merge
- never commit secrets
- never directly make huge unexplained rewrites
- tag releases

Suggested format:

```text
feat: add authority page template
fix: correct DDA canonical generation
seo: add warehouse internal links
perf: optimize project image loading
security: harden document upload validation
```

---

# 105. ANTIGRAVITY / AI CODING AGENT INSTRUCTIONS

## VERY IMPORTANT

Do not start by rewriting the application.

First:

1. inspect repository
2. inspect routes
3. inspect components
4. inspect database
5. inspect dependencies
6. inspect current SEO
7. inspect content
8. inspect assets
9. inspect deployment
10. produce discovery report

Then:

11. produce architecture proposal
12. produce page map
13. produce database model
14. produce implementation roadmap
15. identify risks
16. obtain implementation decision from project owner where genuinely blocked

Then implement in phases.

## Do not:

- fabricate missing data
- delete useful functionality without analysis
- change domains casually
- create duplicate SEO pages
- expose secrets
- install unnecessary dependencies
- generate giant monolithic components
- create fake content to fill layouts

---

# 106. ANTIGRAVITY REQUIRED FIRST RESPONSE

Before implementation, the coding agent should report:

```text
A. Current architecture
B. Existing routes
C. Existing content/entities
D. Existing SEO
E. Technical debt
F. Current dependencies
G. Current deployment
H. Recommended target architecture
I. Migration risks
J. Implementation phases
K. Files/components it intends to create or modify
```

Only then proceed.

---

# 107. ACCEPTANCE TEST — STRATEGIC

The finished product should allow a visitor searching:

**“DDA approval Dubai”**

to land on:
- authoritative DDA page
- related project types
- guides
- real Goldland projects
- evidence
- CTA

For:

**“warehouse mezzanine approval Dubai”**

the journey should be:

```text
Mezzanine
→ Warehouse
→ Engineering
→ Authority
→ Project
→ Evidence
→ Lead
```

For:

**“Dubai Municipality approval”**

the journey should be:

```text
DM
→ Project type
→ Service
→ Process
→ Documentation
→ Case study
→ Assessment
```

---

# 108. BUSINESS SUCCESS METRICS

The platform should be evaluated on:

## SEO
- qualified organic clicks
- impressions
- non-brand visibility
- commercial query coverage
- indexed useful pages
- ranking improvements
- organic landing-page conversions

## Conversion
- approval assessments
- WhatsApp leads
- calls
- form submissions
- qualified leads
- chatbot-assisted leads

## Trust
- project evidence count
- review volume/quality
- case studies
- team profiles
- verified credentials

## Product
- page speed
- mobile usability
- error rate
- chatbot answer quality
- admin publishing speed

---

# 109. MONTHLY OPERATING LOOP

Every month:

```text
Search Console
+
GA4
+
Rankings
+
Core Web Vitals
+
Technical SEO
+
Content performance
+
Competitor changes
+
Leads
+
Chatbot questions
+
Project evidence
↓
Prioritized actions
```

Prioritize:
1. critical technical problems
2. high-intent conversion opportunities
3. declining high-value pages
4. content gaps
5. evidence gaps
6. internal-link opportunities
7. new project/case-study publishing
8. long-term content opportunities

---

# 110. PROJECT OWNER INPUTS STILL REQUIRED

These should be collected before final content population:

### Company
- exact current legal name
- exact phone numbers
- exact email(s)
- exact address
- company description
- service boundaries

### Credentials
- trade license
- registrations
- engineering credentials
- certifications
- insurance where applicable

### Team
- names
- roles
- qualifications
- experience
- photos
- approved biographies

### Projects
- project list
- locations
- project types
- authorities
- dates
- scopes
- photographs
- approval evidence
- client permissions

### Reviews
- official Google Business Profile
- approved testimonials
- review links

### Business claims
- verified years
- verified project count
- verified approval count
- verified staff count
- verified sectors

No number should be inserted until supplied/verified.

---

# 111. FUTURE-READY FEATURES

Design the architecture so these can be added later without a rebuild:

- Arabic
- customer portal
- quote management
- CRM integration
- appointment scheduling
- document status tracking
- approval status notifications
- advanced search
- AI document analysis
- approval checklist generator
- project dashboards
- downloadable project reports
- automated follow-up workflows

Do not build all of these in V1.

---

# 112. RECOMMENDED V1 SCOPE

V1 should prioritize:

```text
Homepage
Authority pages
Project approval pages
Design/engineering pages
Projects
Case studies
Guides
Reviews
Team
Contact
Lead capture
CMS/admin
SEO
Analytics
Performance
Security
```

AI chatbot can be V1/P1 depending on timeline, but the architecture must be prepared from the beginning.

---

# 113. OFFICIAL TECHNICAL REFERENCES

Use official documentation as the implementation authority for framework/platform details:

- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Supabase: https://supabase.com/docs
- Google Search Central: https://developers.google.com/search
- Google structured data guidance: https://developers.google.com/search/docs/appearance/structured-data
- Google people-first content guidance: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

At project initialization, confirm current stable versions rather than hard-coding old versions from this document.

---

# 114. FINAL PRINCIPLE

The website must not become:

**“another Dubai contracting website.”**

It must become:

**Goldland's digital authority platform.**

The final architecture should connect:

```text
SEARCH INTENT
        ↓
AUTHORITY
        ↓
PROJECT TYPE
        ↓
ENGINEERING
        ↓
DESIGN
        ↓
DOCUMENTATION
        ↓
APPROVAL
        ↓
REAL PROJECT
        ↓
REAL EVIDENCE
        ↓
REAL EXPERT
        ↓
REAL REVIEW
        ↓
REAL LEAD
```

The strongest long-term SEO asset is not a large quantity of AI-generated pages.

It is a continuously growing repository of verified Goldland knowledge and evidence:

**real projects + real documentation + real engineers + real case studies + real reviews + verified authority information.**

---

# 115. FINAL INSTRUCTION TO THE IMPLEMENTATION AGENT

Before changing code:

**AUDIT → ARCHITECT → DESIGN → MODEL → IMPLEMENT → TEST → MIGRATE → DEPLOY → MONITOR → IMPROVE**

Do not skip:

- discovery
- architecture
- content verification
- migration planning
- SEO mapping
- security review
- performance review
- final QA

Build for:
- search engines
- humans
- engineers
- sales teams
- content editors
- future developers
- future AI systems

Build a system that remains maintainable when Goldland has:
- more authorities
- more projects
- more services
- more team members
- more guides
- more reviews
- more leads

The architecture must scale without requiring a full redesign.

**END OF MASTER REQUIREMENTS**

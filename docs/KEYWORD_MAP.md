# Keyword Intent Ownership Map

This document clarifies the semantic boundaries and search intents between Goldland's different routing schemas, specifically addressing potential cannibalization between `/authority-approvals` and `/project-approvals`.

## 1. Authority Approval Intent (`/authority-approvals/[slug]`)

**Target Audience:** Users searching for how to navigate a specific government or free zone jurisdiction.
**Core Search Intent:** Regulatory, Compliance, "How to get approval from [X]", Document checklists.
**Primary Keywords:** "[Authority] approval", "[Authority] fit-out NOC", "[Authority] engineer checklist".

### Examples:
- `/authority-approvals/dubai-municipality`
  - Targets: "Dubai Municipality fit out approval", "DM NOC for mezzanine"
- `/authority-approvals/dda`
  - Targets: "DDA approval process", "TECOM fit out NOC requirements"
- `/authority-approvals/dcd`
  - Targets: "Civil defence approval Dubai", "DCD fire drawing submission"

---

## 2. Project/Building Intent (`/project-approvals/[slug]`)

**Target Audience:** Users searching for how to build or fit-out a specific *type of space*, regardless of the jurisdiction it falls under.
**Core Search Intent:** Construction, "How to build a [X] in Dubai", "Contractor for [X]".
**Primary Keywords:** "[Project Type] fit out Dubai", "[Project Type] construction approval", "Build a [Project Type]".

### Examples:
- `/project-approvals/warehouse`
  - Targets: "Warehouse fit out Dubai", "Warehouse construction approval"
- `/project-approvals/mezzanine`
  - Targets: "Steel mezzanine approval Dubai", "Add mezzanine to warehouse"
- `/project-approvals/restaurant`
  - Targets: "Restaurant fit out contractor Dubai", "Restaurant DM approval process"

## 3. The Cross-Linking Strategy

Because these intents do not overlap, they should **not** be consolidated. Instead, they should cross-link to form a hub-and-spoke model:

1. **A user lands on `/project-approvals/warehouse`**
   - The page explains *how* Goldland builds warehouses.
   - It links out: "Depending on your location, you will need [Dubai Municipality](/authority-approvals/dubai-municipality) or [Trakhees](/authority-approvals/trakhees) approval."

2. **A user lands on `/authority-approvals/dda`**
   - The page explains the specific DDA portal process and landlord NOC requirements.
   - It links out: "See how we applied these rules in our recent [Office Fit-Out Case Study](/projects/office-fitout-media-city)."

**Conclusion:** Maintain both routing structures. Do not apply 301 redirects between them. Ensure H1s explicitly target the "Approval Process" vs the "Building Type" to maintain distinct SERP footprints.

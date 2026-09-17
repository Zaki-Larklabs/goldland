/**
 * Registry of portal-editable frontend texts.
 * Each entry maps a (page, key) to its label + hardcoded default.
 * Pages render `default` when no DB row exists — nothing ever breaks.
 * To make more copy editable: add an entry here + use getContent() in the page.
 */
export type ContentEntry = { page: string; key: string; label: string; default: string };

export const CONTENT_REGISTRY: ContentEntry[] = [
  {
    page: "home",
    key: "hero_sub",
    label: "Homepage — hero supporting paragraph",
    default:
      "Engineering-led authority approval support for construction, fit-out, renovation and modification projects across Dubai.",
  },
  {
    page: "home",
    key: "trust_1",
    label: "Homepage — trust bar item 1",
    default: "10+ Years of Experience",
  },
  {
    page: "home",
    key: "trust_2",
    label: "Homepage — trust bar item 2",
    default: "20+ Authority Jurisdictions",
  },
  {
    page: "home",
    key: "trust_3",
    label: "Homepage — trust bar item 3",
    default: "500+ Approvals Filed",
  },
  {
    page: "home",
    key: "trust_4",
    label: "Homepage — trust bar item 4",
    default: "In-House Engineering Team",
  },
  {
    page: "home",
    key: "cta_title",
    label: "Homepage — final CTA heading",
    default: "Ready to Move Your Project Forward?",
  },
  {
    page: "home",
    key: "cta_desc",
    label: "Homepage — final CTA description",
    default:
      "Share your drawings, project details or current approval requirement. Goldland can help you understand the likely engineering and authority path for your project.",
  },
  {
    page: "services",
    key: "hero_sub",
    label: "Services — hero supporting paragraph",
    default:
      "Goldland Contracting provides engineering, authority approval and project support for commercial, industrial and development projects across Dubai.",
  },
  {
    page: "about",
    key: "hero_desc",
    label: "About — hero description",
    default:
      "Goldland Contracting LLC is a Dubai-based engineering and contracting company specializing in Dubai authority approvals, engineering design, fit-out and project coordination. Since 2016, our team has supported clients with authority submissions, technical drawings, MEP coordination and compliance requirements across Dubai's mainland, free zones and other regulated jurisdictions.",
  },
  {
    page: "contact",
    key: "hero_title",
    label: "Contact — hero heading",
    default: "Let's Get Started",
  },
  {
    page: "contact",
    key: "hero_sub",
    label: "Contact — hero supporting line",
    default: "Send us your project details and we'll get back to you quickly.",
  },
  {
    page: "footer",
    key: "tagline",
    label: "Footer — company tagline",
    default:
      "Interior fitout, MEP design and Dubai authority approvals — handled end to end from Al Qusais, Dubai.",
  },
];

export const CONTENT_PAGES = Array.from(new Set(CONTENT_REGISTRY.map((e) => e.page)));

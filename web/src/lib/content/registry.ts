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
  {
    page: "authority-approvals",
    key: "hero_desc",
    label: "Authority Approvals — hero description",
    default:
      "Goldland navigates the full landscape of Dubai's government and free zone authorities. We file, follow up, and close — so your project stays on schedule.",
  },
  {
    page: "guides",
    key: "hero_desc",
    label: "Guides — hero description",
    default:
      "Expert-reviewed guides covering design constraints, MEP regulations, and authority submission procedures across Dubai.",
  },
  {
    page: "guides",
    key: "list_title",
    label: "Guides — article list heading",
    default: "Latest Guides",
  },
  {
    page: "home",
    key: "faq_a1",
    label: "Homepage — FAQ answer: What are Dubai authority approvals?",
    default:
      "Dubai authority approvals are permits, NOCs and technical approvals required for certain construction, fit-out, renovation and modification projects. Depending on the project, approvals may involve DDA, Dubai Municipality, DCD, DEWA, Trakhees, JAFZA and other authorities.",
  },
  {
    page: "home",
    key: "faq_a2",
    label: "Homepage — FAQ answer: Which authority approval does my project need?",
    default:
      "It depends on your project's location, property type and scope of work. Goldland Contracting can assess your project and identify the relevant authority and approval requirements.",
  },
  {
    page: "home",
    key: "faq_a3",
    label: "Homepage — FAQ answer: Do villa modifications require approval?",
    default:
      "Yes, many villa modifications require approval before work begins. Requirements depend on the property's location, community and type of modification.",
  },
  {
    page: "home",
    key: "faq_a4",
    label: "Homepage — FAQ answer: Swimming pool or mezzanine approval?",
    default:
      "Yes, swimming pool construction and mezzanine floor projects may require approval from the relevant authority. The requirements depend on the property and project scope.",
  },
  {
    page: "home",
    key: "faq_a5",
    label: "Homepage — FAQ answer: How long does approval take?",
    default:
      "Approval time varies depending on the authority, project type and completeness of the submitted documents. Goldland Contracting manages the submission and coordination process to help avoid unnecessary delays.",
  },
  {
    page: "about",
    key: "why_desc",
    label: "About — Why Goldland section paragraph",
    default:
      "Authority approvals are closely connected to engineering, documentation and compliance. Our approach combines technical expertise with authority submission support, helping clients avoid common issues caused by incorrect drawings, missing documentation or submission to the wrong jurisdiction.",
  },
  {
    page: "about",
    key: "cta_title",
    label: "About — closing CTA heading",
    default: "Need Help With Dubai Authority Approvals?",
  },
  {
    page: "about",
    key: "cta_desc",
    label: "About — closing CTA description",
    default:
      "Tell us your project location and type of work. Our team can help identify the relevant authority requirements and guide you through the approval process.",
  },
  {
    page: "team",
    key: "hero_desc",
    label: "Team — hero description",
    default:
      "We don't outsource our expertise. Every drawing, calculation, and authority submission is managed by our in-house team of verified technical professionals.",
  },
  {
    page: "reviews",
    key: "hero_desc",
    label: "Reviews — hero description",
    default:
      "We don't fabricate testimonials. Every review listed below has been verified against a real contract and explicit client permission.",
  },
  {
    page: "credentials",
    key: "hero_desc",
    label: "Credentials — hero description",
    default:
      "Transparency is a core engineering principle. Below is our current registry of trade licenses, authority approvals, and operational certifications.",
  },
  {
    page: "faqs",
    key: "hero_desc",
    label: "FAQs — hero description",
    default:
      "Clear, verified answers to the most common questions regarding Dubai fit-out approvals, design, and engineering.",
  },
  {
    page: "faqs",
    key: "faq_a1",
    label: "FAQs — answer: How long does DM approval take?",
    default:
      "Standard approvals typically take 3-5 working days assuming all documents and drawings are correct upon first submission. Complex projects may take longer.",
  },
  {
    page: "faqs",
    key: "faq_a2",
    label: "FAQs — answer: DCD approval without sprinkler changes?",
    default:
      "Yes, Civil Defence (DCD) approval is often required for any partition changes, as the layout affects fire exit routes and safety compliance, even if sprinklers are untouched.",
  },
  {
    page: "faqs",
    key: "faq_a3",
    label: "FAQs — answer: Landlord NOC help?",
    default:
      "Yes. Goldland's project management team coordinates directly with building management, developers, and landlords to acquire the necessary NOCs.",
  },
  {
    page: "faqs",
    key: "faq_a4",
    label: "FAQs — answer: DDA vs Dubai Municipality?",
    default:
      "DDA (Dubai Development Authority) governs specific free zones like Dubai Media City and Internet City, while Dubai Municipality (DM) governs the mainland and certain other areas. The jurisdiction depends strictly on your project's location.",
  },
];

export const CONTENT_PAGES = Array.from(new Set(CONTENT_REGISTRY.map((e) => e.page)));

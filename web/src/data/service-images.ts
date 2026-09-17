// Centralized image configuration for Services page
// Enables CMS migration: every card references this map, not hardcoded paths.
// Images use existing public assets; alt text is meaningful, not keyword-stuffed.

export type ServiceImage = {
  slug: string;
  image: string;
  alt: string;
  category: "authority" | "engineering" | "projectType" | "hero";
};

// Hero — premium architectural (existing assets; hero-bg.jpg is primary)
export const HERO_IMAGE: ServiceImage = {
  slug: "hero",
  image: "/images/hero-bg.jpg",
  alt: "Premium contemporary commercial building in Dubai — architectural engineering visualization",
  category: "hero",
};

// Authority images — reuse authority logos + hero fallback until per-authority photography supplied
// IMPORTANT: these are illustrative, not claims of partnership. Alt clarifies service context.
export const AUTHORITY_IMAGES: Record<string, ServiceImage> = {
  dda: { slug: "dda", image: "/images/hero-bg.jpg", alt: "Dubai Development Authority approval services in Dubai", category: "authority" },
  "dubai-municipality": { slug: "dubai-municipality", image: "/images/hero-bg.jpg", alt: "Dubai Municipality building and fit-out approval services", category: "authority" },
  dcd: { slug: "dcd", image: "/images/hero-bg.jpg", alt: "Dubai Civil Defence fire and life safety approval services", category: "authority" },
  dewa: { slug: "dewa", image: "/images/hero-bg.jpg", alt: "DEWA electricity and water connection approval support", category: "authority" },
  rta: { slug: "rta", image: "/images/hero-bg.jpg", alt: "RTA approval coordination for Dubai projects", category: "authority" },
  trakhees: { slug: "trakhees", image: "/images/hero-bg.jpg", alt: "Trakhees free zone approval services", category: "authority" },
  "dubai-south": { slug: "dubai-south", image: "/images/hero-bg.jpg", alt: "Dubai South economic zone approval services", category: "authority" },
  jafza: { slug: "jafza", image: "/images/hero-bg.jpg", alt: "JAFZA Jebel Ali Free Zone approval services", category: "authority" },
  emaar: { slug: "emaar", image: "/images/hero-bg.jpg", alt: "Emaar community approval coordination services", category: "authority" },
  nakheel: { slug: "nakheel", image: "/images/hero-bg.jpg", alt: "Nakheel community approval coordination services", category: "authority" },
  tecom: { slug: "tecom", image: "/images/hero-bg.jpg", alt: "TECOM DCCA free zone approval services", category: "authority" },
  concordia: { slug: "concordia", image: "/images/hero-bg.jpg", alt: "Concordia community approval coordination services", category: "authority" },
  sharjah: { slug: "sharjah", image: "/images/hero-bg.jpg", alt: "Sharjah Municipality approval coordination services", category: "authority" },
  solar: { slug: "solar", image: "/images/hero-bg.jpg", alt: "DEWA Shams solar energy approval services", category: "authority" },
  "fire-systems": { slug: "fire-systems", image: "/images/hero-bg.jpg", alt: "Fire systems and life safety approval services", category: "authority" },
};

export const AUTHORITY_LOGO: Record<string, string> = {
  dda: "/images/authority-logos/dda.png",
  "dubai-municipality": "/images/authority-logos/dubai-municipality.png",
  dcd: "/images/authority-logos/dcd.png",
  dewa: "/images/authority-logos/dewa.png",
  rta: "/images/authority-logos/rta.png",
  trakhees: "/images/authority-logos/trakhees.png",
  "dubai-south": "/images/authority-logos/dubai-south.png",
  jafza: "/images/authority-logos/jafza.png",
  diez: "/images/authority-logos/diez.png",
  concordia: "/images/authority-logos/concordia.png",
  emaar: "/images/authority-logos/emaar.png",
  nakheel: "/images/authority-logos/nakheel.png",
  tecom: "/images/authority-logos/tecom.png",
  sharjah: "/images/authority-logos/sharjah.png",
  solar: "/images/authority-logos/solar.png",
  "fire-systems": "/images/authority-logos/fire-systems.png",
};

// Project type images — curated from existing public/images; each has distinct file to avoid monotony
// These are VISUAL ILLUSTRATIONS, not Goldland project photos — actual projects are in /projects (Featured)
export const PROJECT_TYPE_IMAGES: Record<string, ServiceImage> = {
  warehouse: { slug: "warehouse", image: "/images/a.png", alt: "Modern Dubai industrial warehouse interior illustration", category: "projectType" },
  "commercial-fit-out": { slug: "commercial-fit-out", image: "/images/d.png", alt: "High-end commercial interior fit-out illustration", category: "projectType" },
  "commercial-fitout": { slug: "commercial-fitout", image: "/images/d.png", alt: "High-end commercial interior fit-out illustration", category: "projectType" },
  "mezzanine-floor": { slug: "mezzanine-floor", image: "/images/b.png", alt: "Steel mezzanine structure inside warehouse illustration", category: "projectType" },
  office: { slug: "office", image: "/images/c.png", alt: "Premium Dubai commercial office fit-out illustration", category: "projectType" },
  restaurant: { slug: "restaurant", image: "/images/d.png", alt: "High-end restaurant interior fit-out illustration", category: "projectType" },
  clinic: { slug: "clinic", image: "/images/a.png", alt: "Modern medical clinic interior illustration", category: "projectType" },
  "villa-modification": { slug: "villa-modification", image: "/images/b.png", alt: "Luxury Dubai villa exterior and modification illustration", category: "projectType" },
  shop: { slug: "shop", image: "/images/c.png", alt: "Premium retail storefront fit-out illustration", category: "projectType" },
  "architectural-design": { slug: "architectural-design", image: "/images/c.png", alt: "Architectural design and documentation services", category: "engineering" },
  "mep-engineering": { slug: "mep-engineering", image: "/images/b.png", alt: "MEP engineering design services", category: "engineering" },
};

// Helper
export function getAuthorityImage(slug: string): ServiceImage {
  return AUTHORITY_IMAGES[slug] ?? { slug, image: "/images/hero-bg.jpg", alt: `${slug} approval services in Dubai`, category: "authority" };
}
export function getProjectTypeImage(slug: string): ServiceImage {
  return PROJECT_TYPE_IMAGES[slug] ?? { slug, image: "/images/a.png", alt: `${slug} project approval illustration`, category: "projectType" };
}

import { siteConfig } from "./config";

/**
 * Global LocalBusiness / Organization Schema
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.company.name,
    image: siteConfig.ogImage,
    "@id": siteConfig.url,
    url: siteConfig.url,
    telephone: siteConfig.company.phone,
    email: siteConfig.company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.company.address.streetAddress,
      addressLocality: siteConfig.company.address.addressLocality,
      addressRegion: siteConfig.company.address.addressRegion,
      postalCode: siteConfig.company.address.postalCode,
      addressCountry: siteConfig.company.address.addressCountry,
    },
    // We do NOT add aggregateRating or reviews here unless they are dynamically verified by the DB.
    // Speculative schema injections violate the "Do not generate schema for unsupported claims" rule.
  };
}

/**
 * Article Schema for Guides & Case Studies
 */
export function generateArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string; // Must only be provided if verified in DB
}) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    image: siteConfig.ogImage,
    url: params.url,
    publisher: {
      "@type": "Organization",
      name: siteConfig.company.name,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.ogImage,
      },
    },
  };

  // Strictly only inject data if it exists (No unsupported claims/hallucinations)
  if (params.datePublished) schema.datePublished = params.datePublished;
  if (params.dateModified) schema.dateModified = params.dateModified;
  if (params.authorName) {
    schema.author = {
      "@type": "Person",
      name: params.authorName,
    };
  }

  return schema;
}

/**
 * BreadcrumbList Schema for navigation structure
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

import type { Metadata } from "next";

export const siteConfig = {
  name: "Goldland Contracting",
  shortName: "Goldland",
  url: "https://goldlandcontracting.ae",
  description: "Dubai's premier engineering-led fit-out and authority approval specialists.",
  ogImage: "https://goldlandcontracting.ae/og.jpg",
  twitterHandle: "@goldlanddxb",
  company: {
    name: "Goldland Contracting LLC",
    phone: "+971 50 123 4567",
    email: "info@goldlandcontracting.ae",
    address: {
      streetAddress: "Office 104, Business Bay",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      postalCode: "00000",
      addressCountry: "AE"
    }
  }
};

/**
 * Standardize Metadata generation across all Next.js Server Components.
 */
export function generateMetadataCore(
  title: string, 
  description: string, 
  pathname: string, 
  noindex = false
): Metadata {
  const url = `${siteConfig.url}${pathname}`;
  
  return {
    title: {
      default: title,
      template: "%s | Goldland Contracting",
    },
    description: description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_AE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
  };
}

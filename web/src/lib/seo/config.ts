import type { Metadata } from "next";

export const siteConfig = {
  name: "Goldland Contracting",
  shortName: "Goldland",
  url: "https://goldlandcontracting.ae",
  description: "Dubai's premier engineering-led fit-out and authority approval specialists.",
  ogImage: "https://goldlandcontracting.ae/og.jpg",
  twitterHandle: "@goldlanddxb",
  company: {
    name: "Goldland Contracting L.L.C.",
    phone: "+971566321734",
    phoneSecondary: "+97142292800",
    email: "sales@goldlandcontracting.ae",
    address: {
      streetAddress: "Office 102, Abdulla Khalifa Bldg, Al Qusais Industrial Area 1, Damascus Street",
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
  noindex = false,
  keywords?: string[]
): Metadata {
  const url = `${siteConfig.url}${pathname}`;
  
  return {
    title: {
      default: title,
      template: "%s | Goldland Contracting",
    },
    description: description,
    keywords,
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

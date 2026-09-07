import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Script from "next/script";
import { Chatbot } from "@/components/chatbot/Chatbot";
import { ThemeProvider } from "@/components/theme-provider";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { RealtimeLeadToaster } from "@/components/ui/RealtimeLeadToaster";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Goldland Contracting LLC",
  "image": "https://goldlandcontracting.ae/images/og-image.jpg",
  "@id": "https://goldlandcontracting.ae",
  "url": "https://goldlandcontracting.ae",
  "telephone": "+971566321734",
  "email": "info@goldlandcontracting.ae",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Dubai",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "AE"
  },
  "areaServed": "Dubai",
  "description": "Expert Dubai Authority Approvals, Engineering, Design, Fit-Out and Project Management."
};

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Goldland Contracting LLC | Dubai Authority Approvals & Fit-Out",
    template: "%s | Goldland Contracting LLC"
  },
  description: "Expert Dubai Authority Approvals, Engineering, Design, Fit-Out and Project Management. We support your approval journey with DM, DDA, DCD, DEWA, and Trakhees.",
  keywords: ["Dubai Authority Approvals", "DDA Approval", "Dubai Municipality Approval", "DCD Approval", "Fit-out Contractors Dubai", "MEP Engineering Dubai", "Goldland Contracting", "Warehouse Approvals"],
  authors: [{ name: "Goldland Contracting LLC" }],
  creator: "Goldland Contracting LLC",
  publisher: "Goldland Contracting LLC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://goldlandcontracting.ae",
    siteName: "Goldland Contracting LLC",
    title: "Goldland Contracting LLC | Dubai Authority Approvals & Fit-Out",
    description: "Expert Dubai Authority Approvals, Engineering, Design, Fit-Out and Project Management. Get approved with DM, DDA, DCD, and DEWA.",
    images: [
      {
        url: "https://goldlandcontracting.ae/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Goldland Contracting LLC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Goldland Contracting LLC | Dubai Authority Approvals",
    description: "Expert Dubai Authority Approvals, Engineering, Design, Fit-Out and Project Management.",
    images: ["https://goldlandcontracting.ae/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://goldlandcontracting.ae",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <Script
              id="ga4-init"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SplashScreen />
          <Header />
          <main className="flex-1 overflow-x-hidden">
            {children}
          </main>
          <StickyMobileBar />
          <Chatbot />
          <RealtimeLeadToaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

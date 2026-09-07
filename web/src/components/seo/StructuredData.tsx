import React from "react";
import Script from "next/script";

type SchemaType = "LocalBusiness" | "Service" | "FAQPage" | "BreadcrumbList" | "WebSite" | "Organization" | "Article";

interface StructuredDataProps {
  type?: SchemaType;
  data: Record<string, any>;
  id?: string;
}

export function StructuredData({ data, id = "json-ld" }: StructuredDataProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

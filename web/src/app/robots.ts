import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo/config'

export const revalidate = 3600;

export default async function robots(): Promise<MetadataRoute.Robots> {
  // Allow DB seoRecords with noindex to also be reflected via dynamic disallow (optional)
  // For now keep static rules — sitemap already filters noindex, robots respects sitemap exclusion.
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/*?*utm_source=',
        '/*?*cluster='
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}

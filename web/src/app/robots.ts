import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/*?*utm_source=', // Prevent indexing URLs with tracking parameters
        '/*?*cluster=' // Prevent indexing parameterized filter URLs to avoid duplicate content
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}

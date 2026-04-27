import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/vinh09112000/', '/api/'],
    },
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
  }
}

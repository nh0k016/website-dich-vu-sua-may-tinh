import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/vinh09112000/', '/api/'],
    },
    sitemap: 'https://fastfix.com/sitemap.xml',
  }
}

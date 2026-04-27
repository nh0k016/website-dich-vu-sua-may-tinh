import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fastfix.vercel.app'

  // 1. Các trang tĩnh
  const staticPages = [
    '',
    '/san-pham',
    '/dich-vu',
    '/tin-tuc',
    '/lien-he',
    '/chinh-sach-bao-mat',
    '/dieu-khoan',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 2. Các trang dịch vụ động
  const services = await prisma.service.findMany()
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/dich-vu/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 3. Các trang sản phẩm động
  const products = await prisma.product.findMany()
  const productPages = products.map((product) => ({
    url: `${baseUrl}/san-pham/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // 4. Các trang tin tức động
  const articles = await prisma.article.findMany({
    where: { published: true }
  })
  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/tin-tuc/${article.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...servicePages, ...productPages, ...articlePages]
}

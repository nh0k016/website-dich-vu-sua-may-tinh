import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { SITE_CONFIG } from '@/lib/config'

export const revalidate = 3600 // Cập nhật lại mỗi 1 giờ
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.domain

  // 1. Các trang tĩnh
  const staticPages = [
    '',
    '/san-pham',
    '/dich-vu',
    '/bai-viet',
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
    url: `${baseUrl}/san-pham/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // 4. Các trang tin tức động
  const articles = await prisma.article.findMany({
    where: { published: true }
  })
  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/bai-viet/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...servicePages, ...productPages, ...articlePages]
}

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function listAllContent() {
  console.log('--- DANH SÁCH TOÀN BỘ NỘI DUNG TRONG DATABASE ---')

  const articles = await prisma.article.findMany()
  console.log(`\n[BÀI VIẾT - ARTICLE] (${articles.length}):`)
  articles.forEach(a => console.log(`- ${a.title}`))

  const services = await prisma.service.findMany()
  console.log(`\n[DỊCH VỤ - SERVICE] (${services.length}):`)
  services.forEach(s => console.log(`- ${s.title}`))

  const products = await prisma.product.findMany()
  console.log(`\n[SẢN PHẨM - PRODUCT] (${products.length}):`)
  products.forEach(p => console.log(`- ${p.name}`))

  console.log('\n--- KẾT THÚC LIÊT KÊ ---')
}

listAllContent()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())

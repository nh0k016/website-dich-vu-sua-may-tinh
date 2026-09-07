import { prisma } from '../src/lib/prisma';

async function checkAxiInArticles() {
  const articles = await prisma.article.findMany({
    where: {
      content: { contains: 'axi.vn' }
    },
    select: { id: true, title: true, slug: true }
  });
  console.log('Articles containing axi.vn:', articles);
}

checkAxiInArticles().catch(console.error).finally(() => prisma.$disconnect());

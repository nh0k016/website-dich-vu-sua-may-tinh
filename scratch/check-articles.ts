import { prisma } from '../src/lib/prisma';

async function check() {
  const articles = await prisma.article.findMany({
    select: { id: true, title: true, slug: true, category: true, published: true, createdAt: true },
    orderBy: { createdAt: 'desc' }
  });
  console.log('Total articles:', articles.length);
  console.log(JSON.stringify(articles, null, 2));
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

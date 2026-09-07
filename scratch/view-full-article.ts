import { prisma } from '../src/lib/prisma';

async function check() {
  const article = await prisma.article.findUnique({
    where: { slug: 've-sinh-may-tinh-laptop-quan-12' }
  });
  console.log('Title:', article?.title);
  console.log('Category:', article?.category);
  console.log('Content:\n', article?.content);
}

check().catch(console.error).finally(() => prisma.$disconnect());

import { prisma } from '../src/lib/prisma';

async function check() {
  const article = await prisma.article.findUnique({
    where: { id: 'cmpipl6b80000fq7ognmtwpxt' }
  });
  if (!article) return;
  console.log('Title:', article.title);
  console.log('Slug:', article.slug);
  console.log('Description:', article.description);
  console.log('Content snippet:', article.content?.substring(0, 300));
}

check().catch(console.error).finally(() => prisma.$disconnect());

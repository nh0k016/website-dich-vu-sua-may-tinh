import { prisma } from '../src/lib/prisma';

async function verify() {
  const article = await prisma.article.findUnique({
    where: { slug: 've-sinh-may-tinh-laptop-quan-12' }
  });
  console.log('Title:', article?.title);
  console.log('Slug:', article?.slug);
  console.log('Image:', article?.image);
  console.log('Description:', article?.description);
  console.log('Content length:', article?.content.length);
  console.log('Published:', article?.published);
}

verify().catch(console.error).finally(() => prisma.$disconnect());

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: 'quận', mode: 'insensitive' } },
        { title: { contains: 'huyện', mode: 'insensitive' } },
        { title: { contains: 'tân bình', mode: 'insensitive' } },
        { title: { contains: 'gò vấp', mode: 'insensitive' } },
        { title: { contains: 'bình thạnh', mode: 'insensitive' } },
        { title: { contains: 'bình tân', mode: 'insensitive' } }
      ]
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true
    }
  });

  console.log(JSON.stringify(articles.map(a => ({
    title: a.title,
    slug: a.slug,
    contentPreview: a.content.substring(0, 500),
    length: a.content.length
  })), null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

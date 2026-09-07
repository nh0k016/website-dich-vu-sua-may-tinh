import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAll() {
  const allArticles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      updatedAt: true
    }
  });

  const editedSlugs = [
    'sua-may-tinh-go-vap',
    'sua-may-tinh-tan-binh',
    'sua-may-tinh-quan-binh-thanh',
    'sua-may-tinh-quan-phu-nhuan',
    'sua-may-tinh-quan-10',
    'sua-may-tinh-quan-11',
    'sua-may-tinh-quan-12',
    'sua-may-tinh-binh-tan'
  ];

  const results = allArticles.map(a => {
    return {
      title: a.title,
      slug: a.slug,
      isEdited: editedSlugs.includes(a.slug),
      length: a.content.length,
      snippet: a.content.substring(0, 50).replace(/\\n/g, ' ').replace(/<[^>]+>/g, '')
    };
  });

  console.log(JSON.stringify(results, null, 2));
}

checkAll()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function convertToSlug(text: string) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/(\s+)/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  console.log('Fetching all products...');
  const products = await prisma.product.findMany();

  console.log(`Found ${products.length} products.`);

  for (const product of products) {
    const slug = convertToSlug(product.name);
    console.log(`Updating "${product.name}" -> ${slug}`);
    
    await prisma.product.update({
      where: { id: product.id },
      data: { slug }
    });
  }

  console.log('All product slugs updated!');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

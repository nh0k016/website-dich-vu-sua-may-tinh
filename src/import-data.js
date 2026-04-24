const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
require('dotenv').config();

async function main() {
  const prisma = new PrismaClient();
  const data = JSON.parse(fs.readFileSync('temp_data.json', 'utf8'));
  
  console.log('Migrating categories...');
  for (const cat of data.categories) {
    // For hierarchical categories, we need to handle parentId carefully
    // First pass: create without parentId
    await prisma.category.upsert({
      where: { id: cat.id },
      update: { name: cat.name, slug: cat.slug },
      create: { id: cat.id, name: cat.name, slug: cat.slug }
    });
  }
  
  // Second pass: update parentId
  for (const cat of data.categories) {
    if (cat.parentId) {
      await prisma.category.update({
        where: { id: cat.id },
        data: { parentId: cat.parentId }
      });
    }
  }

  console.log('Migrating products...');
  for (const prod of data.products) {
    await prisma.product.upsert({
      where: { id: prod.id },
      update: prod,
      create: prod
    });
  }

  console.log('Migrating articles...');
  for (const art of data.articles) {
    await prisma.article.upsert({
      where: { id: art.id },
      update: art,
      create: art
    });
  }

  console.log('Import completed successfully!');
  await prisma.$disconnect();
}

main().catch(console.error);

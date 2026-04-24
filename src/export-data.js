const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

async function main() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany();
  const articles = await prisma.article.findMany();
  
  const data = { categories, products, articles };
  fs.writeFileSync('temp_data.json', JSON.stringify(data, null, 2));
  console.log('Data saved to temp_data.json');
  await prisma.$disconnect();
}

main().catch(console.error);

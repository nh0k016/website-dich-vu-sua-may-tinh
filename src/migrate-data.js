const { PrismaClient: SQLiteClient } = require('@prisma/client/sqlserver'); // This is a trick, but wait
// Actually, I'll use a different approach. I'll read from SQLite using a temporary client and write to Postgres.
// But Prisma doesn't like two clients with same names.

// Better: I'll use a script that reads from SQLite (using 'sqlite3' if available) and writes to Postgres.
// Wait, I can just use Prisma with the SQLite env first, fetch everything, then switch to Postgres env and push.

// Logic:
// 1. Fetch all Categories from SQLite.
// 2. Fetch all Products from SQLite.
// 3. Fetch all Articles from SQLite.
// 4. (Switching to Postgres is done via .env)
// 5. Upsert them to Postgres.

const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

async function migrate() {
  // We need to temporarily point to SQLite to read
  console.log('Reading data from SQLite...');
  const sqliteUrl = "file:./dev.db";
  const sqlitePrisma = new PrismaClient({
    datasources: {
      db: { url: sqliteUrl }
    }
  });

  const categories = await sqlitePrisma.category.findMany();
  const products = await sqlitePrisma.product.findMany();
  const articles = await sqlitePrisma.article.findMany();
  
  console.log(`Found ${categories.length} categories, ${products.length} products, ${articles.length} articles.`);
  await sqlitePrisma.$disconnect();

  // Now connect to Postgres (using .env)
  console.log('Connecting to Supabase...');
  const postgresPrisma = new PrismaClient(); // Uses DIRECT_URL from .env

  console.log('Migrating categories...');
  for (const cat of categories) {
    await postgresPrisma.category.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat
    });
  }

  console.log('Migrating products...');
  for (const prod of products) {
    await postgresPrisma.product.upsert({
      where: { id: prod.id },
      update: prod,
      create: prod
    });
  }

  console.log('Migrating articles...');
  for (const art of articles) {
    await postgresPrisma.article.upsert({
      where: { id: art.id },
      update: art,
      create: art
    });
  }

  console.log('Migration completed successfully!');
  await postgresPrisma.$disconnect();
}

migrate().catch(e => {
  console.error('Migration failed:', e);
  process.exit(1);
});

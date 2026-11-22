import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id VARCHAR(191) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(100) NOT NULL,
      company VARCHAR(255) DEFAULT '',
      service VARCHAR(255) NOT NULL,
      budget VARCHAR(255) NOT NULL,
      message TEXT,
      status VARCHAR(50) DEFAULT 'new',
      createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
      updatedAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  console.log('Enquiries table checked/created in MySQL successfully!');
}

main()
  .catch(err => {
    console.error('Failed to create table:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

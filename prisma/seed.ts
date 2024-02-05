import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // Seed Customers
  const customer1 = await prisma.customer.create({
    data: {
      name: 'Leonel Messi',
      email: 'Leo@example.com',
      address: '123 Main St',
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Juan Perez',
      email: 'jane@example.com',
      address: '456 Elm St',
    },
  });

  // Seed Accounts
  const account1 = await prisma.account.create({
    data: {
      customerId: customer1.id,
      accountType: 'Savings',
      balance: 1000.00,
    },
  });

  const account2 = await prisma.account.create({
    data: {
      customerId: customer2.id,
      accountType: 'Checking',
      balance: 500.00,
    },
  });

  // Seed Transactions
  await prisma.transaction.createMany({
    data: [
      {
        accountId: account1.id,
        amount: 100.00,
        transactionType: 'Deposit',
      },
      {
        accountId: account2.id,
        amount: 50.00,
        transactionType: 'Withdrawal',
      },
    ],
  });

  console.log('Seed data inserted successfully');
}

seed()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

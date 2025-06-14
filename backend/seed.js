import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        firstName: 'Emma',
        lastName: 'Schnauzer',
        email: 'emma@example.com',
        password: 'test123',
      },
      {
        firstName: 'Lisa',
        lastName: 'Fujita',
        email: 'lisa@example.com',
        password: 'securepassword',
      },
    ],
  });
  console.log('Dummy users inserted!');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

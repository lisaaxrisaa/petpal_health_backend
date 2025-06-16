// __mocks__/@prisma/client.js
import { jest } from '@jest/globals';

export const PrismaClient = jest.fn(() => ({
  user: {
    findMany: jest.fn().mockResolvedValue([
      { id: 1, email: 'user1@example.com', firstName: 'User', lastName: 'One' },
      { id: 2, email: 'user2@example.com', firstName: 'User', lastName: 'Two' },
    ]),
    findUnique: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({
      id: 3,
      email: 'new@example.com',
      firstName: 'New',
      lastName: 'User',
      createdAt: new Date(),
    }),
  },
  pet: {
    findMany: jest.fn().mockResolvedValue([
      {
        id: 101,
        name: 'Emma',
        species: 'Dog',
        age: 6,
        breed: 'Mini Schnauzer',
        userId: 4,
      },
      {
        id: 102,
        name: 'Luna',
        species: 'Cat',
        age: 3,
        breed: 'Black Cat',
        userId: 4,
      },
    ]),
    deleteMany: jest.fn().mockResolvedValue(undefined),
    createMany: jest.fn().mockResolvedValue(undefined),
  },
  $disconnect: jest.fn().mockResolvedValue(undefined),
}));

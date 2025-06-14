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
}));

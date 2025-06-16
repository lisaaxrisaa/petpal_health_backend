import { jest } from '@jest/globals';

// ✅ Mock Prisma before anything else
jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    pet: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: 'Emma',
          species: 'Dog',
          breed: 'Mini Schnauzer',
          age: 7,
          userId: 4,
          createdAt: new Date('2025-06-13T19:09:53.000Z'),
        },
      ]),
    },
  })),
}));

const { getUserPets } = await import('../controllers/petController.js');
import express from 'express';
import request from 'supertest';

const app = express();
app.use(express.json());

// ✅ Instead of using the real route, define inline with fake auth
app.get('/pets', (req, res, next) => {
  req.user = { id: 4 }; // fake authenticated user
  getUserPets(req, res, next);
});

describe('GET /pets', () => {
  it('should return pets belonging to the user', async () => {
    const response = await request(app).get('/pets');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toMatchObject({
      id: 1,
      name: 'Emma',
      species: 'Dog',
      breed: 'Mini Schnauzer',
      age: 7,
      userId: 4,
    });
  });
});

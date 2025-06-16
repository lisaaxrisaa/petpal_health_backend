import { jest } from '@jest/globals';

// ✅ Mock middleware so we don't need a real token
jest.unstable_mockModule('../middleware/authMiddleware.js', () => ({
  authenticate: (req, res, next) => {
    req.user = { id: 4 };
    next();
  },
}));

// ✅ Dynamically import AFTER mocks
const request = (await import('supertest')).default;
const { prisma } = await import('../db/client.js');
const app = (await import('../app.js')).default;

beforeAll(async () => {
  await prisma.pet.deleteMany();
  await prisma.pet.createMany({
    data: [
      {
        name: 'Emma',
        species: 'Dog',
        age: 6,
        breed: 'Mini Schnauzer',
        userId: 4,
      },
      {
        name: 'Luna',
        species: 'Cat',
        age: 3,
        breed: 'Black Cat',
        userId: 4,
      },
    ],
  });
});

afterAll(async () => {
  await prisma.pet.deleteMany();
  await prisma.$disconnect();
});

describe('GET /pets', () => {
  it('should return all pets for the authenticated user', async () => {
    const response = await request(app)
      .get('/pets')
      .set('Authorization', 'Bearer fakeToken');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toMatchObject({
      name: expect.any(String),
      species: expect.any(String),
      userId: 4,
    });
  });
});

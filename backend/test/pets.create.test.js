import { jest } from '@jest/globals';

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    pet: {
      create: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Emma',
        species: 'Dog',
        breed: 'Mini Schnauzer',
        age: 7,
        userId: 4,
        createdAt: new Date().toISOString(),
      }),
    },
  })),
}));

jest.unstable_mockModule('../middleware/authMiddleware.js', () => ({
  authenticate: (req, res, next) => {
    req.user = { id: 4 };
    next();
  },
}));

const request = (await import('supertest')).default;
const app = (await import('../app.js')).default;

describe('POST /pets', () => {
  it('should create a new pet for the authenticated user', async () => {
    const newPet = {
      name: 'Emma',
      species: 'Dog',
      breed: 'Mini Schnauzer',
      age: 7,
    };

    const response = await request(app)
      .post('/pets')
      .send(newPet)
      .set('Authorization', 'Bearer fakeToken');

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      name: 'Emma',
      species: 'Dog',
      breed: 'Mini Schnauzer',
      age: 7,
      userId: 4,
    });
  });
});

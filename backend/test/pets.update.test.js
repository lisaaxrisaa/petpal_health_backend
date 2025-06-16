import { jest } from '@jest/globals';

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    pet: {
      updateMany: jest.fn().mockResolvedValue({
        count: 1,
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

describe('PUT /pets/:id', () => {
  it('should update a pet for the authenticated user', async () => {
    const updatedPet = {
      name: 'Updated Emma',
      species: 'Dog',
      breed: 'Mini Schnauzer',
      age: 8,
    };

    const response = await request(app)
      .put('/pets/1')
      .send(updatedPet)
      .set('Authorization', 'Bearer fakeToken');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Pet updated' });
  });
});

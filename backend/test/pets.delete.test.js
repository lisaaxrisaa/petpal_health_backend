import { jest } from '@jest/globals';

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    pet: {
      deleteMany: jest.fn().mockResolvedValue({
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

describe('DELETE /pets/:id', () => {
  it('should delete a pet belonging to the authenticated user', async () => {
    const response = await request(app)
      .delete('/pets/1')
      .set('Authorization', 'Bearer fakeToken');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Pet deleted successfully',
      petId: 1,
    });
  });
});

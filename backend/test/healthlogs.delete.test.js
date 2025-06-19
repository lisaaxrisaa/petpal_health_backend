import { jest } from '@jest/globals';

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    healthLog: {
      delete: jest.fn().mockResolvedValue({
        id: 3,
        petId: 5,
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

describe('DELETE /healthlogs/:id', () => {
  it('should delete a health log entry', async () => {
    const response = await request(app)
      .delete('/healthlogs/3')
      .set('Authorization', 'Bearer fakeToken');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Health log deleted',
      logId: 3,
    });
  });
});

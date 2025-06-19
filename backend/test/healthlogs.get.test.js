import { jest } from '@jest/globals';

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    healthLog: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: 1,
          date: new Date('2025-06-19T00:00:00.000Z'),
          notes: 'Feeling good',
          condition: 'Healthy',
          medicationsGiven: null,
          vetVisit: false,
          petName: 'Emma',
          createdAt: new Date().toISOString(),
          petId: 5,
        },
      ]),
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

describe('GET /healthlogs/:petId', () => {
  it('should return health logs for a specific pet', async () => {
    const response = await request(app)
      .get('/healthlogs/5')
      .set('Authorization', 'Bearer fakeToken');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toMatchObject({
      notes: 'Feeling good',
      condition: 'Healthy',
      petName: 'Emma',
      petId: 5,
    });
  });
});

import { jest } from '@jest/globals';

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    healthLog: {
      update: jest.fn().mockResolvedValue({
        id: 3,
        date: new Date('2025-06-19T00:00:00.000Z'),
        notes: 'Feeling much better today',
        condition: 'Improved',
        medicationsGiven: 'Pepto for dogs',
        vetVisit: true,
        petName: 'Emma',
        createdAt: new Date().toISOString(),
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

describe('PATCH /healthlogs/:id', () => {
  it('should update an existing health log entry', async () => {
    const response = await request(app)
      .patch('/healthlogs/3')
      .set('Authorization', 'Bearer fakeToken')
      .send({
        notes: 'Feeling much better today',
        condition: 'Improved',
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 3,
      notes: 'Feeling much better today',
      condition: 'Improved',
      petName: 'Emma',
    });
  });
});

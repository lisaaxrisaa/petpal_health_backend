import { jest } from '@jest/globals';

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    healthLog: {
      create: jest.fn().mockResolvedValue({
        id: 1,
        date: new Date('2025-06-19T00:00:00.000Z'),
        notes: 'Test log notes',
        condition: 'Stable',
        medicationsGiven: 'None',
        vetVisit: false,
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

describe('POST /healthlogs', () => {
  it('should create a new health log', async () => {
    const newLog = {
      date: '2025-06-19T00:00:00.000Z',
      notes: 'Test log notes',
      condition: 'Stable',
      medicationsGiven: 'None',
      vetVisit: false,
      petName: 'Emma',
      petId: 5,
    };

    const response = await request(app)
      .post('/healthlogs')
      .send(newLog)
      .set('Authorization', 'Bearer fakeToken');

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      notes: 'Test log notes',
      condition: 'Stable',
      medicationsGiven: 'None',
      vetVisit: false,
      petName: 'Emma',
      petId: 5,
    });
  });
});

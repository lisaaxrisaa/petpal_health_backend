import { jest } from '@jest/globals';

jest.unstable_mockModule('@prisma/client', () => ({
  __esModule: true,
  PrismaClient: jest.fn(() => ({
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({
        id: 3,
        email: 'new@example.com',
        firstName: 'New',
        lastName: 'User',
      }),
    },
  })),
}));

const { createUser } = await import('../controllers/userController.js');

describe('createUser - success', () => {
  const mockReq = {
    body: {
      email: 'new@example.com',
      firstName: 'New',
      lastName: 'User',
      password: 'testpass',
    },
  };

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user and return 201', async () => {
    await createUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      id: 3,
      email: 'new@example.com',
      firstName: 'New',
      lastName: 'User',
    });
  });
});

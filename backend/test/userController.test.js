import { jest } from '@jest/globals';

jest.unstable_mockModule('@prisma/client', () => ({
  __esModule: true,
  PrismaClient: jest.fn(() => ({
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn().mockResolvedValue({ id: 1 }),
      create: jest.fn(),
    },
  })),
}));

const { createUser } = await import('../controllers/userController.js');

describe('createUser - conflict', () => {
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

  it('should return 409 if user already exists', async () => {
    await createUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(409);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Email already registered',
    });
  });
});

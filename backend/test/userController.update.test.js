import { jest } from '@jest/globals';

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('updateUser', () => {
  beforeEach(() => {
    jest.resetModules(); // IMPORTANT to reset module cache between tests
    jest.clearAllMocks();
  });

  it('should update a user and return 200', async () => {
    const mockUser = {
      id: 1,
      email: 'updated@example.com',
      firstName: 'Updated',
      lastName: 'User',
    };

    const mockReq = {
      params: { id: '1' },
      body: {
        email: 'updated@example.com',
        firstName: 'Updated',
        lastName: 'User',
      },
    };

    jest.unstable_mockModule('@prisma/client', () => ({
      PrismaClient: jest.fn(() => ({
        user: {
          findUnique: jest.fn().mockResolvedValue(mockUser),
          update: jest.fn().mockResolvedValue(mockUser),
        },
      })),
    }));

    const { updateUser } = await import('../controllers/userController.js');

    await updateUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockUser);
  });

  it('should return 404 if user is not found', async () => {
    const mockReq = {
      params: { id: '999' },
      body: {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      },
    };

    jest.unstable_mockModule('@prisma/client', () => ({
      PrismaClient: jest.fn(() => ({
        user: {
          findUnique: jest.fn().mockResolvedValue(null), // simulate not found
          update: jest.fn(),
        },
      })),
    }));

    const { updateUser } = await import('../controllers/userController.js');

    await updateUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
  });
});

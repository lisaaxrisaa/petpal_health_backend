import { jest } from '@jest/globals';

const mockUser = {
  id: 1,
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
};

let findUniqueMock = jest.fn().mockResolvedValue(mockUser);
let deleteMock = jest.fn().mockResolvedValue(mockUser);

// Mock PrismaClient before importing the controller
jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    user: {
      findUnique: (...args) => findUniqueMock(...args),
      delete: (...args) => deleteMock(...args),
    },
  })),
}));

const { deleteUser } = await import('../controllers/userController.js');

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('deleteUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a user and return 200', async () => {
    findUniqueMock = jest.fn().mockResolvedValue(mockUser);
    deleteMock = jest.fn().mockResolvedValue(mockUser);

    const mockReq = {
      params: { id: '1' },
    };

    await deleteUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'User deleted successfully',
      user: mockUser,
    });
  });

  it('should return 404 if user is not found', async () => {
    findUniqueMock = jest.fn().mockResolvedValue(null);
    deleteMock = jest.fn(); // Should not be called

    const mockReq = {
      params: { id: '999' },
    };

    await deleteUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
  });
});

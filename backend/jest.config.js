// jest.config.js
export default {
  // ✅ Only include this if you're using `.ts` or custom extensions
  // extensionsToTreatAsEsm: ['.ts'], // (optional)

  testEnvironment: 'node',
  transform: {},
  setupFilesAfterEnv: ['./test/setupTests.js'], // if you're using this
  moduleNameMapper: {
    '^@prisma/client$': '<rootDir>/__mocks__/@prisma/client.js',
  },
};

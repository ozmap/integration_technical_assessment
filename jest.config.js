module.exports = {
    roots: ['<rootDir>/src/'],
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/**/index.ts',
      '!<rootDir>/src/**/*-error.ts',
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'jest-environment-node',
    transform: {
      '.+\\.ts': 'ts-jest'
    },
    setupFiles: ["dotenv/config"],
  };
  
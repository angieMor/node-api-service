module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['<rootDir>/src/tests/*.test.(ts|js)'],
  verbose: true,
  clearMocks: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Usa ts-jest para procesar TypeScript
  },
  transformIgnorePatterns: ['node_modules/(?!some-esm-module)'],
  };
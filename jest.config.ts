module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['<rootDir>/src/tests/*.test.(ts|js)'],
  verbose: true,
  clearMocks: true,
  transform: {
    '^.+\\.(ts|tsx|js)$': 'ts-jest', // Usa ts-jest para procesar TypeScript
  },
  transformIgnorePatterns: ['node_modules/(?!some-esm-module)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
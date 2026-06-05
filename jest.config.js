// jest.config.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })
module.exports = createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
})

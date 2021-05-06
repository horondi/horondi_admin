module.exports = {
  testEnvironment: 'jsdom',
  verbose: true,
  testPathIgnorePatterns: ['cypress', './scr/configs'],
  modulePathIgnorePatterns: ['cypress', './scr/configs'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', 'cypress']
};

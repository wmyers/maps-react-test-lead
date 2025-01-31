import jestConfig from 'next/jest.js';

const createJestConfig = jestConfig({
  dir: './',
});

/** @type {import ("jest").Config} */
const config = {
  collectCoverage: false,
  testEnvironment: 'jsdom',
};

export default createJestConfig(config);

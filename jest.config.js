/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["ts", "tsx", "js"],
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};
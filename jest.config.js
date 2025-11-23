/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    // Transform .ts files using ts-jest
    "^.+\\.tsx?$": "ts-jest",
  },
};

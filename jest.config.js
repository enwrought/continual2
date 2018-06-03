module.exports = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(\/__tests__\/.*\\.(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "testEnvironmentOptions": {
    "TEST": true
  },
  "globals": {
    "ts-jest": {
      "tsConfigFile": "tsconfig.json"
    }
  }
};

module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts'],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['**/*.test.js'], // Change according to your test folder structure
  testEnvironment: 'node', // Use jsdom environment for DOM-related tests
};

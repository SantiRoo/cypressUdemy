const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "zz9i6a",
  viewportHeight: 1080,
  viewportWidth: 1920,
  defaultCommandTimeout: 10000,
  responseTimeout: 60000,
  requestTimeout: 60000,
  blockHosts: [
      "*google-analytics.com",
      "*googletagmanager.com",
    ],
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

const { defineConfig } = require("cypress");
const registerDataSession = require('cypress-data-session/src/plugin')


module.exports = defineConfig({
  // pageLoadTimeout: 500000,
  e2e: {
    // defaultCommandTimeout: 10000,
    baseUrl: 'https://acms.amalitech-dev.net/',
    "env": {
      "MAILOSAUR_API_KEY": "rRViwzn8NYZNpxfNuUTYJXNvm94eV980"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

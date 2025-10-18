const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Garante que o Cypress procure o frontend na porta 5173
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

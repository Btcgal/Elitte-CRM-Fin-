const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // A baseUrl aponta para o servidor do frontend.
    baseUrl: 'http://localhost:5173',

    // A vírgula acima é essencial para a sintaxe correta do objeto.
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

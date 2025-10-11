import { defineConfig } from "cypress";
import dotenv from 'dotenv';
import { CONFIG } from'./cypress/config/constants';

dotenv.config(); // load .env

export default defineConfig({
  e2e: {
    baseUrl: CONFIG.app.baseUrl,
    // Global timeout configurations
    defaultCommandTimeout: 10000,       // Default timeout for cy.get(), cy.contains(), etc.
    requestTimeout: 15000,              // Timeout for API requests
    responseTimeout: 15000,             // Timeout for server responses
    pageLoadTimeout: 30000,             // Timeout for page loads
    setupNodeEvents(on, config) {
      // Merge .env variables into Cypress.env()
      config.env = {
        ...config.env,
        API_BASE_URL: CONFIG.api.baseUrl,
        keycloak: {
          url: CONFIG.keycloak.url,
          realm: CONFIG.keycloak.realm,
          clientId: CONFIG.keycloak.clientId,
          username: process.env.KEYCLOAK_USERNAME,
          password: process.env.KEYCLOAK_PASSWORD
        }
      };
      return config;
    },
  },
});

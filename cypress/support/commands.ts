// cypress/support/commands.ts
import { getKeycloakToken } from '../helpers/keycloakHelper';

Cypress.Commands.add('loginWithKeycloak', () => {
  cy.session('keycloak-E2E', () => {
    getKeycloakToken().then(token => {
      cy.window().then(win => {
        win.sessionStorage.setItem('bearer', token);
        Cypress.env('KEYCLOAK_TOKEN', token);
      });
    });
  });
});

// Login if needed
Cypress.Commands.add('loginIfNeeded', () => {
  cy.window().then((win) => {
    const token = win.sessionStorage.getItem('bearer');
    if (token) {
      cy.log('Session active, skipping login');
      // Also set the token in Cypress env for API calls
      Cypress.env('KEYCLOAK_TOKEN', token);
    } else {
      cy.log('No active session, logging in');
      cy.loginWithKeycloak();
    }
  });
});

// TypeScript declaration
declare global {
  namespace Cypress {
    interface Chainable {
      loginWithKeycloak(): Chainable<void>;
      loginIfNeeded(): Chainable<void>;
    }
  }
}
import { CONFIG } from '../config/constants';

describe('Keycloak login via API and SPA access', () => {
  it('logs in and opens Maps page as E2E Tester', () => {
    cy.loginWithKeycloak();

    cy.intercept(CONFIG.api.unleash, (req) => {
      req.headers['authorization'] = `Bearer ${Cypress.env('KEYCLOAK_TOKEN')}`;
    }).as('unleashApi');

    cy.visit(CONFIG.app.baseUrl + CONFIG.endpoints.map);

    // Verify initial login
    cy.get('span.ellipsis-text.link__label', { timeout: 10000 })
      .contains('E2e Tester')
      .should('be.visible');
  });
});
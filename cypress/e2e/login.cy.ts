import { CONFIG } from '../config/constants';
import { Map } from '../pages/Map';

describe('Keycloak login via API and SPA access', () => {
  it('logs in and opens Maps page as provided User', () => {
    cy.loginWithKeycloak();

    cy.visit(CONFIG.app.baseUrl + CONFIG.endpoints.map);

    // Verify initial login using POM selector
    const map = new Map();
    map.waitForElementVisible(
      map.selectors.userLabel)
      .contains('E2e Tester');

    map.waitForElementVisible(
      map.selectors.mapTitle)
      .should('be.visible');

    map.waitForElementVisible(
      map.selectors.mapSearchInput)
      .should('be.visible');

  });
      after(() => {
        // Block all API calls that continue logging
        cy.intercept('POST', '**', { statusCode: 204 }).as('blockAll');
        cy.intercept('GET', '**', { statusCode: 204 }).as('blockAllGet');
        
        // Clear storage and cookies immediately
        cy.clearCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });
});
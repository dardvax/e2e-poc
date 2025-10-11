import { CONFIG } from '../config/constants';
import { WarehouseReceive } from '../pages/WarehouseReceive';

describe('Keycloak login via API and SPA access', () => {
  it('logs in and opens Maps page as provided User', () => {
    cy.loginWithKeycloak();

    cy.intercept(CONFIG.api.unleash, (req) => {
      req.headers['authorization'] = `Bearer ${Cypress.env('KEYCLOAK_TOKEN')}`;
    }).as('unleashApi');

    cy.visit(CONFIG.app.baseUrl + CONFIG.endpoints.map);

    // Verify initial login using POM selector
    const warehouseReceive = new WarehouseReceive();
    warehouseReceive.waitForElementVisible(
      warehouseReceive.selectors.userLabel)
      .contains('E2e Tester');
      
  });
      afterEach(() => {
        // Block all API calls that continue logging
        cy.intercept('POST', '**', { statusCode: 204 }).as('blockAll');
        cy.intercept('GET', '**', { statusCode: 204 }).as('blockAllGet');
        
        // Clear storage and cookies immediately
        cy.clearCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });
});
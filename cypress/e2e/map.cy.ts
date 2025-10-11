import { CONFIG } from '../config/constants';

describe('Keycloak Login Clean', () => {
  beforeEach(() => {
    // Use simple working approach
    cy.loginWithKeycloak();
    cy.visit(CONFIG.app.baseUrl + CONFIG.endpoints.map);
  });

  it('should display the map page', () => {
    // Wait for the user label to exist, scroll into view, then assert
    cy.get('span.ellipsis-text.link__label')
      .contains('E2e Tester')
      .scrollIntoView()
      .should('be.visible')

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

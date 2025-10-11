import { CONFIG } from '../config/constants';

describe('Keycloak Login Clean', () => {
  beforeEach(() => {
    // Use simple working approach
    cy.loginWithKeycloak();
    cy.visit(CONFIG.app.baseUrl + CONFIG.endpoints.map);
  });

  it('should display the map page', () => {
    // Wait for the user label to exist, scroll into view, then assert
    cy.get('span.ellipsis-text.link__label', { timeout: 10000 })
      .contains('E2e Tester')
      .scrollIntoView()
      .should('be.visible')
      .and('have.text', ' E2e Tester ');

  });
});

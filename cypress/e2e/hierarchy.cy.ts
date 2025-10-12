// cypress/e2e/hierarchy.cy.ts
import { collectDescriptions, getHierarchy } from '../helpers/apiHelper';
import { CONFIG } from '../config/constants';

describe('Create Receive from Harvest Order', () => {
   
  beforeEach(() => {
    cy.loginWithKeycloak();
    // Visit page first to see the UI
    cy.visit(CONFIG.endpoints.receivePage);
  });

  it('Extract all description values, \
    collect into an array, and randomly pick one for To location',
    () => {

    // Get the token from sessionStorage (now available from session)
    cy.window().then((win) => {
      const token = win.sessionStorage.getItem('bearer');
      if (!token) {
        throw new Error('No token found in sessionStorage after login');
      }

    getHierarchy(token).then((response) => {
      const descriptions: string[] = collectDescriptions(response);
      // Now use descriptions directly:
      const random = descriptions[Math.floor(Math.random() * descriptions.length)];
      cy.log(random);
      });
    });
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
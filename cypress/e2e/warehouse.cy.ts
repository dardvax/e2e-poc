// cypress/e2e/warehouse.cy.ts
import { WarehouseReceive } from '../pages/WarehouseReceive';


describe('Warehouse Receive Page', () => {
  let warehouseReceive: WarehouseReceive;

  beforeEach(() => {
    warehouseReceive = new WarehouseReceive();
    cy.loginIfNeeded(); // Only logs in if session is not active
    warehouseReceive.visit();
  });

  it('should display the search input on the Warehouse Receive page', () => {
    cy.get(warehouseReceive.selectors.searchInput)
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Search');
  });

  it('should allow searching for items', () => {
    cy.get(warehouseReceive.selectors.searchInput)
      .should('be.visible')
      .clear()
      .type('test item');
  });

  it('should have autofocus on search input', () => {
    cy.get(warehouseReceive.selectors.searchInput)
    .should('have.focus');
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

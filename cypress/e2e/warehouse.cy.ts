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
    // Add assertions for search results when available
  });

  it('should have autofocus on search input', () => {
    cy.get(warehouseReceive.selectors.searchInput).should('have.focus');
  });
});

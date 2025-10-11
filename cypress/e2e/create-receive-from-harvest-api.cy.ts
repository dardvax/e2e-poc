// cypress/e2e/create-receive-from-harvest.cy.ts
import { createWmsReceivingOrder, createWarehouseReceivingOrder } from '../helpers/apiHelper';
import { createWmsPayload, createWarehousePayload } from '../data/payloads';
import { WarehouseReceive } from '../pages/WarehouseReceive';
import { CONFIG } from '../config/constants';

describe('Create Receive from Harvest Order', () => {
  let orderNumber: string;
   
  beforeEach(() => {
    cy.loginWithKeycloak(); // Use this instead - it always sets the token properly
    // Visit page first to see the UI
    cy.visit(CONFIG.endpoints.receivePage);
  });

  it('should create a new receive from harvest order using API calls', () => {
    
    // Get the token from sessionStorage (now available from session)
    cy.window().then((win) => {
      const token = win.sessionStorage.getItem('bearer');
      if (!token) {
        throw new Error('No token found in sessionStorage after login');
      }
      
      //cy.log('Token retrieved from session:', token.substring(0, 50) + '...');
      //cy.log('Token length:', token.length);
      //cy.log('Token starts with Bearer?', token.startsWith('Bearer '));
      
      // Create payloads with next Monday date
      const wmsPayload = createWmsPayload();
      const warehousePayload = createWarehousePayload();
      
      // Log the expected date for verification
      //cy.log('WMS Order Expected Date:', wmsPayload.expectedDate);
      //cy.log('WMS Payload:', JSON.stringify(wmsPayload, null, 2));
      
      // Step 1: Create WMS receiving order with token
      createWmsReceivingOrder(wmsPayload, token).then((wmsResponse) => {
      //cy.log('WMS Order Created:', wmsResponse.orderNumber);
      //cy.log('Order ID:', wmsResponse.orderId);
      //cy.log('Order State:', wmsResponse.orderState);

      // Save orderNumber for later verification
      orderNumber = wmsResponse.orderNumber;
      
      // Verify WMS response
      expect(wmsResponse.orderState).to.eq('CREATED');
      expect(wmsResponse.orderType).to.eq('RECEIVE_FROM_HARVEST');
      expect(wmsResponse.locationGroupName).to.eq('ZR');
      expect(wmsResponse.partner.id).to.eq('000000');
      expect(wmsResponse.positions[0].expectedComment).to.eq("API order created");
      
      // Step 2: Create warehouse receiving order
      createWarehouseReceivingOrder(warehousePayload, token).then((warehouseResponse) => {
        cy.log('Warehouse Response Total Count:', warehouseResponse.totalCount);
        cy.log('Warehouse Orders Found:', warehouseResponse.items.length);
        
        // Verify warehouse response
        expect(warehouseResponse.totalCount).to.be.a('number');
        expect(warehouseResponse.items).to.be.an('array');
        
        if (warehouseResponse.items.length > 0) {
          cy.log('First Warehouse Order:', warehouseResponse.items[0].orderNumber);
          expect(warehouseResponse.items[0]).to.have.property('orderNumber');
          }
        });
      });
    });
  });

  it('checks if the created order appears in the UI grid', () => {    
  const warehouseReceive = new WarehouseReceive();
  cy.get(warehouseReceive.selectors.receiveOrdersTableRow).should('be.visible').and('have.length.greaterThan', 0);
  cy.get(warehouseReceive.selectors.receiveOrdersTableRow).first().should('not.be.empty');

  //orderNumber = 'R-2025-01233';

  // Find the row containing the orderNumber and click on it
  warehouseReceive.selectElementByText(
    warehouseReceive.selectors.receiveOrdersTableRow,
    orderNumber
  );
  /*cy.get(warehouseReceive.selectors.receiveOrdersTableRow)
    .contains(orderNumber)
    .should('be.visible')
    .click();*/

  // Wait for order details to load after clicking and verify content
  warehouseReceive.verifyElementContains(
    warehouseReceive.selectors.orderNumber,
    orderNumber);
  /*cy.get(warehouseReceive.selectors.orderNumber)
    .should('be.visible')
    .and('contain', orderNumber);*/

  // Verify comment field contains expected text
  warehouseReceive.verifyElementValue(
    warehouseReceive.selectors.orderComment,
    'API order created');
  /*cy.get(warehouseReceive.selectors.orderComment)
    .should('be.visible')
    .and('have.value', 'API order created');*/

  // Verify order date
  cy.get(warehouseReceive.selectors.orderCreateDate)
    .should('be.visible')
    .and('contain', '10 Oct 2025');

  // Verify delivery date
  warehouseReceive.verifyElementContains(
    warehouseReceive.selectors.orderDeliveryDate,
    '13 Oct 2025');
  /*cy.get(warehouseReceive.selectors.orderDeliveryDate)
    .should('be.visible')
    .and('contain', '13 Oct 2025');*/

  // Verify product name
  warehouseReceive.verifyElementContains(
    warehouseReceive.selectors.orderProductName,
    'Amarant, Zrno', 
    '(301290)');
  /*cy.get(warehouseReceive.selectors.orderProductName)
    .should('be.visible')
    .and('contain', 'Amarant, Zrno')
    .and('contain', '(301290)');*/

  // Verify quantity input has value 1
  warehouseReceive.verifyElementValue(
    warehouseReceive.selectors.orderQuantityInput,
    '1');
  /*cy.get(warehouseReceive.selectors.orderQuantityInput)
    .should('be.visible')
    .and('have.value', '1');*/

  // Close the dialog by clicking CANCEL
  warehouseReceive.clickBySelectorAndText(
    warehouseReceive.selectors.orderCancelButton,
    'CANCEL'
  );
  /*cy.contains(warehouseReceive.selectors.orderCancelButton, 'CANCEL')
    .should('be.visible')
    .click();*/
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
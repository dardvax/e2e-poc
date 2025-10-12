// cypress/e2e/create-receive-from-harvest.cy.ts
import { createWmsReceivingOrder, createWarehouseReceivingOrder } from '../helpers/apiHelper';
import { createWmsPayload, createWarehousePayload } from '../data/payloads';
import { Warehouse } from '../pages/Warehouse';
import { CONFIG } from '../config/constants';
import { WmsResponse } from 'cypress/data/wmsresponse';

describe('Create Receive from Harvest Order', () => {
  let orderNumber: string;
  let createdDate: string;
  let nextMondayDate: string;
   
  beforeEach(() => {
    cy.loginWithKeycloak();
    // Visit page first to see the UI
    cy.visit(CONFIG.endpoints.receivePage);
  });

  // expected results for API tests are in the payload
  const wmsPayload = createWmsPayload();
  const warehousePayload = createWarehousePayload();
  // expected results for UI tests are in the response
  let expectedUIresults: WmsResponse; 

  it('should create a new receive from harvest order using API calls', () => {
    
    // Get the token from sessionStorage (now available from session)
    cy.window().then((win) => {
      const token = win.sessionStorage.getItem('bearer');
      if (!token) {
        throw new Error('No token found in sessionStorage after login');
      }
      
      // Step 1: Create WMS receiving order with token
      createWmsReceivingOrder(wmsPayload, token).then((wmsResponse) => {

      // Save for later verification
      expectedUIresults = wmsResponse;
      orderNumber = wmsResponse.orderNumber;
      const created = new Date(wmsResponse.createdTimestamp);
      createdDate = created.toLocaleDateString(
        'en-GB',
        { day: '2-digit', month: 'short', year: 'numeric' });
      // Format nextMondayDate to 'DD MMM YYYY' to match UI
      const nextMonday = new Date(wmsResponse.expectedReceiptDate);
      nextMondayDate = nextMonday.toLocaleDateString(
        'en-GB',
        { day: '2-digit', month: 'short', year: 'numeric' });
      
      // Verify WMS response
      expect(wmsResponse.orderState).to.eq('CREATED');
      expect(wmsResponse.orderType).to.eq(wmsPayload.orderType);
      expect(wmsResponse.locationGroupName).to.eq(wmsPayload.locationGroupName);
      expect(wmsResponse.partner.id).to.eq(wmsPayload.partnerId);
      expect(wmsResponse.positions[0].expectedComment).to.eq(wmsPayload.positions[0].comment);

      // Step 2: Create warehouse receiving order
      createWarehouseReceivingOrder(warehousePayload, token).then((warehouseResponse) => {
        // Verify warehouse response
        expect(warehouseResponse.totalCount).to.be.a('number');
        expect(warehouseResponse.items).to.be.an('array');
        
        if (warehouseResponse.items.length > 0) {
          expect(warehouseResponse.items[0]).to.have.property('orderNumber');
          }
        });
      });
    });
  });

  it('checks if the created order appears in the UI grid', () => {    
  const warehouseReceive = new Warehouse();
  cy.get(warehouseReceive.selectors.receiveOrdersTableRow).should('be.visible').and('have.length.greaterThan', 0);
  cy.get(warehouseReceive.selectors.receiveOrdersTableRow).first().should('not.be.empty');

  // Find the row containing the orderNumber and click on it
  warehouseReceive.selectElementByText(
    warehouseReceive.selectors.receiveOrdersTableRow,
    orderNumber
  );

  // Wait for order details to load after clicking and verify content
  warehouseReceive.verifyElementContains(
    warehouseReceive.selectors.orderNumber,
    orderNumber);


  // Verify comment field contains expected text
  warehouseReceive.verifyElementValue(
    warehouseReceive.selectors.orderComment,
    expectedUIresults.positions[0].expectedComment);

  // Verify order date
  warehouseReceive.verifyElementContains(
    warehouseReceive.selectors.orderCreateDate,
    createdDate);

  // Verify delivery date
const expectedDeliveryDate = new Date(
  wmsPayload.expectedDate).toLocaleDateString(
  'en-GB',
  { day: '2-digit', month: 'short', year: 'numeric' }
);
warehouseReceive.verifyElementContains(
    warehouseReceive.selectors.orderDeliveryDate,
    expectedDeliveryDate
);

  // Verify product name
  warehouseReceive.verifyElementContains(
    warehouseReceive.selectors.orderProductName,
    expectedUIresults.positions[0].product.label, 
    expectedUIresults.positions[0].product.sku);

  // Verify quantity input has value 1
  warehouseReceive.verifyElementValue(
    warehouseReceive.selectors.orderQuantityInput,
    expectedUIresults.positions[0].expectedQuantity.value);

  // Close the dialog by clicking CANCEL
  warehouseReceive.clickBySelectorAndText(
    warehouseReceive.selectors.orderCancelButton,
    'CANCEL');
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
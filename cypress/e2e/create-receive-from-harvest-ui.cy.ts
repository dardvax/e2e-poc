import { Warehouse } from '../pages/Warehouse';
import { CONFIG } from '../config/constants';

describe('Create Receive from Harvest Order', () => {
    let warehouseReceive: Warehouse;

    beforeEach(() => {
        warehouseReceive = new Warehouse();
        cy.loginIfNeeded();
        cy.visit(CONFIG.endpoints.receivePage);
    });


    const testData = {
        location: 'Zrenjanin',
        product: 'Amarant, Zrno',
        quantity: '10',
    };

    it('should create a new receive from harvest order using UI', () => {
        // Click NEW ORDER button
        warehouseReceive.clickBySelectorAndText(
            warehouseReceive.selectors.newOrderButton,
            'NEW ORDER');

        // Select "Receive from harvest" option
        warehouseReceive.clickBySelectorAndText(
            warehouseReceive.selectors.receiveFromHarvestOption,
            'Receive from harvest');

        // Open locations dropdown
        warehouseReceive.getAndClickElement(
            warehouseReceive.selectors.locationDropdown);

        // Scroll down in the dropdown menu
        warehouseReceive.scrollDropdownMenuToBottom(
            warehouseReceive.selectors.menuContentActive);

        // Select desired location
        warehouseReceive.selectOptionInListByText(
            warehouseReceive.selectors.locationList,
            warehouseReceive.selectors.locationOption,
            testData.location);

        // Click ADD POSITION button
        warehouseReceive.clickBySelectorAndText(
            warehouseReceive.selectors.addPositionButton,
            'ADD POSITION');

        // Open product dropdown (target the input with empty placeholder)
        warehouseReceive.getAndClickElement(
            warehouseReceive.selectors.productDropdown);

        // Select product from the dropdown
        warehouseReceive.selectElementByText(
            warehouseReceive.selectors.productOption,
            testData.product
        );

        // Enter quantity in the quantity field
        warehouseReceive.enterValueIntoField(
            warehouseReceive.selectors.orderQuantityInput,
            testData.quantity
        );

        // Set delivery date to next Monday
        warehouseReceive.setDeliveryDateToNextMonday();

        // Click the Confirm button to complete the order
        warehouseReceive.getAndClickElement(
            warehouseReceive.selectors.confirmButton);
    });

    const expectedOrder = {
        type: 'Receive from harvest',
        location: 'Zrenjanin',
        product: 'Amarant, Zrno',
        quantity: '10',
        status: 'To-Do'
    };

    it('should verify the created order appears in the grid', () => {
        warehouseReceive.assertOrderInGrid(
            expectedOrder, warehouseReceive.selectors.receiveOrdersTableRow);
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
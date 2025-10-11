// cypress/pages/WarehouseReceive.ts
import { Base } from './Base';

export class WarehouseReceive extends Base {
  // Page URL
  protected readonly url = '/warehouse/receive';

  // Selectors
  public readonly selectors = {
  // recive orders page
  searchInput: '[test-main-search-input]',
  gridTableRow: { selector: 'div.table__body .table__row', timeout: 15000 },
  
    // Order details
    // class based selectors
    receiveOrdersTableRow: '.table__row',
    orderProductName: '.v-list-item__title',
    orderCancelButton: '.v-btn__content',
    // attribute based selectors
    orderComment: 'textarea[test-order-position-details]',
    orderQuantityInput: 'input[test-number-quantity]',
    // Vuetify-generated selectors (not stable for long-term)
    orderNumber: 'b[data-v-bccadcbd][data-v-e13f9bdd]',
    orderCreateDate: 'b[data-v-029926bd][data-v-e13f9bdd]',
    orderDeliveryDate: 'span[data-v-d8d0ce07]',

    // Create new order selectors
    // -----------------------------------
    newOrderButton: '.v-btn__content',
    receiveFromHarvestOption: '.v-list-item__title',
    locationDropdown: '.v-icon.mdi.mdi-menu-down.primary--text',
    menuContentActive: '.v-menu__content.menuable__content__active',
    locationList: '.v-list.v-select-list[role="listbox"]',
    locationOption: '.v-list-item__title',
    addPositionButton: '.v-btn__content',
    productDropdown: 'input[placeholder=""][autocomplete="off"]',
    productOption: '[role="listbox"] [role="option"]',
    confirmButton: '[test-active-confirm-button]',
    // Add more selectors as needed
    // -----------------------------------
  };

  /**
   * Clicks an element by selector and text, asserting with the given condition (default: 'be.visible').
   * @param selector - The selector to search within.
   * @param text - The text to match inside the element.
   * @param shouldBe - The Cypress assertion to use (default: 'be.visible').
   */
  public clickBySelectorAndText(
    selector: string,
    text: string,
    shouldBe: string = 'be.visible'
  ): void {
    cy.contains(selector, text)
      .should(shouldBe)
      .click();
  }

  /**
   * Scrolls to the bottom of the given dropdown menu selector.
   * @param selector - The selector for the dropdown menu to scroll.
   */
  public scrollDropdownMenuToBottom(selector: string): void {
    cy.get(selector)
      .should('be.visible')
      .scrollTo('bottom');
  }

    /**
   * Selects an option by text within a dropdown list.
   * @param listSelector - The selector for the dropdown list container.
   * @param optionSelector - The selector for the option elements.
   * @param optionText - The text of the option to select.
   */
public selectOptionInListByText(listSelector: string, optionSelector: string, optionText: string): void {
  cy.get(listSelector).within(() => {
    cy.get(optionSelector)
      .filter((_, el) => el.textContent?.trim().toLowerCase() === optionText.trim().toLowerCase())
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click();
  });
}

    /**
   * Gets an element by selector and clicks it after asserting visibility.
   * @param selector - The selector for the element to click.
   */
  public getAndClickElement(selector: string): void {
    cy.get(selector)
      .should('be.visible')
      .click();
  }

  /**
   * Gets an element from a list by text and clicks it after asserting visibility.
   * @param listSelector - The selector for the list container.
   * @param itemText - The text of the item to click.
   */
  public selectElementByText(listSelector: string, itemText: string): void {
    cy.get(listSelector)
      .contains(itemText)
      .should('be.visible')
      .click();
  }

    /**
   * Enters a value into a field by selector, clearing it first.
   * @param selector - The selector for the input field.
   * @param value - The value to type into the field.
   */
  public enterValueIntoField(selector: string, value: string): void {
    cy.get(selector)
      .should('be.visible')
      .clear()
      .type(value);
  }

  /**
   * Finds a row in the grid matching all expected fields and asserts each cell.
   * @param expectedOrder - The expected order fields to match.
   * @param rowSelector - The selector for the grid table rows.
  */
  public assertOrderInGrid(
    expectedOrder: { type: string; location: string; product: string; status: string },
    rowSelector: string
  ): void {
    cy.get(rowSelector).each(($row) => {
    const text = $row.text().replace(/\s+/g, ' ').trim();

    if (
      text.includes(expectedOrder.type) &&
      text.includes(expectedOrder.location) &&
      text.includes(expectedOrder.product) &&
      text.includes(expectedOrder.status)
    ) {
      cy.log('Found matching order row');
      cy.wrap($row).scrollIntoView({ offset: { top: -100, left: 0 } }).wait(300);

      cy.wrap($row).within(() => {
        cy.contains('.cell__text', expectedOrder.type, { matchCase: false }).should('exist');
        cy.contains('.cell__text', expectedOrder.location, { matchCase: false }).should('exist');
        cy.contains('.cell__text', expectedOrder.product, { matchCase: false }).should('exist');
        cy.contains('.cell__text', expectedOrder.status, { matchCase: false }).should('exist');
      });
    }
  });
}


  /**
   * Verifies an element (by selector) is visible and contains the expected text(s).
   * @param selector - The selector for the element.
   * @param expectedTexts - One or more expected text values to check.
   */
  public verifyElementContains(selector: string, ...expectedTexts: string[]): void {
    let chain = cy.get(selector).should('be.visible');
    expectedTexts.forEach(text => {
      chain = chain.and('contain', text);
    });
  }

  /**
   * Verifies an input or textarea (by selector) is visible and has the expected value.
   * @param selector - The selector for the input/textarea element.
   * @param expectedValue - The expected value.
   */
  public verifyElementValue(selector: string, expectedValue: string): void {
    cy.get(selector)
      .should('be.visible')
      .and('have.value', expectedValue);
  }
  //==================================================================================

  public setDeliveryDateToNextMonday(): void {
    // Calculate next Monday from today
    const today = new Date();
    const daysUntilMonday = (1 + 7 - today.getDay()) % 7 || 7; // 1 = Monday
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilMonday);
    
    // Wait for calendar elements to load first
    cy.wait(1000);
    
    // Click the calendar button to open date picker (button contains today's date and calendar icon)
    cy.get('button .v-btn__content:has(svg)')
      .parent('button')
      .contains(/\d{1,2} \w{3} \d{4}/) // Match date pattern like "9 Oct 2025"
      .should('be.visible')
      .click();
      
    // Wait for calendar popup to open
    cy.wait(1000);
    
    // Select next Monday from the date picker
    const nextMondayDay = nextMonday.getDate();
    cy.get('.v-date-picker-table--date table tbody')
      .should('be.visible')
      .within(() => {
        // Find the button with the next Monday's date and click it
        cy.get('button .v-btn__content')
          .contains(nextMondayDay.toString())
          .should('be.visible')
          .click();
      });
      
    // Wait for date selection to be processed
    cy.wait(500);
  }
}
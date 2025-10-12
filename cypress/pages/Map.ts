// cypress/pages/Maps.ts
import { Base } from './Base';

export class Map extends Base {
  // Page URL
  protected readonly url = '/warehouse/receive';

  // Selectors
  public readonly selectors = {
    mapTitle: 'span.ellipsis-text.link__label.text-uppercase',
    mapSearchInput: 'input[test-main-search-input]',
    userLabel: 'span.ellipsis-text.link__label',
  };

    /**
   * Waits for an element to be visible and returns the chainable for further assertions.
   * @param selector - The selector to wait for.
   */
  public waitForElementVisible(selector: string) {
    return cy.get(selector).should('be.visible');
  }
}
// cypress/pages/Base.ts
export abstract class Base {
  protected abstract readonly url: string;

  visit(): void {
    cy.visit(this.url);
    this.waitForPageLoad();
  }

  waitForPageLoad(): void {
    cy.url().then((currentUrl) => {
      cy.log('Current URL:', currentUrl);
      expect(currentUrl).to.contain(this.url);
    });
  }

  // Common page methods
  getPageTitle() {
    return cy.title();
  }

  verifyUrl(expectedUrl?: string): void {
    const urlToCheck = expectedUrl || this.url;
    cy.url().should('include', urlToCheck);
  }

  // Common element interactions
  protected clickElement(selector: string): void {
    cy.get(selector).click();
  }

  protected typeInElement(selector: string, text: string): void {
    cy.get(selector).clear().type(text);
  }

  protected verifyElementVisible(selector: string): void {
    cy.get(selector).should('be.visible');
  }

  protected verifyElementHasText(selector: string, text: string): void {
    cy.get(selector).should('contain.text', text);
  }
}
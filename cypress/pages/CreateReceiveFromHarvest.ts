// cypress/pages/CreateReceiveFromHarvestPage.ts
import { Base } from './Base';
import { getRandomLocationFromAPI } from '../helpers/apiHelper';

export class CreateReceiveFromHarvest extends Base {
  protected readonly url = '/warehouse/receive'; // Start from the main warehouse page

  // Selectors - you'll need to inspect the actual form to get these
  private readonly selectors = {
    createButton: 'button:contains("Create"), button:contains("New"), [test-create-button]', // Look for create/new buttons
    locationDropdown: '[data-test="location-dropdown"], select, .v-select', // Multiple possible selectors
    locationOption: (location: string) => `[data-value="${location}"], option:contains("${location}")`, // Multiple options
    submitButton: '[data-test="submit-button"], button[type="submit"], button:contains("Submit"), button:contains("Save")', // Multiple submit options
    // Add more form selectors as needed
  };

  // Navigate to create form
  navigateToCreateForm(): void {
    // First visit the main warehouse page
    cy.visit(this.url);
    cy.url().should('include', this.url);
    
    // Look for and click create/new button
    cy.get('body').then(($body) => {
      if ($body.find(this.selectors.createButton).length > 0) {
        cy.get(this.selectors.createButton).first().click();
      } else {
        cy.log('No create button found, assuming we are already on create form');
      }
    });
  }

  // Get random location from API and select it
  selectRandomLocation(): void {
    getRandomLocationFromAPI().then((location) => {
      cy.log(`Selected location: ${location.description}`);
      
      // Click dropdown to open options
      cy.get(this.selectors.locationDropdown).click();
      
      // Select the location (you may need to adjust this based on actual implementation)
      // Option 1: If dropdown uses text matching
      cy.contains(location.description).click();
      
      // Option 2: If dropdown uses value matching (uncomment if needed)
      // cy.get(this.selectors.locationOption(location.id)).click();
    });
  }

  // Fallback method using hardcoded location
  selectZrenjaninLocation(): void {
    cy.log('Using fallback location: Zrenjanin');
    
    cy.get(this.selectors.locationDropdown).click();
    cy.contains('Zrenjanin').click();
  }

  // Submit the form
  submitOrder(): void {
    cy.get(this.selectors.submitButton).click();
  }

  // Verify form was submitted successfully
  verifyOrderCreated(): void {
    // You'll need to adjust this based on your success message/redirect
    cy.url().should('not.include', this.url);
    // Or check for success message:
    // cy.contains('Order created successfully').should('be.visible');
  }
}
import { CONFIG, ApiWarehouse } from '../config/constants';
import { WmsPayload, WarehousePayload } from '../data/payloads';
import { WmsResponse } from '../data/wmsresponse';
import { WarehouseResponse } from '../data/wareresponse';

// Cypress-compatible helpers (for use in Cypress tests)
export function getLocationsFromAPI() {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('API_BASE_URL')}/locations`, // Adjust endpoint as needed
    headers: {
      'Authorization': `Bearer ${Cypress.env('KEYCLOAK_TOKEN')}`,
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(200);
    return response.body;
  });
}

export function getRandomLocationFromAPI() {
  return getLocationsFromAPI().then((locations) => {
    if (locations && locations.length > 0) {
      const randomIndex = Math.floor(Math.random() * locations.length);
      return locations[randomIndex];
    } else {
      // Fallback to default location if API fails
      return { description: 'Zrenjanin', id: 'default' };
    }
  });
}

// Generic API request helper
function apiRequest<T>(url: string, payload: any, token: string): Cypress.Chainable<T> {
  return cy.window().then((win) => {
    return win.fetch(url, {
      method: 'POST',
      headers: {
        'accept': 'application/json, text/plain, */*',
        'authorization': `Bearer ${token}`,
        'content-type': 'application/json',
        'x-requested-with': 'XMLHttpRequest'
      },
      body: JSON.stringify(payload)
    }).then(response => {
      if (!response.ok) {
        throw new Error(`API failed with status ${response.status}`);
      }
      return response.json();
    });
  });
}

// WMS Receiving Orders API interaction
export function createWmsReceivingOrder(payload: WmsPayload, token: string): Cypress.Chainable<WmsResponse> {
  return apiRequest<WmsResponse>(ApiWarehouse.endpoints.wmsReceivingOrders, payload, token);
}

// Warehouse Receiving Orders API interaction
export function createWarehouseReceivingOrder(payload: WarehousePayload, token: string): Cypress.Chainable<WarehouseResponse> {
  return apiRequest<WarehouseResponse>(ApiWarehouse.endpoints.warehouseReceivingOrders, payload, token);
}



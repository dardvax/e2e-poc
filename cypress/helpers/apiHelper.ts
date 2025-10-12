import { ApiWarehouse, Hierarchy } from '../config/constants';
import { WmsPayload, WarehousePayload } from '../data/payloads';
import { WmsResponse } from '../data/wmsresponse';
import { WarehouseResponse } from '../data/wareresponse';
import { HierarchyResponse } from '../data/hierarchy';

// Generic API request helper
function apiRequest<T>(
  url: string,
  payload: any,
  token: string,
  method: string
): Cypress.Chainable<T> {
  return cy.window().then((win) => {
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'accept': 'application/json, text/plain, */*',
        'authorization': `Bearer ${token}`,
        'content-type': 'application/json',
        'x-requested-with': 'XMLHttpRequest'
      }
    };
    if (payload !== undefined && method !== 'GET') {
      fetchOptions.body = JSON.stringify(payload);
    }
    return win.fetch(url, fetchOptions).then(response => {
      if (!response.ok) {
        throw new Error(`API failed with status ${response.status}`);
      }
      return response.json();
    });
  });
}

// WMS Receiving Orders API interaction
export function createWmsReceivingOrder(
  payload: WmsPayload,
  token: string):
  Cypress.Chainable<WmsResponse> {
  return apiRequest<WmsResponse>(
    ApiWarehouse.endpoints.wmsReceivingOrders,
    payload,
    token,
    'POST');
}

// Warehouse Receiving Orders API interaction
export function createWarehouseReceivingOrder(
  payload: WarehousePayload,
  token: string):
  Cypress.Chainable<WarehouseResponse> {
  return apiRequest<WarehouseResponse>(
    ApiWarehouse.endpoints.warehouseReceivingOrders,
    payload,
    token,
    'POST');
}

export function getHierarchy(token: string):
Cypress.Chainable<HierarchyResponse> {
  return apiRequest<HierarchyResponse>(
    Hierarchy.endpoints.hierarchy,
    undefined,
    token,
    'GET');
}

export function collectDescriptions(rawResponse: any): string[] {
  // Step 1: Map raw API response into your model
  const hierarchy = new HierarchyResponse(rawResponse);

  // Step 2: Collect descriptions from LocationGroup2 objects
  const descriptions: string[] = [];

  // Top-level (SubGroup -> LocationGroup2)
  hierarchy.subGroups.forEach(subGroup => {
    if (subGroup.locationGroup?.description) {
      descriptions.push(subGroup.locationGroup.description);
    }
  });

  return descriptions;
}
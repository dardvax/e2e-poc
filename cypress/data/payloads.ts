// cypress/data/payloads.ts

// WMS Receiving Order Payload Type
export interface WmsPayload {
  orderType: "RECEIVE_FROM_HARVEST";
  expectedDate: string;
  positions: Array<{
    positionId: number;
    comment: string | null;
    product: {
      sku: string;
    };
    quantity: {
      value: string;
      unit: string;
    };
  }>;
  partnerId: string;
  locationGroupName: string;
}

// Warehouse Receiving Order Payload Type
export interface WarehousePayload {
  globalFilter: null;
  columnFilters: Array<any>;
  limit: number;
  offset: number;
  includeHiddenOrders: boolean;
}

// Helper function to get next Monday's date
function getNextMondayDate(): string {
  const today = new Date();
  const daysUntilMonday = (1 + 7 - today.getDay()) % 7 || 7; // 1 = Monday
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysUntilMonday);
  nextMonday.setHours(0, 0, 0, 0); // Set to start of day
  return nextMonday.toISOString();
}

// WMS Payload Factory
export function createWmsPayload(): WmsPayload {
  return {
    orderType: "RECEIVE_FROM_HARVEST",
    expectedDate: getNextMondayDate(),
    positions: [{
      positionId: 1,
      comment: "API order created",
      product: {
        sku: "301290"
      },
      quantity: {
        value: "1",
        unit: "kg"
      }
    }],
    partnerId: "000000",
    locationGroupName: "ZR"
  };
}

// Warehouse Payload Factory  
export function createWarehousePayload(): WarehousePayload {
  return {
    globalFilter: null,
    columnFilters: [],
    limit: 40,
    offset: 0,
    includeHiddenOrders: true
  };
}
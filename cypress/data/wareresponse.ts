// cypress/data/wareresponse.ts

// Warehouse Response Types
export interface WarehouseResponse {
  totalCount: number;
  items: WarehouseItem[];
}

export interface WarehouseItem {
  version: number;
  id: string;
  orderNumber: string;
  origin?: string;
  type: string;
  status: string;
  date: string;
  from: WarehouseFrom;
  to: WarehouseTo;
  transport: WarehouseTransport;
  positions: WarehousePosition[];
  fulfillmentBlockers: any[];
  expectedReceiptDate: string;
  internal: boolean;
  actualReceiptDate?: string;
  linkedOrderNumber?: string;
  linkedOrderLocationGroupName?: string;
}

export interface WarehouseFrom {
  id: string;
  name: string;
}

export interface WarehouseTo {
  id: string;
  name: string;
}

export interface WarehouseTransport {
  id?: string;
  name?: string;
  registerNumber?: string;
  companyName?: string;
  companyAddress: any;
  companyVatNumber?: string;
  companyRegistrationNumber?: string;
}

export interface WarehousePosition {
  id: string;
  name: string;
  productId: string;
  expectedQuantity: WarehouseExpectedQuantity;
  receivedQuantity: WarehouseReceivedQuantity;
}

export interface WarehouseExpectedQuantity {
  value: string;
  unit: string;
  scale: string;
}

export interface WarehouseReceivedQuantity {
  value: string;
  unit: string;
  scale: string;
}
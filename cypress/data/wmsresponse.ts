// cypress/data/wmsresponse.ts

export interface WmsResponse {
  version: number;
  createdBy: CreatedBy;
  createdTimestamp: string;
  lastModifiedBy: LastModifiedBy;
  lastModifiedTimestamp: string;
  origin: string;
  partner: Partner;
  parentOrderId: any;
  returnToOrderId: any;
  linkedOrderNumber: any;
  linkedOrderLocationGroupName: any;
  orderId: string;
  orderNumber: string;
  orderState: string;
  locationGroupName: string;
  adHoc: boolean;
  expectedTransportId: any;
  expectedTransportName: any;
  expectedTransportRegistrationNumber: any;
  actualTransportId: any;
  actualTransportName: any;
  actualTransportRegistrationNumber: any;
  internalComment: any;
  erpCompleteDocumentNumber: any;
  erpCompleteGeneralWriteOffDocumentNumber: any;
  erpCompleteNaturalWriteOffDocumentNumber: any;
  fulfillmentBlockers: any[];
  controlPointTask: any;
  debugDetails: DebugDetails;
  handshakeId: any;
  orderType: string;
  expectedReceiptDate: string;
  actualReceiptDate: any;
  receivingNoteComment: any;
  erpCreateDocumentNumber: any;
  receivedBy: any;
  positions: Position[];
  unfulfilled: boolean;
  internal: boolean;
}

export interface CreatedBy {
  id: string;
  personId: number;
  fullName: string;
}

export interface LastModifiedBy {
  id: string;
  personId: number;
  fullName: string;
}

export interface Partner {
  id: string;
  name: string;
}

export interface DebugDetails {
  internalComment: any;
  isAdHoc: string;
  orderLocationGroupName: string;
  orderType: string;
  origin: string;
  partnerId: string;
  receivingNoteComment: any;
}

export interface Position {
  positionId: number;
  handshakeItemId: any;
  product: Product;
  expectedQuantity: ExpectedQuantity;
  receivedQuantity: ReceivedQuantity;
  state: string;
  expectedComment: any;
  expectedAnalysisId: any;
  positionCaptures: any[];
  debugDetails: DebugDetails2;
  unfulfilled: boolean;
}

export interface Product {
  id: string;
  sku: string;
  label: string;
  description: string;
  productUnitId: any;
  productUnitName: any;
  lot: any;
  serialNumber: any;
  productionDate: any;
  expiryDate: any;
}

export interface ExpectedQuantity {
  value: string;
  unit: string;
  scale: string;
}

export interface ReceivedQuantity {
  value: string;
  unit: string;
  scale: string;
}

export interface DebugDetails2 {}
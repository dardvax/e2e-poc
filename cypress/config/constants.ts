export const CONFIG = {
  keycloak: {
    realm: "logineko",
    url: "https://auth.e2e.gcp.logineko.com",
    clientId: "frontend-vue"
  },
  app: {
    baseUrl: "https://app.e2e.gcp.logineko.com"
  },
  api: {
    baseUrl: "https://api.e2e.gcp.logineko.com",
    unleash: "https://unleash.e2e.gcp.logineko.com/api/*"
  },
  endpoints: {
    map: "/map",
    receivePage: "/warehouse/receive"
  }
};

export const ApiWarehouse = {
  endpoints: {
    wmsReceivingOrders: '/api/v2/wms/receiving-orders',
    warehouseReceivingOrders: '/api/v2/warehouse/receiving-orders'
  }
};

export const Hierarchy = {
  endpoints: {
    hierarchy: '/api/v2/wms/locations/hierarchy'
  }
}

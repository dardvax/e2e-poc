// cypress/data/hierarchy.ts

export class HierarchyResponse {
  locationGroup: LocationGroup;
  subGroups: SubGroup[];
  locations: any[];

  constructor(data: any) {
    this.locationGroup = new LocationGroup(data.locationGroup);
    this.subGroups = (data.subGroups || []).map((sg: any) => new SubGroup(sg));
    this.locations = data.locations || [];
  }
}

export class LocationGroup {
  id: string;
  version: number;
  name: string;
  description: string;
  parentGroupName: any;
  address: any;
  deleted: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.version = data.version;
    this.name = data.name;
    this.description = data.description;
    this.parentGroupName = data.parentGroupName;
    this.address = data.address;
    this.deleted = data.deleted;
  }
}

export class SubGroup {
  locationGroup: LocationGroup2;
  subGroups: SubGroup2[];
  locations: Location[];

  constructor(data: any) {
    this.locationGroup = new LocationGroup2(data.locationGroup);
    this.subGroups = (data.subGroups || []).map((sg: any) => new SubGroup2(sg));
    this.locations = (data.locations || []).map((l: any) => new Location(l));
  }
}

export class LocationGroup2 {
  id: string;
  version: number;
  name: string;
  description: string;
  parentGroupName: string;
  address: Address;
  deleted: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.version = data.version;
    this.name = data.name;
    this.description = data.description;
    this.parentGroupName = data.parentGroupName;
    this.address = new Address(data.address);
    this.deleted = data.deleted;
  }
}

export class Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
  countryCode: any;
  state: any;

  constructor(data: any) {
    this.street = data?.street;
    this.city = data?.city;
    this.postCode = data?.postCode;
    this.country = data?.country;
    this.countryCode = data?.countryCode;
    this.state = data?.state;
  }
}

export class SubGroup2 {
  locationGroup: LocationGroup3;
  subGroups: SubGroup3[];
  locations: any[];

  constructor(data: any) {
    this.locationGroup = new LocationGroup3(data.locationGroup);
    this.subGroups = (data.subGroups || []).map((sg: any) => new SubGroup3(sg));
    this.locations = data.locations || [];
  }
}

export class LocationGroup3 {
  id: string;
  version: number;
  name: string;
  description: string;
  parentGroupName: string;
  address: any;
  deleted: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.version = data.version;
    this.name = data.name;
    this.description = data.description;
    this.parentGroupName = data.parentGroupName;
    this.address = data.address;
    this.deleted = data.deleted;
  }
}

export class SubGroup3 {
  locationGroup: LocationGroup4;
  subGroups: any[];
  locations: any[];

  constructor(data: any) {
    this.locationGroup = new LocationGroup4(data.locationGroup);
    this.subGroups = data.subGroups || [];
    this.locations = data.locations || [];
  }
}

export class LocationGroup4 {
  id: string;
  version: number;
  name: string;
  description: string;
  parentGroupName: string;
  address: any;
  deleted: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.version = data.version;
    this.name = data.name;
    this.description = data.description;
    this.parentGroupName = data.parentGroupName;
    this.address = data.address;
    this.deleted = data.deleted;
  }
}

export class Location {
  id: string;
  version: number;
  code: string;
  plcCode: string;
  description: string;
  locationType: string;
  locationGroupName: string;
  singleItemCapacity: boolean;
  controlPointDedicated: boolean;
  materialErpCode: string;
  productErpCode: string;

  constructor(data: any) {
    this.id = data.id;
    this.version = data.version;
    this.code = data.code;
    this.plcCode = data.plcCode;
    this.description = data.description;
    this.locationType = data.locationType;
    this.locationGroupName = data.locationGroupName;
    this.singleItemCapacity = data.singleItemCapacity;
    this.controlPointDedicated = data.controlPointDedicated;
    this.materialErpCode = data.materialErpCode;
    this.productErpCode = data.productErpCode;
  }
}

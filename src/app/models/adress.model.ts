export interface SimpleAddressReq {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  zipcode: string;
  state: string;
}

export interface AddressReq extends SimpleAddressReq {
  lat: string;
  lon: string;
}

export interface AddressRes {
  id?: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  zipcode: string;
  state: string;
  country: string;
  longitude: number;
  latitude: number;
}

export interface SimpleAddress {
  line1: string;
  line2?: string;
  city: string;
  zip: string;
  state: string;
}

export interface Address extends SimpleAddress {
  lat: string;
  lon: string;
}

export enum PhoneNumberType {
  Mobile = 'Mobile',
  Home = 'Home',
  Work = 'Work',
}

export interface PhoneNumber {
  id?: number;
  phoneNumber: string;
  type: PhoneNumberType;
}

export enum PhoneNumberType {
  Mobile = 'Mobile',
  Home = 'Home',
  Work = 'Work',
}

export interface PhoneNumber {
  phoneNumber: string;
  type: PhoneNumberType;
}

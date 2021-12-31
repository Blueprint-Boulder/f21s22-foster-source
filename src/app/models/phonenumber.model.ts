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

export interface PhoneNumbersRes {
  primaryPhoneNumber: PhoneNumber;
  secondaryPhoneNumber?: PhoneNumber;
}

export interface PhoneNumbersUpdateReq {
  primaryPhoneNumber?: PhoneNumber;
  secondaryPhoneNumber?: PhoneNumber;
}

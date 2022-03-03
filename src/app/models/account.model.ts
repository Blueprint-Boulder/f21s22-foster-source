import { PhoneNumber } from './phonenumber.model';
import { AddressReq, SimpleAddressReq } from './adress.model';

export interface Account {
  id: number;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  cwFirstName: string;
  cwLastName: string;
  cwEmail: string;
  cwPhoneNumber: string;
  certifiedBy: string;
  privilege: string;
  primaryPhoneNumber: PhoneNumber;
  secondaryPhoneNumber?: PhoneNumber;
  lastLogin: Date;
  profileCompleted: boolean;
  address: AddressReq;
}

export interface CreateAccountRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  cwFirstName: string;
  cwLastName: string;
  cwEmail: string;
  cwPhoneNumber: string;
  certifiedBy: string;
  certExpiry: string;
  primaryPhoneNumber: PhoneNumber;
  secondaryPhoneNumber?: PhoneNumber;
  address: SimpleAddressReq;
}

export interface CreateStaffAccountRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  primaryPhoneNumber: PhoneNumber;
  secondaryPhoneNumber?: PhoneNumber;
  address: SimpleAddressReq;
  staffAccessKey: string;
  privilege: string;
}

export interface UpdateAccountReq {
  email?: string;
  username?: string;
  password?: string;
  cwFirstName?: string;
  cwLastName?: string;
  cwEmail?: string;
  primaryPhone?: PhoneNumber;
  secondaryPhone?: PhoneNumber;
  address?: SimpleAddressReq;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface Token {
  id: number;
  privilegeLevel: number;
  exp: number;
  iat: number;
}

export interface GetAccountsReq {
  accounts: Account[];
}

export interface VerifyReq {
  key: string;
}

export interface DeleteAccountReq {
  password: string;
}

export interface CaseWorkerInfo {
  cwFirstName: string;
  cwLastName: string;
  cwEmail: string;
  cwPhoneNumber: string;
  certifiedBy: string;
}

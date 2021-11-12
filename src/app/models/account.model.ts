import { PhoneNumber } from './phonenumber.model';
import { Address, SimpleAddress } from './adress.model';

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
  cwPhone: string;
  certifiedBy: string;
  primaryPhone: PhoneNumber;
  secondaryPhone?: PhoneNumber;
  lastLogin: Date;
  profileCompleted: boolean;
  address: Address;
}

export interface CreateAccountRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: Date;
  cwFirstName: string;
  cwLastName: string;
  cwEmail: string;
  primaryPhone: PhoneNumber;
  secondaryPhone?: PhoneNumber;
  address: SimpleAddress;
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
  address?: SimpleAddress;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface Cookie {
  id: number;
  privilegeLevel: number;
  exp: number;
  iat: number;
}

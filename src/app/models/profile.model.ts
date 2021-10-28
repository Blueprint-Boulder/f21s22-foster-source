import { Account } from './account.model';
import { PhoneNumber } from './phonenumber.model';
import { Address } from './adress.model';
import { Availability } from './availability.model';

export interface Profile {
  id: number;
  biography: string;
  profileLargeAWSKey: string;
  profileSmallAWSKey: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  dob: Date;
  primaryPhone: PhoneNumber;
  secondaryPhone?: PhoneNumber;
  lastLogin: Date;
  profileCompleted: boolean;
  address: Address;
  availability: Availability;
  photoAWSKeys: Photo[];
}

export interface Photo {
  id: number;
  photoAWSKey: string;
}

export interface GetProfilesRes {
  profiles: Profile[];
  numResults: number;
}

export interface CreateProfileReq {
  biography: string;
  profileLargeAWSKey: string;
  profileSmallAWSKey: string;
  availability: Availability;
  photoAWSKeys: string[];
}

export interface UpdateProfileReq {
  biography?: string;
  profileLargeAWSKey?: string;
  profileSmallAWSKey?: string;
  availability?: Availability;
  photos?: string[];
}

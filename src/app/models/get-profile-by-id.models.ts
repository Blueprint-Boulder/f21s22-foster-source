import { Availability } from './availability.model';
import { PhoneNumber } from './phonenumber.model';
import { Photo } from './profile.model';

export interface FullProfileRes {
  id: number;
  preferredName: string;
  dob: Date;
  biography: string;
  profileLargeAwsKey: string;
  profileSmallAwsKey: string;
  gender: string;
  pronouns?: string;
  maritalStatus?: string;
  accountId: number;
  householdBackground: HouseholdBackgroundRes;
  respiteBackground: RespiteBackgroundRes;
  availabilities?: Availability[];
  photos: Photo[];
  secAccountHolder?: SecAccountHolderRes;
  account: PublicAccountFields;
}

export interface HouseholdBackgroundRes {
  id: number;
  parentalUnitSize: number;
  householdSize: number;
  childrenInHousehold: number;
  childrenInfo: string;
  vehicleAccess?: boolean;
  lgbtCareExperience?: boolean;
  caredForPhysDisabled?: boolean;
  caredForIntelDisabled?: boolean;
  caredForMedicallyFragile?: boolean;
  ownsFirearm?: boolean;
  petInfo?: string;
  additionalDetails?: string;
}

export interface RespiteBackgroundRes {
  id: number;
  fosterYearsExperience: number;
  totalChildrenCaredFor: number;
  canProvideRespite: boolean;
  lookingForRespite: boolean;
  respiteProviderInfo?: RespiteProviderInfoRes;
}

export interface RespiteProviderInfoRes {
  id?: number;
  cityCanProvideRespiteIn: string;
  respiteTravelDistance: number;
  careForMinAge: number;
  careForMaxAge: number;
  maxNumCareFor: number;
  availabilities: Availability[];
}

export interface SecAccountHolderRes {
  id: number;
  relationshipToPrimary: string;
  firstName: string;
  lastName: string;
  email: string;
  preferredName: string;
  pronouns?: string;
  gender: string;
  maritalStatus?: string;
  secAccountHolderPhone: PhoneNumber;
}

export interface PublicAccountFields {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  address: AddressRes;
  primaryPhoneNumber: PhoneNumber;
  secondaryPhoneNumber?: PhoneNumber;
}

export interface AddressRes {
  id: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  zipcode: string;
  state: string;
  country: string;
  longitude: number;
  latitude: number;
}

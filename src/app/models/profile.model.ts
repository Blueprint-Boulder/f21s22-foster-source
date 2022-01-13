import { Account } from './account.model';
import { PhoneNumber } from './phonenumber.model';
import { AddressReq, AddressRes } from './adress.model';
import { Availability, SimpleAvailability } from './availability.model';
import { FullProfileRes } from './get-profile-by-id.models';
import { SmallProfile } from './small-profile.model';

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
  address: AddressReq;
  availability: Availability;
  photoAWSKeys: Photo[];
}

export interface Photo {
  id: number;
  photoAWSKey: string;
}

export interface GetProfilesRes {
  profiles: SmallProfile[];
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
  preferredName?: string;
  biography?: string;
  gender?: string;
  pronouns?: string;
  maritalStatus?: string;
}

export interface SecondaryAccountHolderReq {
  firstName: string;
  lastName: string;
  preferredName: string;
  relationshipToPrimary: string;
  gender: string;
  email: string;
  secAccountHolderPhone: PhoneNumber;
  pronouns?: string;
  maritalStatus?: string;
}

export interface RespiteProviderInfoReq {
  id?: number;
  cityCanProvideRespiteIn: string;
  respiteTravelDistance: number;
  careForMinAge: number;
  careForMaxAge: number;
  maxNumCareFor: number;
  availabilities: [SimpleAvailability];
}

export interface RespiteBackgroundReq {
  fosterYearsExperience: number;
  totalChildrenCaredFor: number;
  canProvideRespite: boolean;
  lookingForRespite: boolean;
  respiteProviderInfo?: RespiteProviderInfoReq;
}

export interface HouseholdBackground {
  id?: number;
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

export interface UpdateHouseholdBackground {
  parentalUnitSize?: number;
  householdSize?: number;
  childrenInHousehold?: number;
  childrenInfo?: string;
  vehicleAccess?: boolean;
  lgbtCareExperience?: boolean;
  caredForPhysDisabled?: boolean;
  caredForIntelDisabled?: boolean;
  caredForMedicallyFragile?: boolean;
  ownsFirearm?: boolean;
  petInfo?: string;
  additionalDetails?: string;
}

export interface FinishProfileReq {
  preferredName: string;
  gender: string;
  dob: string; // MM/DD/YYYY, where "/" can be / - . etc e.g. 10.31-2000 is still valid
  profileSmallAwsKey: string;
  profileLargeAwsKey: string;
  pronouns?: string;
  maritalStatus?: string;
  biography: string;
  secondaryAccountHolder?: SecondaryAccountHolderReq;
  respiteBackground: RespiteBackgroundReq;
  householdBackground: HouseholdBackground;
}

export interface ProfileImages {
  profileLargeAwsKey: string;
  profileSmallAwsKey: string;
}

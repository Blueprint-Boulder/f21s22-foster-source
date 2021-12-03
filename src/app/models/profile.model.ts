import { Account } from './account.model';
import { PhoneNumber } from './phonenumber.model';
import { Address } from './adress.model';
import { Availability, SimpleAvailability } from './availability.model';

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

export interface SecondaryAccountHolder {
  firstName: string;
  lastName: string;
  preferredName: string;
  relationshipToPrimary: string;
  gender: string;
  email: string;
  phoneNumber: string;
  phoneNumberType: string;
  pronouns?: string;
  maritalStatus?: string;
}

export interface RespiteProviderInfo {
  cityCanProvideRespiteIn: string;
  respiteTravelDistance: number;
  careForMinAge: number;
  careForMaxAge: number;
  maxNumCareFor: number;
  availability: SimpleAvailability;
}

export interface RespiteBackground {
  fosterYearsExperience: number;
  totalChildrenCaredFor: number;
  canProvideRespite: boolean;
  lookingForRespite: boolean;
  respiteProviderInfo?: RespiteProviderInfo;
}

export interface HouseholdBackground {
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

export interface FinishProfileReq {
  preferredName: string;
  gender: string;
  dob: string; // MM/DD/YYYY, where "/" can be / - . etc e.g. 10.31-2000 is still valid
  profileSmallAwsKey: string;
  profileLargeAwsKey: string;
  pronouns?: string;
  maritalStatus?: string;
  secondaryAccountHolder?: SecondaryAccountHolder;
  respiteBackground: RespiteBackground;
  householdBackground: HouseholdBackground;
}

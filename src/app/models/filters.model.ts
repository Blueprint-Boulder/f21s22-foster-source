import { AvailabilityFilters } from './availability.model';

export interface FiltersReq {
  distance?: number;
  ageRange?: [number, number];
  maxKids?: number;
  availabilities?: AvailabilityFilters;
  vehicleAccess?: boolean;
  lgbtExperience?: boolean;
  physicalDisabilityExperience?: boolean;
  intellectualDisabilityExperience?: boolean; // TODO: Add medically fragile
  ownFirearm?: boolean;
}

export interface HouseholdBackgroundRadioFilters {
  vehicleAccess: boolean | null;
  lgbtExperience: boolean | null;
  physicalDisabilityExperience: boolean | null;
  intellectualDisabilityExperience: boolean | null;
  ownFirearm: boolean | null;
}

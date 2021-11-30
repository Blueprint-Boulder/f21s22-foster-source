export enum AvailabilityType {
  PRIMARY = 'PRIMARY',
  TEMPORARY = 'TEMPORARY',
}

export type DayAvailability = [boolean, boolean, boolean, boolean];

export interface Availability {
  id: number;
  type: AvailabilityType;
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
  start?: Date;
  end?: Date;
}

export interface AvailabilityFilters {
  monday?: DayAvailability;
  tuesday?: DayAvailability;
  wednesday?: DayAvailability;
  thursday?: DayAvailability;
  friday?: DayAvailability;
  saturday?: DayAvailability;
  sunday?: DayAvailability;
}

export interface SimpleAvailability {
  type: AvailabilityType;
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
  start?: Date;
  end?: Date;
}

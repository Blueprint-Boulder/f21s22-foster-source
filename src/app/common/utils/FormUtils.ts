import { DayModel } from '../../common-components/day-availability-input/day-availability-input.component';
import { AvailabilityType, SimpleAvailability } from '../../models/availability.model';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PhoneNumberType } from '../../models/phonenumber.model';
import * as libphonenumber from 'google-libphonenumber';

export class FormUtils {
  public static readonly STATES = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Federated States of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Island',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  public static validatePhoneNumber(control: AbstractControl): ValidationErrors | null {
    const err = { invalidPhone: 'Please enter a valid phone number.' };
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    try {
      const number = phoneUtil.parseAndKeepRawInput(control.value ? control.value : '', 'US');
      const valid = phoneUtil.isValidNumber(number);
      return valid ? null : err;
    } catch (e) {
      return err;
    }
  }

  public static formatPhoneNumber(num: string): string {
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    const parsed = phoneUtil.parse(num, 'US');
    return phoneUtil.format(parsed, libphonenumber.PhoneNumberFormat.E164);
  }

  public static prettifyValidPhoneNumber(num: string): string {
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    const parsed = phoneUtil.parse(num, 'US');
    return phoneUtil.format(parsed, libphonenumber.PhoneNumberFormat.NATIONAL);
  }

  public static getPhoneTypes(): string[] {
    const types: string[] = [];
    Object.keys(PhoneNumberType).forEach((type) => {
      types.push(type);
    });
    return types;
  }

  public static confirmEmailValidator(control: AbstractControl): ValidationErrors | null {
    return control.get('confirmEmail')?.value === control.get('email')?.value
      ? null
      : { emailMatch: 'Emails do not match.' };
  }

  public static confirmPasswordValidator(
    field1: string,
    field2: string
  ): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.get(field1)?.value === control.get(field2)?.value
        ? null
        : { passwordMatch: 'Passwords do not match.' };
    };
  }

  public static strictlyIncreasingFieldsValidator(
    field1: string,
    field2: string
  ): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.get(field1)?.value ||
        !control.get(field2)?.value ||
        parseInt(control.get(field1)?.value) < parseInt(control.get(field2)?.value)
        ? null
        : { notLargerThan: `${field2} must be larger than ${field1}` };
    };
  }

  public static validateDate(control: AbstractControl): ValidationErrors | null {
    const err = { invalidDate: 'Please enter a valid date.' };

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const parsed = FormUtils.parseDateFromInput(control.value as string);
      const validMonth = parseInt(control.value.substring(0, 2)) > 0 && parseInt(control.value.substring(0, 2)) <= 12;
      const validDay = parseInt(control.value.substring(3, 5)) > 0 && parseInt(control.value.substring(3, 5)) <= 31;
      const validYear = parseInt(control.value.substring(6, 10)) > new Date().getFullYear() - 100;
      if (!validMonth || !validDay || !validYear) {
        return err;
      } else {
        return null;
      }
    } catch (e) {
      return err;
    }
  }

  public static parseDateFromInput(dateStr: string): Date {
    const year = parseInt(dateStr.substring(6, 10));
    const day = parseInt(dateStr.substring(3, 5));
    const month = parseInt(dateStr.substring(0, 2));
    return new Date(year, month - 1, day);
  }

  public static generateRespiteAvailability(
    dayModels: DayModel[],
    type: AvailabilityType,
    start?: Date,
    end?: Date
  ): SimpleAvailability {
    const m: DayModel = dayModels.find((dm) => dm.name === 'Monday') as DayModel;
    const t: DayModel = dayModels.find((dm) => dm.name === 'Tuesday') as DayModel;
    const w: DayModel = dayModels.find((dm) => dm.name === 'Wednesday') as DayModel;
    const th: DayModel = dayModels.find((dm) => dm.name === 'Thursday') as DayModel;
    const f: DayModel = dayModels.find((dm) => dm.name === 'Friday') as DayModel;
    const sa: DayModel = dayModels.find((dm) => dm.name === 'Saturday') as DayModel;
    const su: DayModel = dayModels.find((dm) => dm.name === 'Sunday') as DayModel;

    return {
      type: type,
      monday: [m.morning, m.afternoon, m.evening, m.overnight],
      tuesday: [t.morning, t.afternoon, t.evening, t.overnight],
      wednesday: [w.morning, w.afternoon, w.evening, w.overnight],
      thursday: [th.morning, th.afternoon, th.evening, th.overnight],
      friday: [f.morning, f.afternoon, f.evening, f.overnight],
      saturday: [sa.morning, sa.afternoon, sa.evening, sa.overnight],
      sunday: [su.morning, su.afternoon, su.evening, su.overnight],
      startDate: start,
      endDate: end,
    };
  }

  public static hasAvailability(dayModels: DayModel[]): boolean {
    let hasAvailability = false;
    dayModels.forEach((dm) => {
      const dayHasAvailability = dm.morning || dm.afternoon || dm.evening || dm.overnight;
      if (dayHasAvailability) {
        hasAvailability = true;
      }
    });
    return hasAvailability;
  }
}

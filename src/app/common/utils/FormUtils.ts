import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as libphonenumber from 'google-libphonenumber';
import { PhoneNumberType } from '../../models/phonenumber.model';

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
}

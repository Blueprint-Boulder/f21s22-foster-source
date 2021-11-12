import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as libphonenumber from 'google-libphonenumber';
import { PhoneNumberType } from '../models/phonenumber.model';

export class Utils {
  public static validatePhoneNumber(
    control: AbstractControl
  ): ValidationErrors | null {
    const err = { invalidPhone: 'Please enter a valid phone number.' };
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    try {
      const number = phoneUtil.parseAndKeepRawInput(
        control.value ? control.value : '',
        'US'
      );
      const valid = phoneUtil.isValidNumber(number);
      return valid ? null : err;
    } catch (e) {
      return err;
    }
  }

  public static getPhoneTypes(): string[] {
    const types: string[] = [];
    Object.keys(PhoneNumberType).forEach((type) => {
      types.push(type);
    });
    return types;
  }
}

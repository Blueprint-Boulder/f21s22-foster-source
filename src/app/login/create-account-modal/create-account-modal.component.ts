import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as libphonenumber from 'google-libphonenumber';
import { AccountService } from '../../services/account-service/account.service';
import { accountServiceProvider } from '../../services/account-service/account.service.provider';
import { CreateAccountRequest } from '../../models/account.model';
import { PhoneNumberType } from '../../models/phonenumber.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss'],
  providers: [accountServiceProvider],
})
export class CreateAccountModalComponent implements OnInit {
  public createAccountForm: FormGroup;
  public disableSubmitButton = false;

  get confirmEmail() {
    return this.createAccountForm.get('confirmEmail');
  }

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.createAccountForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      confirmEmail: ['', Validators.required],
      primaryPhone: ['', Validators.compose([Validators.required, CreateAccountModalComponent.validatePhoneNumber])],
      primaryType: ['', Validators.required],
      secondaryPhone: '',
      secondaryType: '',
      address: ['', Validators.required],
      address2: '',
      city: ['', Validators.required],
      zip: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{5}(?:-[0-9]{4})?$/)])],
      state: ['', Validators.required],
      county: ['', Validators.required],
      caseworkerfname: ['', Validators.required],
      caseworkerlname: ['', Validators.required],
      caseworkeremail: ['', Validators.compose([Validators.required, Validators.email])],
      caseworkerphone: ['', Validators.compose([Validators.required, CreateAccountModalComponent.validatePhoneNumber])],
      user: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(4),
          Validators.pattern(/^(?=[a-zA-Z0-9._]{0,100}$)(?!.*[_.]{2})[^_.].*[^_.]$/),
        ]),
      ],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmpassword: ['', Validators.compose([Validators.required])],
      dob: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/),
          CreateAccountModalComponent.validateDate,
        ]),
      ],
    });
    this.createAccountForm.setValidators([
      CreateAccountModalComponent.confirmEmailValidator,
      CreateAccountModalComponent.confirmPasswordValidator,
    ]);
    this.createAccountForm.get('secondaryPhone')?.valueChanges.subscribe((secondaryPhone: string) => {
      if (secondaryPhone === '' || secondaryPhone === null) {
        this.createAccountForm.get('secondaryPhone')?.setValidators([]);
        this.createAccountForm.get('secondaryType')?.setValidators([]);
      } else {
        this.createAccountForm.get('secondaryPhone')?.setValidators([CreateAccountModalComponent.validatePhoneNumber]);
        this.createAccountForm.get('secondaryType')?.setValidators([Validators.required]);
      }
      this.createAccountForm.get('secondaryPhone')?.updateValueAndValidity({ emitEvent: false });
      this.createAccountForm.get('secondaryType')?.updateValueAndValidity({ emitEvent: false });
    });
  }
  public createAccountSubmit(): void {
    if (this.createAccountForm.invalid) {
      console.log(this.createAccountForm.invalid);
      console.log(this.createAccountForm);
      this.createAccountForm.markAllAsTouched();
    } else {
      this.disableSubmitButton = true;

      const createAccountReq: CreateAccountRequest = {
        address: {
          line1: this.createAccountForm.get('address')!.value,
          line2: this.createAccountForm!.get('address2') ? this.createAccountForm!.get('address2')!.value : undefined,
          city: this.createAccountForm!.get('city')!.value,
          county: this.createAccountForm!.get('county')!.value,
          zip: this.createAccountForm!.get('zip')!.value,
          state: this.createAccountForm!.get('state')!.value,
        },
        cwEmail: this.createAccountForm.get('caseworkeremail')!.value,
        cwFirstName: this.createAccountForm.get('caseworkerfname')!.value,
        cwLastName: this.createAccountForm.get('caseworkerlname')!.value,
        dob: CreateAccountModalComponent.parseDateFromInput(this.createAccountForm.get('dob')!.value),
        email: this.createAccountForm.get('caseworkerlname')!.value,
        firstName: this.createAccountForm.get('fname')!.value,
        lastName: this.createAccountForm.get('lname')!.value,
        password: this.createAccountForm.get('password')!.value,
        primaryPhone: {
          phoneNumber: this.createAccountForm.get('primaryPhone')!.value,
          type: this.createAccountForm.get('primaryType')!.value,
        },
        secondaryPhone: this.createAccountForm.get('secondaryType')
          ? {
              phoneNumber: this.createAccountForm.get('secondaryPhone')!.value,
              type: this.createAccountForm.get('secondaryType')!.value,
            }
          : undefined,
        username: this.createAccountForm.get('user')!.value,
      };

      this.accountService.createAccount(createAccountReq).subscribe(
        (res: CreateAccountRequest) => {
          console.log(res);
          this.router.navigate([`/login/create-account/verify/${res.email}`]);
        },
        (err) => console.log(err)
      );
    }
  }

  private static confirmEmailValidator(control: AbstractControl): ValidationErrors | null {
    return control.get('confirmEmail')?.value === control.get('email')?.value
      ? null
      : { emailMatch: 'Emails do not match.' };
  }
  private static confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    return control.get('confirmpassword')?.value === control.get('password')?.value
      ? null
      : { passwordMatch: 'Passwords do not match.' };
  }

  private static validatePhoneNumber(control: AbstractControl): ValidationErrors | null {
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

  private static validateDate(control: AbstractControl): ValidationErrors | null {
    const err = { invalidDate: 'Please enter a valid phone date.' };

    try {
      const parsed = CreateAccountModalComponent.parseDateFromInput(control.value as string);
      const validMonth = parseInt(control.value.substring(0, 2)) > 0 && parseInt(control.value.substring(0, 2)) <= 12;
      const validDay = parseInt(control.value.substring(3, 5)) > 0 && parseInt(control.value.substring(3, 5)) <= 31;
      const validYear =
        parseInt(control.value.substring(6, 10)) > new Date().getFullYear() - 100 &&
        parseInt(control.value.substring(6, 10)) <= new Date().getFullYear() - 13;
      if (!validMonth || !validDay || !validYear) {
        return err;
      } else {
        return null;
      }
    } catch (e) {
      return err;
    }
  }

  private static parseDateFromInput(dateStr: string): Date {
    const year = parseInt(dateStr.substring(6, 10));
    const day = parseInt(dateStr.substring(3, 5));
    const month = parseInt(dateStr.substring(0, 2));
    console.log(year, day, month);
    return new Date(year, month - 1, day);
  }

  public getPhoneTypes(): string[] {
    const types: string[] = [];
    Object.keys(PhoneNumberType).forEach((type) => {
      types.push(type);
    });
    return types;
  }
}

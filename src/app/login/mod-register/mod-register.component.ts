import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AccountService } from '../../services/account-service/account.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service/toast.service';
import { CreateAccountRequest, CreateStaffAccountRequest } from '../../models/account.model';
import { ToastPresets } from '../../models/toast.model';
import * as libphonenumber from 'google-libphonenumber';
import { PhoneNumberType } from '../../models/phonenumber.model';
import { accountServiceProvider } from '../../services/account-service/account.service.provider';

@Component({
  selector: 'app-mod-register',
  templateUrl: './mod-register.component.html',
  styleUrls: ['./mod-register.component.scss'],
  providers: [accountServiceProvider],
})
export class ModRegisterComponent implements OnInit {
  public readonly STATES = [
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

  public createStaffAccountForm: FormGroup;
  public disableSubmitButton = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.createStaffAccountForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      confirmEmail: ['', Validators.required],
      primaryPhone: ['', Validators.compose([Validators.required, ModRegisterComponent.validatePhoneNumber])],
      primaryType: ['', Validators.required],
      secondaryPhone: '',
      secondaryType: '',
      address: ['', Validators.required],
      address2: '',
      city: ['', Validators.required],
      zip: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{5}(?:-[0-9]{4})?$/)])],
      state: ['', Validators.required],
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
      staffAccessKey: ['', Validators.required],
      privilegeLevel: ['', Validators.required],
    });
    this.createStaffAccountForm.setValidators([
      ModRegisterComponent.confirmEmailValidator,
      ModRegisterComponent.confirmPasswordValidator,
    ]);
    this.createStaffAccountForm.get('secondaryPhone')?.valueChanges.subscribe((secondaryPhone: string) => {
      if (secondaryPhone === '' || secondaryPhone === null) {
        this.createStaffAccountForm.get('secondaryPhone')?.setValidators([]);
        this.createStaffAccountForm.get('secondaryType')?.setValidators([]);
      } else {
        this.createStaffAccountForm.get('secondaryPhone')?.setValidators([ModRegisterComponent.validatePhoneNumber]);
        this.createStaffAccountForm.get('secondaryType')?.setValidators([Validators.required]);
      }
      this.createStaffAccountForm.get('secondaryPhone')?.updateValueAndValidity({ emitEvent: false });
      this.createStaffAccountForm.get('secondaryType')?.updateValueAndValidity({ emitEvent: false });
    });
  }

  public createAccountSubmit(): void {
    if (this.createStaffAccountForm.invalid) {
      this.createStaffAccountForm.markAllAsTouched();
    } else {
      this.disableSubmitButton = true;

      const createAccountReq: CreateStaffAccountRequest = {
        address: {
          addressLine1: this.createStaffAccountForm.get('address')!.value,
          addressLine2: this.createStaffAccountForm!.get('address2')?.value
            ? this.createStaffAccountForm!.get('address2')!.value
            : undefined,
          city: this.createStaffAccountForm!.get('city')!.value,
          zipcode: this.createStaffAccountForm!.get('zip')!.value,
          state: this.createStaffAccountForm!.get('state')!.value,
        },
        email: this.createStaffAccountForm.get('email')!.value,
        firstName: this.createStaffAccountForm.get('fname')!.value,
        lastName: this.createStaffAccountForm.get('lname')!.value,
        password: this.createStaffAccountForm.get('password')!.value,
        primaryPhoneNumber: {
          phoneNumber: ModRegisterComponent.formatPhoneNumber(this.createStaffAccountForm.get('primaryPhone')!.value),
          type: this.createStaffAccountForm.get('primaryType')!.value,
        },
        secondaryPhoneNumber: this.createStaffAccountForm.get('secondaryType')?.value
          ? {
              phoneNumber: ModRegisterComponent.formatPhoneNumber(
                this.createStaffAccountForm.get('secondaryPhone')!.value
              ),
              type: this.createStaffAccountForm.get('secondaryType')!.value,
            }
          : undefined,
        username: this.createStaffAccountForm.get('user')!.value,
        staffAccessKey: this.createStaffAccountForm.get('staffAccessKey')!.value,
        privilege: this.createStaffAccountForm.get('privilegeLevel')!.value,
      };

      this.accountService.createStaffAccount(createAccountReq).subscribe(
        (res: CreateAccountRequest) => {
          //TODO: Check if username is available.
          this.router.navigate([`/login/create-account/verify/${res.email}`]);
        },
        (err) => {
          this.toastService.httpError(err);
        }
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

  public getPhoneTypes(): string[] {
    const types: string[] = [];
    Object.keys(PhoneNumberType).forEach((type) => {
      types.push(type);
    });
    return types;
  }

  private static formatPhoneNumber(num: string): string {
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    const parsed = phoneUtil.parse(num, 'US');
    return phoneUtil.format(parsed, libphonenumber.PhoneNumberFormat.E164);
  }
}

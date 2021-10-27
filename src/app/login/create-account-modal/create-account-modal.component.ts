import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import * as libphonenumber from 'google-libphonenumber';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss'],
})
export class CreateAccountModalComponent implements OnInit {
  public createAccountForm: FormGroup;

  get confirmEmail() {
    return this.createAccountForm.get('confirmEmail');
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createAccountForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      confirmEmail: ['', Validators.required],
      primaryPhone: [
        '',
        Validators.compose([Validators.required, this.validatePhoneNumber]),
      ],
      primaryType: ['', Validators.required],
      secondaryPhone: ['', Validators.compose([this.validatePhoneNumber])],
      secondaryType: ['', Validators.required],
      address: ['', Validators.required],
      address2: '',
      city: ['', Validators.required],
      zip: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]{5}(?:-[0-9]{4})?$/),
        ]),
      ],
      state: ['', Validators.required],
      county: ['', Validators.required],
      caseworkerfname: ['', Validators.required],
      caseworkerlname: ['', Validators.required],
      caseworkeremail: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      caseworkerphone: [
        '',
        Validators.compose([Validators.required, this.validatePhoneNumber]),
      ],
      user: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(4),
          Validators.pattern(
            /^(?=[a-zA-Z0-9._]{0,100}$)(?!.*[_.]{2})[^_.].*[^_.]$/
          ),
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      confirmpassword: ['', Validators.compose([Validators.required])],
    });
    this.createAccountForm.setValidators([
      this.confirmEmailValidator,
      this.confirmPasswordValidator,
    ]);
  }
  public createAccountSubmit(): void {
    console.log(this.createAccountForm.value);
    // Check that all required fields are valid, and that all filled out optional fields are valid
    // There will be some conditional things like you need a secondary type if you have a secondary phone number
    // Make all required fields dirty to show their errors
  }

  private confirmEmailValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    return control.get('confirmEmail')?.value === control.get('email')?.value
      ? null
      : { emailMatch: 'Emails do not match.' };
  }
  private confirmPasswordValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    return control.get('confirmpassword')?.value ===
      control.get('password')?.value
      ? null
      : { passwordMatch: 'Passwords do not match.' };
  }

  private validatePhoneNumber(
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
}

import { AccountService } from '../../services/account-service/account.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateAccountRequest } from '../../models/account.model';
import { FormUtils } from '../../common/utils/FormUtils';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss'],
})
export class CreateAccountModalComponent implements OnInit {
  public readonly STATES;
  public readonly PHONE_TYPES;

  public createAccountForm: FormGroup;
  public disableSubmitButton = false;

  get confirmEmail() {
    return this.createAccountForm.get('confirmEmail');
  }

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.STATES = FormUtils.STATES;
    this.PHONE_TYPES = FormUtils.getPhoneTypes();
  }

  ngOnInit(): void {
    this.createAccountForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      confirmEmail: ['', Validators.required],
      primaryPhone: ['', Validators.compose([Validators.required, FormUtils.validatePhoneNumber])],
      primaryType: ['', Validators.required],
      secondaryPhone: '',
      secondaryType: '',
      address: ['', Validators.required],
      address2: '',
      city: ['', Validators.required],
      zip: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{5}(?:-[0-9]{4})?$/)])],
      state: ['', Validators.required],
      certifiedBy: ['', Validators.required],
      certExpiry: [null, Validators.compose([Validators.required, FormUtils.validateDate])],
      caseworkerfname: ['', Validators.required],
      caseworkerlname: ['', Validators.required],
      caseworkeremail: ['', Validators.compose([Validators.required, Validators.email])],
      caseworkerphone: ['', Validators.compose([Validators.required, FormUtils.validatePhoneNumber])],
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
      approvalResponsibility: [null, Validators.compose([Validators.required, Validators.requiredTrue])],
      confidentialInformation: [null, Validators.compose([Validators.required, Validators.requiredTrue])],
      potentialShareInfo: [null, Validators.compose([Validators.required, Validators.requiredTrue])],
    });
    this.createAccountForm.setValidators([
      FormUtils.confirmEmailValidator,
      FormUtils.confirmPasswordValidator('confirmpassword', 'password'),
    ]);
    this.createAccountForm.get('secondaryPhone')?.valueChanges.subscribe((secondaryPhone: string) => {
      if (secondaryPhone === '' || secondaryPhone === null) {
        this.createAccountForm.get('secondaryPhone')?.setValidators([]);
        this.createAccountForm.get('secondaryType')?.setValidators([]);
      } else {
        this.createAccountForm.get('secondaryPhone')?.setValidators([FormUtils.validatePhoneNumber]);
        this.createAccountForm.get('secondaryType')?.setValidators([Validators.required]);
      }
      this.createAccountForm.get('secondaryPhone')?.updateValueAndValidity({ emitEvent: false });
      this.createAccountForm.get('secondaryType')?.updateValueAndValidity({ emitEvent: false });
    });
  }

  public createAccountSubmit(): void {
    if (this.createAccountForm.invalid) {
      this.createAccountForm.markAllAsTouched();
    } else {
      this.disableSubmitButton = true;

      const createAccountReq: CreateAccountRequest = {
        address: {
          addressLine1: this.createAccountForm.get('address')!.value,
          addressLine2: this.createAccountForm!.get('address2')?.value
            ? this.createAccountForm!.get('address2')!.value
            : undefined,
          city: this.createAccountForm!.get('city')!.value,
          zipcode: this.createAccountForm!.get('zip')!.value,
          state: this.createAccountForm!.get('state')!.value,
        },
        cwEmail: this.createAccountForm.get('caseworkeremail')!.value,
        cwFirstName: this.createAccountForm.get('caseworkerfname')!.value,
        cwLastName: this.createAccountForm.get('caseworkerlname')!.value,
        cwPhoneNumber: FormUtils.formatPhoneNumber(this.createAccountForm.get('caseworkerphone')!.value),
        certifiedBy: this.createAccountForm!.get('certifiedBy')!.value,
        certExpiry: this.createAccountForm!.get('certExpiry')!.value,
        email: this.createAccountForm.get('email')!.value.toLowerCase(),
        firstName: this.createAccountForm.get('fname')!.value,
        lastName: this.createAccountForm.get('lname')!.value,
        password: this.createAccountForm.get('password')!.value,
        primaryPhoneNumber: {
          phoneNumber: FormUtils.formatPhoneNumber(this.createAccountForm.get('primaryPhone')!.value),
          type: this.createAccountForm.get('primaryType')!.value,
        },
        secondaryPhoneNumber: this.createAccountForm.get('secondaryType')?.value
          ? {
              phoneNumber: FormUtils.formatPhoneNumber(this.createAccountForm.get('secondaryPhone')!.value),
              type: this.createAccountForm.get('secondaryType')!.value,
            }
          : undefined,
        username: this.createAccountForm.get('user')!.value.toLowerCase(),
      };

      this.accountService.createAccount(createAccountReq).subscribe(
        (res: CreateAccountRequest) => {
          this.router.navigate([`/login/create-account/verify/${res.email}`]);
        },
        (err) => {
          this.toastService.httpError(err);
          this.disableSubmitButton = false;
        }
      );
    }
  }
}

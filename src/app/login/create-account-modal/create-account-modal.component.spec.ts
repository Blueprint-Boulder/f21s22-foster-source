import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountModalComponent } from './create-account-modal.component';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountMockService } from '../../services/account-service/account.mock.service';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account-service/account.service';
import { of, throwError } from "rxjs";

describe('CreateAccountModalComponent', () => {
  let component: CreateAccountModalComponent;
  let fixture: ComponentFixture<CreateAccountModalComponent>;

  let createAccountForm: FormGroup;

  let firstNameControl: AbstractControl;
  let lastNameControl: AbstractControl;
  let usernameControl: AbstractControl;
  let emailControl: AbstractControl;
  let confirmEmailControl: AbstractControl;
  let passwordControl: AbstractControl;
  let confirmPasswordControl: AbstractControl;
  let primaryPhoneNumberControl: AbstractControl;
  let primaryPhoneTypeControl: AbstractControl;
  let secondaryPhoneNumberControl: AbstractControl;
  let secondaryPhoneNumberType: AbstractControl;
  let addressLine1Control: AbstractControl;
  let addressLine2Control: AbstractControl;
  let cityControl: AbstractControl;
  let stateControl: AbstractControl;
  let zipcodeControl: AbstractControl;
  let cwFirstNameControl: AbstractControl;
  let cwLastNameControl: AbstractControl;
  let cwEmailControl: AbstractControl;
  let cwPhoneNumberControl: AbstractControl;
  let certifiedByControl: AbstractControl;

  let submitButton: HTMLButtonElement;

  let accountService: AccountMockService = new AccountMockService();
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAccountModalComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: AccountService, useValue: accountService }],
    }).compileComponents();
    accountService = TestBed.inject(AccountService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    createAccountForm = component.createAccountForm;

    firstNameControl = createAccountForm.get('fname') as AbstractControl;
    lastNameControl = createAccountForm.get('lname') as AbstractControl;
    usernameControl = createAccountForm.get('user') as AbstractControl;
    emailControl = createAccountForm.get('email') as AbstractControl;
    confirmEmailControl = createAccountForm.get('confirmEmail') as AbstractControl;
    passwordControl = createAccountForm.get('password') as AbstractControl;
    confirmPasswordControl = createAccountForm.get('confirmpassword') as AbstractControl;
    primaryPhoneNumberControl = createAccountForm.get('primaryPhone') as AbstractControl;
    primaryPhoneTypeControl = createAccountForm.get('primaryType') as AbstractControl;
    secondaryPhoneNumberControl = createAccountForm.get('secondaryPhone') as AbstractControl;
    secondaryPhoneNumberType = createAccountForm.get('secondaryType') as AbstractControl;
    addressLine1Control = createAccountForm.get('address') as AbstractControl;
    addressLine2Control = createAccountForm.get('address2') as AbstractControl;
    cityControl = createAccountForm.get('city') as AbstractControl;
    stateControl = createAccountForm.get('state') as AbstractControl;
    zipcodeControl = createAccountForm.get('zip') as AbstractControl;
    cwFirstNameControl = createAccountForm.get('caseworkerfname') as AbstractControl;
    cwLastNameControl = createAccountForm.get('caseworkerlname') as AbstractControl;
    cwEmailControl = createAccountForm.get('caseworkeremail') as AbstractControl;
    cwPhoneNumberControl = createAccountForm.get('caseworkerphone') as AbstractControl;
    certifiedByControl = createAccountForm.get('certifiedBy') as AbstractControl;

    submitButton = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid if fields are not filled out', () => {
    expect(createAccountForm.invalid).toBeTrue();
  });

  it('should be valid if no optional fields are filled out', () => {
    firstNameControl.setValue('first');
    lastNameControl.setValue('last');
    usernameControl.setValue('username');
    emailControl.setValue('test@test.com');
    confirmEmailControl.setValue('test@test.com');
    passwordControl.setValue('asdfasdf');
    confirmPasswordControl.setValue('asdfasdf');
    primaryPhoneNumberControl.setValue('3033334443');
    primaryPhoneTypeControl.setValue('MOBILE');
    addressLine1Control.setValue('address line 1');
    cityControl.setValue('city');
    stateControl.setValue('Colorado');
    zipcodeControl.setValue('80310');
    cwFirstNameControl.setValue('Test');
    cwLastNameControl.setValue('Test');
    cwEmailControl.setValue('test@test.com');
    cwPhoneNumberControl.setValue('(303) 346 9887');
    certifiedByControl.setValue('Arapahoe County');

    createAccountForm.updateValueAndValidity();

    expect(createAccountForm.invalid).toBeFalse();
  });

  it('should be valid with all fields filled out', () => {
    firstNameControl.setValue('first');
    lastNameControl.setValue('last');
    usernameControl.setValue('username');
    emailControl.setValue('test@test.com');
    confirmEmailControl.setValue('test@test.com');
    passwordControl.setValue('asdfasdf');
    confirmPasswordControl.setValue('asdfasdf');
    primaryPhoneNumberControl.setValue('3033334443');
    primaryPhoneTypeControl.setValue('MOBILE');
    secondaryPhoneNumberControl.setValue('+17208499332');
    secondaryPhoneNumberType.setValue('HOME');
    addressLine1Control.setValue('address line 1');
    addressLine2Control.setValue('address line 2');
    cityControl.setValue('city');
    stateControl.setValue('Colorado');
    zipcodeControl.setValue('80310');
    cwFirstNameControl.setValue('Test');
    cwLastNameControl.setValue('Test');
    cwEmailControl.setValue('test@test.com');
    cwPhoneNumberControl.setValue('(303) 346 9887');
    certifiedByControl.setValue('Arapahoe County');

    createAccountForm.updateValueAndValidity();

    expect(createAccountForm.invalid).toBeFalse();
  });

  it('form should only allow properly formatted emails', () => {
    emailControl.setValue('test@test.com');
    expect(emailControl.errors?.email).toBeFalsy();
    emailControl.setValue('testtest');
    expect(emailControl.errors?.email).toBeTruthy();
    emailControl.setValue('te.com');
    expect(emailControl.errors?.email).toBeTruthy();
  });

  it('form should have validation error if emails dont match', () => {
    emailControl.setValue('test@test.com');
    confirmEmailControl.setValue('test@wrong.com');
    expect(createAccountForm.errors?.emailMatch).toBeTruthy();
  });

  it('form should not have validation error if emails match', () => {
    emailControl.setValue('test@test.com');
    confirmEmailControl.setValue('test@test.com');
    expect(createAccountForm.errors?.emailMatch).toBeFalsy();
  });

  it('password less than 8 characters should give error', () => {
    passwordControl.setValue('test');
    expect(passwordControl.errors?.minlength).toBeTruthy();
  });

  it('form should have validation error if passwords dont match', () => {
    passwordControl.setValue('testtest');
    confirmPasswordControl.setValue('wrongwrong');
    expect(createAccountForm.errors?.passwordMatch).toBeTruthy();
  });

  it('form should not have validation error if passwords match', () => {
    passwordControl.setValue('testtest');
    confirmPasswordControl.setValue('testtest');
    expect(createAccountForm.errors?.passwordMatch).toBeFalsy();
  });

  it('form should give an error for invalid phone number', () => {
    primaryPhoneNumberControl.setValue('test');
    expect(primaryPhoneNumberControl.errors?.invalidPhone).toBeTruthy();
    primaryPhoneNumberControl.setValue('0000');
    expect(primaryPhoneNumberControl.errors?.invalidPhone).toBeTruthy();
    primaryPhoneNumberControl.setValue('0010 10001 29993 1211');
    expect(primaryPhoneNumberControl.errors?.invalidPhone).toBeTruthy();
  });

  it('form should allow for multiple formats of phone numbers', () => {
    primaryPhoneNumberControl.setValue('303 346 9887');
    expect(primaryPhoneNumberControl.errors?.invalidPhone).toBeFalsy();
    primaryPhoneNumberControl.setValue('+13033469887');
    expect(primaryPhoneNumberControl.errors?.invalidPhone).toBeFalsy();
    primaryPhoneNumberControl.setValue('(303) 346-9887');
    expect(primaryPhoneNumberControl.errors?.invalidPhone).toBeFalsy();
  });

  it('form should give an error for invalid zip code', () => {
    zipcodeControl.setValue('test');
    expect(zipcodeControl.errors?.pattern).toBeTruthy();
    zipcodeControl.setValue('3033469889997');
    expect(zipcodeControl.errors?.pattern).toBeTruthy();
    zipcodeControl.setValue('123');
    expect(zipcodeControl.errors?.pattern).toBeTruthy();
  });

  it('form should allow multiple formats of zip codes', () => {
    zipcodeControl.setValue('80110');
    expect(primaryPhoneNumberControl.errors?.pattern).toBeFalsy();
    zipcodeControl.setValue('80302-7601');
    expect(primaryPhoneNumberControl.errors?.pattern).toBeFalsy();
  });

  it('case worker email field should only allow proper emails', () => {
    cwEmailControl.setValue('test@test.com');
    expect(cwEmailControl.errors?.email).toBeFalsy();
    cwEmailControl.setValue('test');
    expect(cwEmailControl.errors?.email).toBeTruthy();
  });

  it('case worker phone number should only allow proper phone numbers', () => {
    cwPhoneNumberControl.setValue('+17208499887');
    expect(cwPhoneNumberControl.errors?.invalidPhone).toBeFalsy();
    cwPhoneNumberControl.setValue('+17208499887abc');
    expect(cwPhoneNumberControl.errors?.invalidPhone).toBeTruthy();
  });

  it('should mark all fields as touched if form is invalid on submit', () => {
    spyOn(createAccountForm, 'markAllAsTouched');
    submitButton.click();
    expect(createAccountForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('with valid forms, should call create account', () => {
    spyOn(accountService, 'createAccount').and.returnValue(of());
    spyOn(component, 'createAccountSubmit').and.callThrough();

    firstNameControl.setValue('first');
    lastNameControl.setValue('last');
    usernameControl.setValue('username');
    emailControl.setValue('test@test.com');
    confirmEmailControl.setValue('test@test.com');
    passwordControl.setValue('asdfasdf');
    confirmPasswordControl.setValue('asdfasdf');
    primaryPhoneNumberControl.setValue('3033334443');
    primaryPhoneTypeControl.setValue('MOBILE');
    secondaryPhoneNumberControl.setValue('+17208499332');
    secondaryPhoneNumberType.setValue('HOME');
    addressLine1Control.setValue('address line 1');
    addressLine2Control.setValue('address line 2');
    cityControl.setValue('city');
    stateControl.setValue('Colorado');
    zipcodeControl.setValue('80310');
    cwFirstNameControl.setValue('Test');
    cwLastNameControl.setValue('Test');
    cwEmailControl.setValue('test@test.com');
    cwPhoneNumberControl.setValue('(303) 346 9887');
    certifiedByControl.setValue('Arapahoe County');

    createAccountForm.updateValueAndValidity();

    submitButton.click();

    expect(component.createAccountSubmit).toHaveBeenCalled();

    expect(accountService.createAccount).toHaveBeenCalled();
  });

  it('if create account succeeds, it should navigate to email verification page', () => {
    spyOn(accountService, 'createAccount').and.callThrough();
    spyOn(component, 'createAccountSubmit').and.callThrough();
    spyOn(router, 'navigate');

    firstNameControl.setValue('first');
    lastNameControl.setValue('last');
    usernameControl.setValue('username');
    emailControl.setValue('test@test.com');
    confirmEmailControl.setValue('test@test.com');
    passwordControl.setValue('asdfasdf');
    confirmPasswordControl.setValue('asdfasdf');
    primaryPhoneNumberControl.setValue('3033334443');
    primaryPhoneTypeControl.setValue('MOBILE');
    secondaryPhoneNumberControl.setValue('+17208499332');
    secondaryPhoneNumberType.setValue('HOME');
    addressLine1Control.setValue('address line 1');
    addressLine2Control.setValue('address line 2');
    cityControl.setValue('city');
    stateControl.setValue('Colorado');
    zipcodeControl.setValue('80310');
    cwFirstNameControl.setValue('Test');
    cwLastNameControl.setValue('Test');
    cwEmailControl.setValue('test@test.com');
    cwPhoneNumberControl.setValue('(303) 346 9887');
    certifiedByControl.setValue('Arapahoe County');

    createAccountForm.updateValueAndValidity();

    submitButton.click();

    expect(component.createAccountSubmit).toHaveBeenCalled();

    expect(accountService.createAccount).toHaveBeenCalled();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('if create account fails, it should not route anywhere and give the user an error', () => {
    spyOn(accountService, 'createAccount').and.returnValue(throwError(""));
    spyOn(component, 'createAccountSubmit').and.callThrough();
    spyOn(router, 'navigate');

    firstNameControl.setValue('first');
    lastNameControl.setValue('last');
    usernameControl.setValue('username');
    emailControl.setValue('test@test.com');
    confirmEmailControl.setValue('test@test.com');
    passwordControl.setValue('asdfasdf');
    confirmPasswordControl.setValue('asdfasdf');
    primaryPhoneNumberControl.setValue('3033334443');
    primaryPhoneTypeControl.setValue('MOBILE');
    secondaryPhoneNumberControl.setValue('+17208499332');
    secondaryPhoneNumberType.setValue('HOME');
    addressLine1Control.setValue('address line 1');
    addressLine2Control.setValue('address line 2');
    cityControl.setValue('city');
    stateControl.setValue('Colorado');
    zipcodeControl.setValue('80310');
    cwFirstNameControl.setValue('Test');
    cwLastNameControl.setValue('Test');
    cwEmailControl.setValue('test@test.com');
    cwPhoneNumberControl.setValue('(303) 346 9887');
    certifiedByControl.setValue('Arapahoe County');

    createAccountForm.updateValueAndValidity();

    submitButton.click();

    expect(component.createAccountSubmit).toHaveBeenCalled();

    expect(accountService.createAccount).toHaveBeenCalled();

    expect(router.navigate).toHaveBeenCalledTimes(0);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractControl, ReactiveFormsModule } from "@angular/forms";
import { AccountService } from "../../services/account-service/account.service";
import { AccountMockService } from "../../services/account-service/account.mock.service";
import { Router } from "@angular/router";
import { throwError } from "rxjs";

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  let accountService: AccountService = new AccountMockService();
  let router: Router;

  let passControl: AbstractControl;
  let newPassControl: AbstractControl;
  let confirmNewPassControl: AbstractControl;

  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [{provide: AccountService, useValue: accountService}]
    }).compileComponents();
    accountService = TestBed.inject(AccountService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    passControl = component.changePasswordForm.get('oldPassword') as AbstractControl;
    newPassControl = component.changePasswordForm.get('newPassword') as AbstractControl;
    confirmNewPassControl = component.changePasswordForm.get('confirmNewPassword') as AbstractControl;

    submitButton = fixture.debugElement.nativeElement.querySelector("button");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid if fields are all filled out, and allow submit', () => {
    passControl.setValue('oldpass');
    newPassControl.setValue('newpassword');
    confirmNewPassControl.setValue('newpassword');
    expect(component.changePasswordForm.invalid).toBeFalse();
  });
  it('should ensure that new password matches confirm new password field', () => {
    passControl.setValue('oldpass');
    newPassControl.setValue('newpassword');
    confirmNewPassControl.setValue('doesnotmatch');
    expect(component.changePasswordForm.invalid).toBeTrue();
  });
  it('Should not submit the form if its invalid', () => {
    spyOn(component.changePasswordForm, 'markAllAsTouched');
    spyOn(accountService,'updatePasswordForCurrentAccount');
    passControl.setValue('oldpass');
    newPassControl.setValue('newpassword');
    confirmNewPassControl.setValue('doesnotmatch');
    expect(component.changePasswordForm.invalid).toBeTrue();
    submitButton.click();
    expect(component.changePasswordForm.markAllAsTouched).toHaveBeenCalled();
    expect(accountService.updatePasswordForCurrentAccount).toHaveBeenCalledTimes(0);
  });
  it('if form is valid, it should make a call to the backend and navigate back to the account page.', () => {
    spyOn(component.changePasswordForm, 'markAllAsTouched');
    spyOn(accountService,'updatePasswordForCurrentAccount').and.callThrough();
    spyOn(router, 'navigate');
    passControl.setValue('oldpass');
    newPassControl.setValue('newpassword');
    confirmNewPassControl.setValue('newpassword');
    expect(component.changePasswordForm.invalid).toBeFalse();
    submitButton.click();
    expect(component.changePasswordForm.markAllAsTouched).toHaveBeenCalledTimes(0);
    expect(accountService.updatePasswordForCurrentAccount).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalled();
  });
  it('button should be disabled while submitting', () => {
    spyOn(component.changePasswordForm, 'markAllAsTouched');
    spyOn(accountService,'updatePasswordForCurrentAccount').and.callThrough();
    spyOn(router, 'navigate');
    passControl.setValue('oldpass');
    newPassControl.setValue('newpassword');
    confirmNewPassControl.setValue('newpassword');
    expect(component.changePasswordForm.invalid).toBeFalse();
    submitButton.click();
    expect(component.submittingForm).toBeTrue();
  });
  it('button should be not disabled upon failure of submit and should not navigate.', () => {
    spyOn(component.changePasswordForm, 'markAllAsTouched');
    spyOn(accountService,'updatePasswordForCurrentAccount').and.returnValue(throwError(""));
    spyOn(router, 'navigate');
    passControl.setValue('oldpass');
    newPassControl.setValue('newpassword');
    confirmNewPassControl.setValue('newpassword');
    expect(component.changePasswordForm.invalid).toBeFalse();
    submitButton.click();
    expect(component.submittingForm).toBeFalse();
    expect(router.navigate).toHaveBeenCalledTimes(0);
  });
});

import { AccountMockService } from '../../services/account-service/account.mock.service';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account-service/account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginModalComponent } from './login-modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";

describe('LoginModalComponent', () => {

  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  let loginForm: FormGroup;
  let usernameControl: AbstractControl;
  let passwordControl: AbstractControl;
  let rememberMeControl: AbstractControl;
  let submitButton: HTMLButtonElement;

  let accountService: AccountMockService = new AccountMockService();
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginModalComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: AccountService, useValue: accountService}]
    }).compileComponents();
    accountService = TestBed.inject(AccountService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loginForm = fixture.componentInstance.loginForm;
    usernameControl = loginForm.get('username') as AbstractControl;
    passwordControl = loginForm.get('password') as AbstractControl;
    rememberMeControl = loginForm.get('remember') as AbstractControl;
    submitButton = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login form should be valid when both fields filled out', () => {
    usernameControl.setValue('fakeusername');
    passwordControl.setValue('fakePassword');
    expect(loginForm.invalid).toBeFalse();
  });
  it('login form should be invalid when just username is filled out', () => {
    usernameControl.setValue('fakeusername');
    expect(loginForm.invalid).toBeTrue();
  });

  it('login form should be invalid when just password is filled out', () => {
    passwordControl.setValue('fakepass');
    expect(loginForm.invalid).toBeTrue();
  });

  it('Form should submit when login button is clicked', () => {
    spyOn(component, 'loginSubmit');
    submitButton.click();
    expect(component.loginSubmit).toHaveBeenCalled();
  });

  it('Form should login when form is valid', () => {
    spyOn(accountService, 'login').and.returnValue(of(""));
    spyOn(component, 'loginSubmit').and.callThrough();

    usernameControl.setValue('fakeusername');
    passwordControl.setValue('fakePassword');
    loginForm.updateValueAndValidity();

    expect(loginForm.invalid).toBeFalse();

    submitButton.click();

    expect(component.loginSubmit).toHaveBeenCalled();
    expect(accountService.login).toHaveBeenCalled();
  });

  it('Form should login when form is valid', () => {
    spyOn(accountService, 'login').and.returnValue(of(""));
    spyOn(component, 'loginSubmit').and.callThrough();

    usernameControl.setValue('fakeusername');

    loginForm.updateValueAndValidity();

    submitButton.click();

    expect(component.loginSubmit).toHaveBeenCalled();
    expect(accountService.login).toHaveBeenCalledTimes(0);
  });

  it('should mark all fields as touched if the user tries to submit an invalid form', () => {
    spyOn(component, 'loginSubmit').and.callThrough();
    spyOn(loginForm, 'markAllAsTouched');

    usernameControl.setValue('fakeusername');

    loginForm.updateValueAndValidity();

    submitButton.click();

    expect(component.loginSubmit).toHaveBeenCalled();
    expect(loginForm.markAllAsTouched).toHaveBeenCalled();
  })

  it('should navigate away from the page when login succeeds.', () => {
    spyOn(accountService, 'login').and.returnValue(of(""));
    spyOn(component, 'loginSubmit').and.callThrough();
    spyOn(router, 'navigate').and.stub();

    usernameControl.setValue('fakeusername');
    passwordControl.setValue('fakePassword');
    loginForm.updateValueAndValidity();

    expect(loginForm.invalid).toBeFalse();

    submitButton.click();

    expect(component.loginSubmit).toHaveBeenCalled();
    expect(accountService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should not navigate away from the page when login fails.', () => {
    spyOn(accountService, 'login').and.returnValue(throwError(""));
    spyOn(component, 'loginSubmit').and.callThrough();
    spyOn(router, 'navigate').and.stub();

    usernameControl.setValue('fakeusername');
    passwordControl.setValue('fakePassword');
    loginForm.updateValueAndValidity();

    expect(loginForm.invalid).toBeFalse();

    submitButton.click();

    expect(component.loginSubmit).toHaveBeenCalled();
    expect(accountService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(0);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModRegisterComponent } from './mod-register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractControl, ReactiveFormsModule } from "@angular/forms";
import { AccountService } from "../../services/account-service/account.service";
import { AccountMockService } from "../../services/account-service/account.mock.service";
import { Router } from "@angular/router";
import { throwError } from "rxjs";

describe('ModRegisterComponent', () => {
  let component: ModRegisterComponent;
  let fixture: ComponentFixture<ModRegisterComponent>;

  let accountService: AccountService = new AccountMockService();
  let router: Router;

  let firstNameControl: AbstractControl;
  let lastNameControl: AbstractControl;
  let emailControl: AbstractControl;
  let confirmEmailControl: AbstractControl;
  let primaryPhoneControl: AbstractControl;
  let primaryTypeControl: AbstractControl;
  let secondaryPhoneControl: AbstractControl;
  let secondaryTypeControl: AbstractControl;
  let addressControl: AbstractControl;
  let address2Control: AbstractControl;
  let cityControl: AbstractControl;
  let zipControl: AbstractControl;
  let stateControl: AbstractControl;
  let userControl: AbstractControl;
  let passwordControl: AbstractControl;
  let confirmPasswordControl: AbstractControl;
  let staffAccessKeyControl: AbstractControl;
  let privilegeLevelControl: AbstractControl;

  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModRegisterComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [{provide: AccountService, useValue: accountService}]
    }).compileComponents();
    accountService = TestBed.inject(AccountService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    firstNameControl = component.createStaffAccountForm.get('fname') as AbstractControl;
    lastNameControl = component.createStaffAccountForm.get('lname') as AbstractControl;
    emailControl = component.createStaffAccountForm.get('email') as AbstractControl;
    confirmEmailControl = component.createStaffAccountForm.get('confirmEmail') as AbstractControl;
    primaryPhoneControl = component.createStaffAccountForm.get('primaryPhone') as AbstractControl;
    primaryTypeControl = component.createStaffAccountForm.get('primaryType') as AbstractControl;
    secondaryPhoneControl = component.createStaffAccountForm.get('secondaryPhone') as AbstractControl;
    secondaryTypeControl = component.createStaffAccountForm.get('secondaryType') as AbstractControl;
    addressControl = component.createStaffAccountForm.get('address') as AbstractControl;
    address2Control = component.createStaffAccountForm.get('address2') as AbstractControl;
    cityControl = component.createStaffAccountForm.get('city') as AbstractControl;
    zipControl = component.createStaffAccountForm.get('zip') as AbstractControl;
    stateControl = component.createStaffAccountForm.get('state') as AbstractControl;
    userControl = component.createStaffAccountForm.get('user') as AbstractControl;
    passwordControl = component.createStaffAccountForm.get('password') as AbstractControl;
    confirmPasswordControl = component.createStaffAccountForm.get('confirmpassword') as AbstractControl;
    staffAccessKeyControl = component.createStaffAccountForm.get('staffAccessKey') as AbstractControl;
    privilegeLevelControl = component.createStaffAccountForm.get('privilegeLevel') as AbstractControl;

    submitButton = fixture.debugElement.nativeElement.querySelector('#createAccountButton');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid with all required fields', () => {
    firstNameControl.setValue('test');
    lastNameControl.setValue('test');
    userControl.setValue('joeman');
    emailControl.setValue('test@test.com');
    confirmEmailControl.setValue('test@test.com');
    passwordControl.setValue('password');
    confirmPasswordControl.setValue('password');
    primaryPhoneControl.setValue('+17208499332');
    primaryTypeControl.setValue('MOBILE');
    addressControl.setValue('123 main st');
    cityControl.setValue('Boulder');
    stateControl.setValue('CO');
    zipControl.setValue('80302');
    staffAccessKeyControl.setValue('FSKEY');
    privilegeLevelControl.setValue('MOD');
    expect(component.createStaffAccountForm.invalid).toBeFalse();
  });
  it('should be valid with all fields ', () => {
    firstNameControl.setValue('test');
    lastNameControl.setValue('test');
    userControl.setValue('joeman');
    emailControl.setValue('test@test.com');
    confirmEmailControl.setValue('test@test.com');
    passwordControl.setValue('password');
    confirmPasswordControl.setValue('password');
    primaryPhoneControl.setValue('+17208499332');
    primaryTypeControl.setValue('MOBILE');
    secondaryPhoneControl.setValue('303 346 9887');
    secondaryTypeControl.setValue('HOME');
    addressControl.setValue('123 main st');
    address2Control.setValue('Apt 101')
    cityControl.setValue('Boulder');
    stateControl.setValue('CO');
    zipControl.setValue('80302');
    staffAccessKeyControl.setValue('FSKEY');
    privilegeLevelControl.setValue('MOD');
    expect(component.createStaffAccountForm.invalid).toBeFalse();
  })
  it('should be invalid if emails dont match', () => {
    firstNameControl.setValue('test');
    lastNameControl.setValue('test');
    userControl.setValue('joeman');
    emailControl.setValue('test@test.com');
    confirmEmailControl.setValue('wrong@test.com');
    passwordControl.setValue('password');
    confirmPasswordControl.setValue('password');
    primaryPhoneControl.setValue('+17208499332');
    primaryTypeControl.setValue('MOBILE');
    addressControl.setValue('123 main st');
    cityControl.setValue('Boulder');
    stateControl.setValue('CO');
    zipControl.setValue('80302');
    staffAccessKeyControl.setValue('FSKEY');
    privilegeLevelControl.setValue('MOD');
    expect(component.createStaffAccountForm.invalid).toBeTrue();
  })
  it('should be invalid if passwords dont match', () => {
    firstNameControl.setValue('test');
    lastNameControl.setValue('test');
    userControl.setValue('joeman');
    emailControl.setValue('test@test.com');
    confirmEmailControl.setValue('test@test.com');
    passwordControl.setValue('password');
    confirmPasswordControl.setValue('wrongpass');
    primaryPhoneControl.setValue('+17208499332');
    primaryTypeControl.setValue('MOBILE');
    addressControl.setValue('123 main st');
    cityControl.setValue('Boulder');
    stateControl.setValue('CO');
    zipControl.setValue('80302');
    staffAccessKeyControl.setValue('FSKEY');
    privilegeLevelControl.setValue('MOD');
    expect(component.createStaffAccountForm.invalid).toBeTrue();
  })
  it('if try to submit invalid, should mark all as touched', ()=>{
    spyOn(component.createStaffAccountForm, 'markAllAsTouched').and.callThrough();
    submitButton.click();
    expect(component.createStaffAccountForm.markAllAsTouched).toHaveBeenCalled();
  });
  it('if submit, disable submit button and navigate', async()=>{
    spyOn(accountService, 'createStaffAccount').and.callThrough();
    spyOn(router, 'navigate');
    firstNameControl.setValue('test');
    lastNameControl.setValue('test');
    userControl.setValue('joeman');
    emailControl.setValue('test@test.com');
    confirmEmailControl.setValue('test@test.com');
    passwordControl.setValue('password');
    confirmPasswordControl.setValue('password');
    primaryPhoneControl.setValue('+17208499332');
    primaryTypeControl.setValue('MOBILE');
    addressControl.setValue('123 main st');
    cityControl.setValue('Boulder');
    stateControl.setValue('CO');
    zipControl.setValue('80302');
    staffAccessKeyControl.setValue('FSKEY');
    privilegeLevelControl.setValue('MOD');
    expect(component.createStaffAccountForm.invalid).toBeFalse();
    submitButton.click();
    expect(accountService.createStaffAccount).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();

    fixture.detectChanges()
    fixture.whenStable().then(() => {
      expect(submitButton.getAttribute('disabled')).toEqual('');
    });
  });
  it('enable submit button and dont navigate on failure', async()=>{
    spyOn(accountService, 'createStaffAccount').and.returnValue(throwError(''));
    spyOn(router, 'navigate');
    firstNameControl.setValue('test');
    lastNameControl.setValue('test');
    userControl.setValue('joeman');
    emailControl.setValue('test@test.com');
    confirmEmailControl.setValue('test@test.com');
    passwordControl.setValue('password');
    confirmPasswordControl.setValue('password');
    primaryPhoneControl.setValue('+17208499332');
    primaryTypeControl.setValue('MOBILE');
    addressControl.setValue('123 main st');
    cityControl.setValue('Boulder');
    stateControl.setValue('CO');
    zipControl.setValue('80302');
    staffAccessKeyControl.setValue('FSKEY');
    privilegeLevelControl.setValue('MOD');
    expect(component.createStaffAccountForm.invalid).toBeFalse();
    submitButton.click();
    expect(accountService.createStaffAccount).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(0);

    fixture.detectChanges()
    fixture.whenStable().then(() => {
      expect(submitButton.getAttribute('disabled')).toEqual(null);
    });
  });
  it('should require secondary phone type if secondary phone entered in', () => {
    firstNameControl.setValue('test');
    lastNameControl.setValue('test');
    userControl.setValue('joeman');
    emailControl.setValue('test@test.com');
    confirmEmailControl.setValue('test@test.com');
    passwordControl.setValue('password');
    confirmPasswordControl.setValue('password');
    primaryPhoneControl.setValue('+17208499332');
    primaryTypeControl.setValue('MOBILE');
    secondaryPhoneControl.setValue('303 346 9887');
    addressControl.setValue('123 main st');
    address2Control.setValue('Apt 101')
    cityControl.setValue('Boulder');
    stateControl.setValue('CO');
    zipControl.setValue('80302');
    staffAccessKeyControl.setValue('FSKEY');
    privilegeLevelControl.setValue('MOD');
    expect(component.createStaffAccountForm.invalid).toBeTrue();
  });
});

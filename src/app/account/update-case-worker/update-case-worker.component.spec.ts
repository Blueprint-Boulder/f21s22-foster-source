import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCaseWorkerComponent } from './update-case-worker.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AccountMockService } from '../../services/account-service/account.mock.service';
import { AccountService } from '../../services/account-service/account.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

describe('UpdateCaseWorkerComponent', () => {
  let component: UpdateCaseWorkerComponent;
  let fixture: ComponentFixture<UpdateCaseWorkerComponent>;

  let accountService: AccountService = new AccountMockService();
  let router: Router;

  let firstNameControl: AbstractControl;
  let lastNameControl: AbstractControl;
  let emailControl: AbstractControl;
  let phoneControl: AbstractControl;
  let certifiedControl: AbstractControl;
  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCaseWorkerComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: AccountService, useValue: accountService }],
    }).compileComponents();
    accountService = TestBed.inject(AccountService);
    spyOn(accountService, 'getCwInfo').and.callThrough();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCaseWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    firstNameControl = component.updateCwInfoForm.get('caseworkerfname') as AbstractControl;
    lastNameControl = component.updateCwInfoForm.get('caseworkerlname') as AbstractControl;
    emailControl = component.updateCwInfoForm.get('caseworkeremail') as AbstractControl;
    phoneControl = component.updateCwInfoForm.get('caseworkerphone') as AbstractControl;
    certifiedControl = component.updateCwInfoForm.get('certifiedBy') as AbstractControl;

    submitButton = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch case worker information on load', () => {
    expect(accountService.getCwInfo).toHaveBeenCalled();
  });
  it('should be invalid if any field is not filled out', () => {
    expect(component.updateCwInfoForm.invalid).toBeTrue();
    firstNameControl.setValue('First');
    lastNameControl.setValue('Last');
    emailControl.setValue('test@test.com');
    expect(component.updateCwInfoForm.invalid).toBeTrue();
    phoneControl.setValue('+13033467758');
    expect(component.updateCwInfoForm.invalid).toBeTrue();
  });
  it('should mark all as touched if try to submit invalid', () => {
    spyOn(component.updateCwInfoForm, 'markAllAsTouched');
    spyOn(router, 'navigate');
    submitButton.click();
    expect(component.updateCwInfoForm.markAllAsTouched).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(0);
  });
  it('should make call to backend if valid, and navigate to account page', () => {
    spyOn(accountService, 'updateCwInfo').and.callThrough();
    spyOn(router, 'navigate');
    firstNameControl.setValue('First');
    lastNameControl.setValue('Last');
    emailControl.setValue('test@test.com');
    phoneControl.setValue('+13033467758');
    certifiedControl.setValue('Arapahoe');
    expect(component.updateCwInfoForm.invalid).toBeFalse();
    submitButton.click();
    expect(accountService.updateCwInfo).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should disable button on submit valid form', () => {
    spyOn(accountService, 'updateCwInfo').and.callThrough();
    spyOn(router, 'navigate');
    firstNameControl.setValue('First');
    lastNameControl.setValue('Last');
    emailControl.setValue('test@test.com');
    phoneControl.setValue('+13033467758');
    certifiedControl.setValue('Arapahoe');
    expect(component.updateCwInfoForm.invalid).toBeFalse();
    submitButton.click();
    expect(component.submittingForm).toBeTrue();
  });
  it('should enable button again if call fails, dont navigate', () => {
    spyOn(accountService, 'updateCwInfo').and.returnValue(throwError(''));
    spyOn(router, 'navigate');
    firstNameControl.setValue('First');
    lastNameControl.setValue('Last');
    emailControl.setValue('test@test.com');
    phoneControl.setValue('+13033467758');
    certifiedControl.setValue('Arapahoe');
    expect(component.updateCwInfoForm.invalid).toBeFalse();
    submitButton.click();
    expect(component.submittingForm).toBeFalse();
  });
});

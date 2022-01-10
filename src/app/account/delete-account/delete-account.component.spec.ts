import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountComponent } from './delete-account.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractControl, ReactiveFormsModule } from "@angular/forms";
import { AccountService } from "../../services/account-service/account.service";
import { AccountMockService } from "../../services/account-service/account.mock.service";
import { Router } from "@angular/router";
import { throwError } from "rxjs";

describe('DeleteAccountComponent', () => {
  let component: DeleteAccountComponent;
  let fixture: ComponentFixture<DeleteAccountComponent>;

  let accountService: AccountService = new AccountMockService();
  let router: Router;

  let passwordControl: AbstractControl;
  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteAccountComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [{provide: AccountService, useValue: accountService}]
    }).compileComponents();
    accountService = TestBed.inject(AccountService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    passwordControl = component.deleteAccountForm.get('password') as AbstractControl;
    submitButton = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not let you submit if you do not enter password', () => {
    spyOn(router, 'navigate');
    submitButton.click();
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(component.submittingForm).toBeFalse();
  });

  it('if you submit without password, mark all fields as touched', () => {
    spyOn(component.deleteAccountForm, 'markAllAsTouched');
    submitButton.click();
    expect(component.deleteAccountForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('when form valid, submit, make call to backend, navigate away', () => {
    spyOn(component.deleteAccountForm, 'markAllAsTouched');
    spyOn(router, 'navigate');
    spyOn(accountService, 'deleteOwnAccount').and.callThrough();
    passwordControl.setValue('password')
    submitButton.click();
    expect(component.deleteAccountForm.markAllAsTouched).toHaveBeenCalledTimes(0);
    expect(accountService.deleteOwnAccount).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('button should be enabled again after failure', () => {
    spyOn(component.deleteAccountForm, 'markAllAsTouched');
    spyOn(router, 'navigate');
    spyOn(accountService, 'deleteOwnAccount').and.returnValue(throwError(""));
    passwordControl.setValue('password')
    submitButton.click();
    expect(component.deleteAccountForm.markAllAsTouched).toHaveBeenCalledTimes(0);
    expect(component.submittingForm).toBeFalse();
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhoneComponent } from './update-phone.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { PhoneNumberService } from '../../services/phone-number-service/phone-number.service';
import { PhoneNumberMockService } from '../../services/phone-number-service/phone-number.mock.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

describe('UpdatePhoneComponent', () => {
  let component: UpdatePhoneComponent;
  let fixture: ComponentFixture<UpdatePhoneComponent>;

  let phoneService: PhoneNumberService = new PhoneNumberMockService();
  let router: Router;

  let primaryControl: AbstractControl;
  let primaryTypeControl: AbstractControl;
  let secondaryControl: AbstractControl;
  let secondaryTypeControl: AbstractControl;
  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePhoneComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: PhoneNumberService, useValue: phoneService }],
    }).compileComponents();
    phoneService = TestBed.inject(PhoneNumberService);
    spyOn(phoneService, 'getPhoneNumbers').and.callThrough();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    primaryControl = component.updatePhoneForm.get('primaryPhone') as AbstractControl;
    primaryTypeControl = component.updatePhoneForm.get('primaryType') as AbstractControl;
    secondaryControl = component.updatePhoneForm.get('secondaryPhone') as AbstractControl;
    secondaryTypeControl = component.updatePhoneForm.get('secondaryType') as AbstractControl;

    submitButton = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get get phone numbers on page load', () => {
    expect(phoneService.getPhoneNumbers).toHaveBeenCalled();
  });
  it('should have both fields be optional', () => {
    expect(primaryControl.errors).toBeFalsy();
    expect(secondaryControl.errors).toBeFalsy();
    expect(component.updatePhoneForm.invalid).toBeFalse();
  });
  it('primary: if number is filled out, type must be filled out', () => {
    primaryControl.setValue('+13033469887');
    expect(primaryTypeControl.errors).toBeTruthy();
    expect(component.updatePhoneForm.invalid).toBeTrue();
  });
  it('secondary: if number is filled out, type must be filled out', () => {
    secondaryControl.setValue('+13033469887');
    expect(secondaryTypeControl.errors).toBeTruthy();
    expect(component.updatePhoneForm.invalid).toBeTrue();
  });
  it('should mark fields as touched if submit invalid', () => {
    spyOn(component.updatePhoneForm, 'markAllAsTouched');
    secondaryControl.setValue('+13033469887');
    expect(component.updatePhoneForm.invalid).toBeTrue();
    submitButton.click();
    expect(component.updatePhoneForm.markAllAsTouched).toHaveBeenCalled();
  });
  it('should make backend call and navigate to account page if valid', () => {
    spyOn(phoneService, 'updatePhoneNumber').and.callThrough();
    spyOn(router, 'navigate');
    primaryControl.setValue('+13033469887');
    primaryTypeControl.setValue('MOBILE');
    expect(component.updatePhoneForm.invalid).toBeFalse();
    submitButton.click();
    expect(phoneService.updatePhoneNumber).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(component.submittingForm).toBeTrue();
  });
  it('should enable button and not navigate on backend fail', () => {
    spyOn(phoneService, 'updatePhoneNumber').and.returnValue(throwError(''));
    spyOn(router, 'navigate');
    primaryControl.setValue('+13033469887');
    primaryTypeControl.setValue('MOBILE');
    expect(component.updatePhoneForm.invalid).toBeFalse();
    submitButton.click();
    expect(phoneService.updatePhoneNumber).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(component.submittingForm).toBeFalse();
  });
});

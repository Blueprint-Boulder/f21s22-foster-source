import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAddressComponent } from './update-address.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from '../../services/address-service/address.service';
import { AddressMockService } from '../../services/address-service/address.mock.service';
import { throwError } from "rxjs";

describe('UpdateAddressComponent', () => {
  let component: UpdateAddressComponent;
  let fixture: ComponentFixture<UpdateAddressComponent>;

  let addressService: AddressService = new AddressMockService();
  let router: Router;

  let line1Control: AbstractControl;
  let line2Control: AbstractControl;
  let cityControl: AbstractControl;
  let zipControl: AbstractControl;
  let stateControl: AbstractControl;
  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAddressComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: AddressService, useValue: addressService }],
    }).compileComponents();
    addressService = TestBed.inject(AddressService);
    spyOn(addressService, 'getCurrentAddress').and.callThrough();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    line1Control = component.updateAddressForm.get('address') as AbstractControl;
    line2Control = component.updateAddressForm.get('address2') as AbstractControl;
    cityControl = component.updateAddressForm.get('city') as AbstractControl;
    zipControl = component.updateAddressForm.get('zip') as AbstractControl;
    stateControl = component.updateAddressForm.get('state') as AbstractControl;
    submitButton = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the users address on page load', () => {
    expect(addressService.getCurrentAddress).toHaveBeenCalled();
  });
  it('should be invalid if missing any required fields', () => {
    line1Control.setValue('line 1');
    cityControl.setValue('denver');
    expect(component.updateAddressForm.invalid).toBeTrue();
    line1Control.setValue('line 1');
    line2Control.setValue('Apt 101');
    cityControl.setValue('denver');
    zipControl.setValue('80201');
    expect(component.updateAddressForm.invalid).toBeTrue();
  });
  it('should be valid if required fields filled out', () => {
    line1Control.setValue('line 1');
    cityControl.setValue('denver');
    zipControl.setValue('80201');
    stateControl.setValue('CO');
    expect(component.updateAddressForm.invalid).toBeFalse();
  });
  it('should be valid if optional fields are also filled out', () => {
    line1Control.setValue('line 1');
    line2Control.setValue('apt 101');
    cityControl.setValue('denver');
    zipControl.setValue('80201');
    stateControl.setValue('CO');
    expect(component.updateAddressForm.invalid).toBeFalse();
  });
  it('should mark fields as invalid if submit invalid, and not navigate', () => {
    spyOn(component.updateAddressForm, 'markAllAsTouched');
    spyOn(router,'navigate');
    submitButton.click();
    expect(component.updateAddressForm.invalid).toBeTrue();
    expect(component.updateAddressForm.markAllAsTouched).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(0);
  });
  it('should update address and navigate to account page if valid', () => {
    spyOn(addressService, 'updateAddress').and.callThrough();
    spyOn(router, 'navigate');
    line1Control.setValue('line 1');
    line2Control.setValue('apt 101');
    cityControl.setValue('denver');
    zipControl.setValue('80201');
    stateControl.setValue('CO');
    expect(component.updateAddressForm.invalid).toBeFalse();
    submitButton.click();
    expect(addressService.updateAddress).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should enable button if backend call fails, dont navigate', () => {
    spyOn(addressService, 'updateAddress').and.returnValue(throwError(""));
    spyOn(router, 'navigate');
    line1Control.setValue('line 1');
    line2Control.setValue('apt 101');
    cityControl.setValue('denver');
    zipControl.setValue('80201');
    stateControl.setValue('CO');
    expect(component.updateAddressForm.invalid).toBeFalse();
    submitButton.click();
    expect(submitButton.disabled).toBeFalse();
  });
  it('should disable button when submitting', () => {
    spyOn(addressService, 'updateAddress').and.callThrough();
    spyOn(router, 'navigate');
    line1Control.setValue('line 1');
    line2Control.setValue('apt 101');
    cityControl.setValue('denver');
    zipControl.setValue('80201');
    stateControl.setValue('CO');
    expect(component.updateAddressForm.invalid).toBeFalse();
    submitButton.click();
    expect(component.submittingForm).toBeTrue();
  });
});

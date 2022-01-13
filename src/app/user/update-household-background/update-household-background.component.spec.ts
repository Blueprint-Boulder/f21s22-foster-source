import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHouseholdBackgroundComponent } from './update-household-background.component';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ProfileMockService } from '../../services/profile-service/profile.mock.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { throwError } from 'rxjs';

describe('UpdateHouseholdBackgroundComponent', () => {
  let component: UpdateHouseholdBackgroundComponent;
  let fixture: ComponentFixture<UpdateHouseholdBackgroundComponent>;

  let profileService: ProfileService = new ProfileMockService();
  let router: Router;

  let parentalUnitSizeControl: AbstractControl;
  let householdSizeControl: AbstractControl;
  let childrenInHouseholdControl: AbstractControl;
  let childrenInfoControl: AbstractControl;
  let vehicleAccessControl: AbstractControl;
  let lgbtCareExperienceControl: AbstractControl;
  let caredForPhysDisabledControl: AbstractControl;
  let caredForIntelDisabledControl: AbstractControl;
  let caredForMedicallyFragileControl: AbstractControl;
  let ownsFirearmControl: AbstractControl;
  let petInfoControl: AbstractControl;
  let additionalDetailsControl: AbstractControl;

  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateHouseholdBackgroundComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: ProfileService, useValue: profileService }],
    }).compileComponents();
    profileService = TestBed.inject(ProfileService);
    spyOn(profileService, 'getCurrentProfile').and.callThrough();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHouseholdBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    parentalUnitSizeControl = component.updateHouseholdBackgroundForm.get('parentalUnitSize') as AbstractControl;
    householdSizeControl = component.updateHouseholdBackgroundForm.get('householdSize') as AbstractControl;
    childrenInHouseholdControl = component.updateHouseholdBackgroundForm.get('childrenInHousehold') as AbstractControl;
    childrenInfoControl = component.updateHouseholdBackgroundForm.get('childrenInfo') as AbstractControl;
    vehicleAccessControl = component.updateHouseholdBackgroundForm.get('vehicleAccess') as AbstractControl;
    lgbtCareExperienceControl = component.updateHouseholdBackgroundForm.get('lgbtCareExperience') as AbstractControl;
    caredForPhysDisabledControl = component.updateHouseholdBackgroundForm.get(
      'caredForPhysDisabled'
    ) as AbstractControl;
    caredForIntelDisabledControl = component.updateHouseholdBackgroundForm.get(
      'caredForIntelDisabled'
    ) as AbstractControl;
    caredForMedicallyFragileControl = component.updateHouseholdBackgroundForm.get(
      'caredForMedicallyFragile'
    ) as AbstractControl;
    ownsFirearmControl = component.updateHouseholdBackgroundForm.get('ownsFirearm') as AbstractControl;
    petInfoControl = component.updateHouseholdBackgroundForm.get('petInfo') as AbstractControl;
    additionalDetailsControl = component.updateHouseholdBackgroundForm.get('additionalDetails') as AbstractControl;

    submitButton = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch current profile on load', () => {
    expect(profileService.getCurrentProfile).toHaveBeenCalled();
  });

  it('should be valid with just some fields', () => {
    parentalUnitSizeControl.setValue(7);
    expect(component.updateHouseholdBackgroundForm.invalid).toBeFalse();
    parentalUnitSizeControl.setValue(null);
    householdSizeControl.setValue(7);
    expect(component.updateHouseholdBackgroundForm.invalid).toBeFalse();
    householdSizeControl.setValue(null);
    childrenInHouseholdControl.setValue(7);
    expect(component.updateHouseholdBackgroundForm.invalid).toBeFalse();
    childrenInHouseholdControl.setValue(null);
    childrenInfoControl.setValue('test Val');
    expect(component.updateHouseholdBackgroundForm.invalid).toBeFalse();
    childrenInfoControl.setValue(null);
    vehicleAccessControl.setValue(false);
    expect(component.updateHouseholdBackgroundForm.invalid).toBeFalse();
    vehicleAccessControl.setValue(null);
    lgbtCareExperienceControl.setValue(false);
    expect(component.updateHouseholdBackgroundForm.invalid).toBeFalse();
    lgbtCareExperienceControl.setValue(null);
    caredForPhysDisabledControl.setValue(false);
    expect(component.updateHouseholdBackgroundForm.invalid).toBeFalse();
    caredForPhysDisabledControl.setValue(null);
    caredForIntelDisabledControl.setValue(true);
    expect(component.updateHouseholdBackgroundForm.invalid).toBeFalse();
    caredForIntelDisabledControl.setValue(null);
    caredForMedicallyFragileControl.setValue(false);
    expect(component.updateHouseholdBackgroundForm.invalid).toBeFalse();
    caredForMedicallyFragileControl.setValue(null);
    ownsFirearmControl.setValue(true);
    expect(component.updateHouseholdBackgroundForm.invalid).toBeFalse();
    ownsFirearmControl.setValue(null);
    petInfoControl.setValue('test Val');
    expect(component.updateHouseholdBackgroundForm.invalid).toBeFalse();
    petInfoControl.setValue(null);
    additionalDetailsControl.setValue('test Val');
    expect(component.updateHouseholdBackgroundForm.invalid).toBeFalse();
  });
  it('should be valid with all fields', () => {
    parentalUnitSizeControl.setValue(5);
    householdSizeControl.setValue(5);
    childrenInHouseholdControl.setValue(5);
    childrenInfoControl.setValue('test val');
    vehicleAccessControl.setValue(true);
    lgbtCareExperienceControl.setValue(false);
    caredForPhysDisabledControl.setValue(true);
    caredForIntelDisabledControl.setValue(false);
    caredForMedicallyFragileControl.setValue(true);
    ownsFirearmControl.setValue(true);
    petInfoControl.setValue('test val');
    additionalDetailsControl.setValue('test val');
    expect(component.updateHouseholdBackgroundForm.invalid).toBeFalse();
  });
  it('should send request to backend, disable submit button, and navigate on successful submit', async () => {
    spyOn(profileService, 'updateHouseholdBackground').and.callThrough();
    spyOn(router, 'navigate');
    childrenInfoControl.setValue('test val');
    vehicleAccessControl.setValue(true);
    submitButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(profileService.updateHouseholdBackground).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalled();
      expect(submitButton.getAttribute('disabled')).toEqual('');
    });
  });
  it('should not navigate, enable submit button on backend error', () => {
    spyOn(profileService, 'updateHouseholdBackground').and.returnValue(throwError(''));
    childrenInfoControl.setValue('test val');
    vehicleAccessControl.setValue(true);
    submitButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(profileService.updateHouseholdBackground).toHaveBeenCalled();
      expect(submitButton.getAttribute('disabled')).toEqual(null);
    });
  });
});

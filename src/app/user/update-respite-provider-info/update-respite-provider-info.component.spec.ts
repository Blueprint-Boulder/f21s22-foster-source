import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRespiteProviderInfoComponent } from './update-respite-provider-info.component';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ProfileMockService } from '../../services/profile-service/profile.mock.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { throwError } from 'rxjs';

describe('UpdateRespiteProviderInfoComponent', () => {
  let component: UpdateRespiteProviderInfoComponent;
  let fixture: ComponentFixture<UpdateRespiteProviderInfoComponent>;

  let profileService: ProfileService = new ProfileMockService();
  let router: Router;

  let cityCanProvideRespiteInControl: AbstractControl;
  let respiteTravelDistanceControl: AbstractControl;
  let careForMinAgeControl: AbstractControl;
  let careForMaxAgeControl: AbstractControl;
  let maxNumCareForControl: AbstractControl;

  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRespiteProviderInfoComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: ProfileService, useValue: profileService }],
    }).compileComponents();
    profileService = TestBed.inject(ProfileService);
    spyOn(profileService, 'getCurrentProfile').and.callThrough();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRespiteProviderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    cityCanProvideRespiteInControl = component.updateProviderInfoForm.get('cityCanProvideRespiteIn') as AbstractControl;
    respiteTravelDistanceControl = component.updateProviderInfoForm.get('respiteTravelDistance') as AbstractControl;
    careForMinAgeControl = component.updateProviderInfoForm.get('careForMinAge') as AbstractControl;
    careForMaxAgeControl = component.updateProviderInfoForm.get('careForMaxAge') as AbstractControl;
    maxNumCareForControl = component.updateProviderInfoForm.get('maxNumCareFor') as AbstractControl;

    submitButton = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get profile on load', () => {
    expect(profileService.getCurrentProfile).toHaveBeenCalled();
  });
  it('should be valid with only some fields', () => {
    expect(component.updateProviderInfoForm.invalid).toBeFalse();
    careForMinAgeControl.setValue(3);
    maxNumCareForControl.setValue(3);
    expect(component.updateProviderInfoForm.invalid).toBeFalse();
  });
  it('should be valid with all fields', () => {
    cityCanProvideRespiteInControl.setValue(999);
    respiteTravelDistanceControl.setValue(999);
    careForMinAgeControl.setValue(999);
    careForMaxAgeControl.setValue(999);
    maxNumCareForControl.setValue(999);
    expect(component.updateProviderInfoForm.invalid).toBeFalse();
  });
  it('should disable button, call backend, and navigate on success', async () => {
    spyOn(profileService, 'updateRespiteProviderInfo').and.callThrough();
    spyOn(router, 'navigate');
    submitButton.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(profileService.updateRespiteProviderInfo).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(submitButton.getAttribute('disabled')).toEqual('');
  });
  it('should enable button and not navigate on error', async () => {
    spyOn(profileService, 'updateRespiteProviderInfo').and.returnValue(throwError(''));
    spyOn(router, 'navigate');
    submitButton.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(submitButton.getAttribute('disabled')).toEqual(null);
  });
});

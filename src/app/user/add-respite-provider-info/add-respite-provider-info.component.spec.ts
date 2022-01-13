import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRespiteProviderInfoComponent } from './add-respite-provider-info.component';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ProfileMockService } from '../../services/profile-service/profile.mock.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { throwError } from 'rxjs';

describe('AddRespiteProviderInfoComponent', () => {
  let component: AddRespiteProviderInfoComponent;
  let fixture: ComponentFixture<AddRespiteProviderInfoComponent>;

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
      declarations: [AddRespiteProviderInfoComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: ProfileService, useValue: profileService }],
    }).compileComponents();
    profileService = TestBed.inject(ProfileService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRespiteProviderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    cityCanProvideRespiteInControl = component.addRespiteProviderInfoForm.get(
      'cityCanProvideRespiteIn'
    ) as AbstractControl;
    respiteTravelDistanceControl = component.addRespiteProviderInfoForm.get('respiteTravelDistance') as AbstractControl;
    careForMinAgeControl = component.addRespiteProviderInfoForm.get('careForMinAge') as AbstractControl;
    careForMaxAgeControl = component.addRespiteProviderInfoForm.get('careForMaxAge') as AbstractControl;
    maxNumCareForControl = component.addRespiteProviderInfoForm.get('maxNumCareFor') as AbstractControl;

    submitButton = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid if missing fields', () => {
    expect(component.addRespiteProviderInfoForm.invalid).toBeTrue();
    respiteTravelDistanceControl.setValue(1);
    expect(component.addRespiteProviderInfoForm.invalid).toBeTrue();
    careForMinAgeControl.setValue(1);
    careForMaxAgeControl.setValue(1);
    expect(component.addRespiteProviderInfoForm.invalid).toBeTrue();
  });
  it('should be valid with required fields', () => {
    cityCanProvideRespiteInControl.setValue('boulder');
    respiteTravelDistanceControl.setValue(2);
    careForMinAgeControl.setValue(2);
    careForMaxAgeControl.setValue(2);
    maxNumCareForControl.setValue(2);
    expect(component.addRespiteProviderInfoForm.invalid).toBeFalse();
  });
  it('should disable submit button, call backend, and navigate on submit', async () => {
    spyOn(profileService, 'addRespiteProviderInfo').and.callThrough();
    spyOn(router, 'navigate');
    cityCanProvideRespiteInControl.setValue('boulder');
    respiteTravelDistanceControl.setValue(2);
    careForMinAgeControl.setValue(2);
    careForMaxAgeControl.setValue(2);
    maxNumCareForControl.setValue(2);
    submitButton.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(profileService.addRespiteProviderInfo).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(submitButton.getAttribute('disabled')).toEqual('');
  });
  it('should enable submit button and not navigate on error', async () => {
    spyOn(profileService, 'addRespiteProviderInfo').and.returnValue(throwError(''));
    spyOn(router, 'navigate');
    cityCanProvideRespiteInControl.setValue('boulder');
    respiteTravelDistanceControl.setValue(2);
    careForMinAgeControl.setValue(2);
    careForMaxAgeControl.setValue(2);
    maxNumCareForControl.setValue(2);
    submitButton.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(submitButton.getAttribute('disabled')).toEqual(null);
  });
});

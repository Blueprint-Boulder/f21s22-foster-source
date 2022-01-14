import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRespiteBackgroundComponent } from './update-respite-background.component';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ProfileMockService } from '../../services/profile-service/profile.mock.service';
import { Router } from '@angular/router';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';

describe('UpdateRespiteBackgroundComponent', () => {
  let component: UpdateRespiteBackgroundComponent;
  let fixture: ComponentFixture<UpdateRespiteBackgroundComponent>;

  let profileService: ProfileService = new ProfileMockService();
  let router: Router;

  let fosterYearsExperienceControl: AbstractControl;
  let totalChildrenCaredForControl: AbstractControl;
  let lookingForRespiteControl: AbstractControl;

  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRespiteBackgroundComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: ProfileService, useValue: profileService }],
    }).compileComponents();
    profileService = TestBed.inject(ProfileService);
    spyOn(profileService, 'getCurrentProfile').and.callThrough();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRespiteBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fosterYearsExperienceControl = component.updateRespiteBackgroundForm.get(
      'fosterYearsExperience'
    ) as AbstractControl;
    totalChildrenCaredForControl = component.updateRespiteBackgroundForm.get(
      'totalChildrenCaredFor'
    ) as AbstractControl;
    lookingForRespiteControl = component.updateRespiteBackgroundForm.get('lookingForRespite') as AbstractControl;

    submitButton = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch profile on load', () => {
    expect(profileService.getCurrentProfile).toHaveBeenCalled();
  });
  it('should be valid with just some fields', () => {
    expect(component.updateRespiteBackgroundForm.invalid).toBeFalse();
    fosterYearsExperienceControl.setValue(3);
    totalChildrenCaredForControl.setValue(3);
    expect(component.updateRespiteBackgroundForm.invalid).toBeFalse();
  });
  it('should be valid with all fields', () => {
    fosterYearsExperienceControl.setValue(3);
    totalChildrenCaredForControl.setValue(3);
    lookingForRespiteControl.setValue(true);
  });
  it('should disable button, call backend, navigate on submit', async () => {
    spyOn(profileService, 'updateRespiteBackground').and.callThrough();
    spyOn(router, 'navigate');
    submitButton.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(profileService.updateRespiteBackground).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(submitButton.getAttribute('disabled')).toEqual('');
  });
  it('should enable button, not navigate on error', async () => {
    spyOn(profileService, 'updateRespiteBackground').and.returnValue(throwError(''));
    spyOn(router, 'navigate');
    submitButton.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(submitButton.getAttribute('disabled')).toEqual(null);
  });
});

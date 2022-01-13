import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileComponent } from './update-profile.component';
import { ProfileService } from "../../services/profile-service/profile.service";
import { ProfileMockService } from "../../services/profile-service/profile.mock.service";
import { Router } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AbstractControl, ReactiveFormsModule } from "@angular/forms";
import { throwError } from "rxjs";

describe('UpdateProfileComponent', () => {
  let component: UpdateProfileComponent;
  let fixture: ComponentFixture<UpdateProfileComponent>;

  let profileService: ProfileService = new ProfileMockService();
  let router: Router;

  let preferredNameControl: AbstractControl;
  let biographyControl: AbstractControl;
  let genderControl: AbstractControl;
  let pronounsControl: AbstractControl;
  let maritalStatusControl: AbstractControl;

  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfileComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [{provide: ProfileService, useValue: profileService}]
    })
    .compileComponents();
    profileService = TestBed.inject(ProfileService);
    spyOn(profileService, 'getCurrentProfile').and.callThrough();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    preferredNameControl = component.updateProfileForm.get('preferredName') as AbstractControl;
    biographyControl = component.updateProfileForm.get('biography') as AbstractControl;
    genderControl = component.updateProfileForm.get('gender') as AbstractControl;
    pronounsControl = component.updateProfileForm.get('pronouns') as AbstractControl;
    maritalStatusControl = component.updateProfileForm.get('maritalStatus') as AbstractControl;

    submitButton = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch current profile information on page load', () => {
    expect(profileService.getCurrentProfile).toHaveBeenCalled();
  });
  it('should be valid if just some fields are entered', () => {
    preferredNameControl.setValue('Test name');
    expect(component.updateProfileForm.invalid).toBeFalse();
    preferredNameControl.setValue(null);
    biographyControl.setValue('test bio');
    expect(component.updateProfileForm.invalid).toBeFalse();
    biographyControl.setValue(null);
    genderControl.setValue('Male')
    expect(component.updateProfileForm.invalid).toBeFalse();
    genderControl.setValue(null);
    pronounsControl.setValue('test/tester');
    expect(component.updateProfileForm.invalid).toBeFalse();
    pronounsControl.setValue(null);
    maritalStatusControl.setValue('Married');
    expect(component.updateProfileForm.invalid).toBeFalse();
    Object.keys(component.updateProfileForm.controls).forEach((control) => {
      console.log(control, component.updateProfileForm.get(control)?.errors);
    })
  });
  it('should be valid if all fields are entered', () => {
    preferredNameControl.setValue('Test name');
    biographyControl.setValue('test bio');
    genderControl.setValue('Male')
    pronounsControl.setValue('test/tester');
    maritalStatusControl.setValue('Married');
    expect(component.updateProfileForm.invalid).toBeFalse();
  });
  it('should make a call to the backend and navigate on success', () => {
    spyOn(profileService, 'updateProfile').and.callThrough();
    spyOn(router, 'navigate');
    pronounsControl.setValue('test/tester');
    maritalStatusControl.setValue('Married');
    submitButton.click();
    expect(profileService.updateProfile).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should not navigate on fail', () => {
    spyOn(profileService, 'updateProfile').and.returnValue(throwError(''));
    spyOn(router, 'navigate');
    biographyControl.setValue('test/tester');
    pronounsControl.setValue('Married');
    submitButton.click();
    expect(router.navigate).toHaveBeenCalledTimes(0);
  });
  it('submit button should be disabled on submit', async() => {
    pronounsControl.setValue('test/tester');
    maritalStatusControl.setValue('Married');
    submitButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(submitButton.getAttribute('disabled')).toEqual('');
    })
  });
  it('submit button should be enabled on failure', async() => {
    spyOn(profileService, 'updateProfile').and.returnValue(throwError(''));
    biographyControl.setValue('test/tester');
    pronounsControl.setValue('Married');
    submitButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(submitButton.getAttribute('disabled')).toEqual(null);
    })
  });

});

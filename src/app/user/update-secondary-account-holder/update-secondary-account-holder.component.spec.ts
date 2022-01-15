import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSecondaryAccountHolderComponent } from './update-secondary-account-holder.component';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ProfileMockService } from '../../services/profile-service/profile.mock.service';
import { Router } from '@angular/router';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';

describe('UpdateSecondaryAccountHolderComponent', () => {
  let component: UpdateSecondaryAccountHolderComponent;
  let fixture: ComponentFixture<UpdateSecondaryAccountHolderComponent>;

  let profileService: ProfileService = new ProfileMockService();
  let router: Router;

  let relationshipToPrimaryControl: AbstractControl;
  let firstNameControl: AbstractControl;
  let lastNameControl: AbstractControl;
  let emailControl: AbstractControl;
  let preferredNameControl: AbstractControl;
  let pronounsControl: AbstractControl;
  let genderControl: AbstractControl;
  let maritalStatusControl: AbstractControl;
  let secAccountHolderPhoneControl: AbstractControl;
  let secAccountHolderPhoneTypeControl: AbstractControl;

  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSecondaryAccountHolderComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: ProfileService, useValue: profileService }],
    }).compileComponents();

    profileService = TestBed.inject(ProfileService);
    spyOn(profileService, 'getCurrentProfile').and.callThrough();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSecondaryAccountHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    relationshipToPrimaryControl = component.updateSecAccountHolderForm.get('relationshipToPrimary') as AbstractControl;
    firstNameControl = component.updateSecAccountHolderForm.get('firstName') as AbstractControl;
    lastNameControl = component.updateSecAccountHolderForm.get('lastName') as AbstractControl;
    emailControl = component.updateSecAccountHolderForm.get('email') as AbstractControl;
    preferredNameControl = component.updateSecAccountHolderForm.get('preferredName') as AbstractControl;
    pronounsControl = component.updateSecAccountHolderForm.get('pronouns') as AbstractControl;
    genderControl = component.updateSecAccountHolderForm.get('gender') as AbstractControl;
    maritalStatusControl = component.updateSecAccountHolderForm.get('maritalStatus') as AbstractControl;
    secAccountHolderPhoneControl = component.updateSecAccountHolderForm.get('secAccountHolderPhone') as AbstractControl;
    secAccountHolderPhoneTypeControl = component.updateSecAccountHolderForm.get(
      'secAccountHolderPhoneType'
    ) as AbstractControl;

    submitButton = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch profile on load', () => {
    expect(profileService.getCurrentProfile).toHaveBeenCalled();
  });
  it('should be valid with just some entries', () => {
    relationshipToPrimaryControl.setValue('Husband');
    expect(component.updateSecAccountHolderForm.invalid).toBeFalse();
    relationshipToPrimaryControl.setValue(null);
    firstNameControl.setValue('test');
    expect(component.updateSecAccountHolderForm.invalid).toBeFalse();
    firstNameControl.setValue(null);
    lastNameControl.setValue('test');
    expect(component.updateSecAccountHolderForm.invalid).toBeFalse();
    lastNameControl.setValue(null);
    emailControl.setValue('test@gmail.com');
    expect(component.updateSecAccountHolderForm.invalid).toBeFalse();
    emailControl.setValue(null);
    preferredNameControl.setValue('Test');
    expect(component.updateSecAccountHolderForm.invalid).toBeFalse();
    preferredNameControl.setValue(null);
    pronounsControl.setValue('he/him');
    expect(component.updateSecAccountHolderForm.invalid).toBeFalse();
    pronounsControl.setValue(null);
    genderControl.setValue('Other');
    expect(component.updateSecAccountHolderForm.invalid).toBeFalse();
    genderControl.setValue(null);
    maritalStatusControl.setValue('Married');
    expect(component.updateSecAccountHolderForm.invalid).toBeFalse();
    maritalStatusControl.setValue(null);
    secAccountHolderPhoneControl.setValue('+17208499932');
    secAccountHolderPhoneTypeControl.setValue('MOBILE');
    expect(component.updateSecAccountHolderForm.invalid).toBeFalse();
  });
  it('should be invalid if bad email', () => {
    emailControl.setValue('test');
    expect(component.updateSecAccountHolderForm.invalid).toBeTrue();
  });
  it('should be invalid if phone with no type', () => {
    secAccountHolderPhoneControl.setValue('+17208499932');
    expect(component.updateSecAccountHolderForm.invalid).toBeTrue();
  });
  it('should be invalid if bad phone', () => {
    secAccountHolderPhoneControl.setValue('+1');
    expect(component.updateSecAccountHolderForm.invalid).toBeTrue();
    secAccountHolderPhoneTypeControl.setValue('MOBILE');
    expect(component.updateSecAccountHolderForm.invalid).toBeTrue();
  });
  it('should be valid with all fields', () => {
    relationshipToPrimaryControl.setValue('test');
    firstNameControl.setValue('test');
    lastNameControl.setValue('test');
    emailControl.setValue('test@test.com');
    preferredNameControl.setValue('test');
    pronounsControl.setValue('test');
    genderControl.setValue('test');
    maritalStatusControl.setValue('test');
    secAccountHolderPhoneControl.setValue('3033467765');
    secAccountHolderPhoneTypeControl.setValue('HOME');
    expect(component.updateSecAccountHolderForm.invalid).toBeFalse();
  });
  it('should call backend, disable submit button, and navigate on submit', async () => {
    spyOn(profileService, 'updateSecondaryAccountHolder').and.callThrough();
    spyOn(router, 'navigate');
    submitButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(profileService.updateSecondaryAccountHolder).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalled();
      expect(submitButton.getAttribute('disabled')).toEqual('');
    });
  });
  it('should not navigate and enable submit button on error', async () => {
    spyOn(profileService, 'updateSecondaryAccountHolder').and.returnValue(throwError(''));
    spyOn(router, 'navigate');
    submitButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(submitButton.getAttribute('disabled')).toEqual(null);
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSecondaryAccountHolderComponent } from './create-secondary-account-holder.component';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ProfileMockService } from '../../services/profile-service/profile.mock.service';
import { Router } from '@angular/router';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';

describe('CreateSecondaryAccountHolderComponent', () => {
  let component: CreateSecondaryAccountHolderComponent;
  let fixture: ComponentFixture<CreateSecondaryAccountHolderComponent>;

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
      declarations: [CreateSecondaryAccountHolderComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: ProfileService, useValue: profileService }],
    }).compileComponents();
    profileService = TestBed.inject(ProfileService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSecondaryAccountHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    relationshipToPrimaryControl = component.createSecAccountHolderForm.get('relationshipToPrimary') as AbstractControl;
    firstNameControl = component.createSecAccountHolderForm.get('firstName') as AbstractControl;
    lastNameControl = component.createSecAccountHolderForm.get('lastName') as AbstractControl;
    emailControl = component.createSecAccountHolderForm.get('email') as AbstractControl;
    preferredNameControl = component.createSecAccountHolderForm.get('preferredName') as AbstractControl;
    pronounsControl = component.createSecAccountHolderForm.get('pronouns') as AbstractControl;
    genderControl = component.createSecAccountHolderForm.get('gender') as AbstractControl;
    maritalStatusControl = component.createSecAccountHolderForm.get('maritalStatus') as AbstractControl;
    secAccountHolderPhoneControl = component.createSecAccountHolderForm.get('secAccountHolderPhone') as AbstractControl;
    secAccountHolderPhoneTypeControl = component.createSecAccountHolderForm.get(
      'secAccountHolderPhoneType'
    ) as AbstractControl;

    submitButton = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid without all required fields', () => {
    expect(component.createSecAccountHolderForm.invalid).toBeTrue();
    firstNameControl.setValue('Test');
    lastNameControl.setValue('Test');
    expect(component.createSecAccountHolderForm.invalid).toBeTrue();
  });
  it('should be valid with required fields', () => {
    relationshipToPrimaryControl.setValue('Married');
    firstNameControl.setValue('Joe');
    lastNameControl.setValue('Biden');
    emailControl.setValue('joe@whitehouse.gov');
    preferredNameControl.setValue('Jack');
    genderControl.setValue('Male');
    secAccountHolderPhoneControl.setValue('(720) 849-9937');
    secAccountHolderPhoneTypeControl.setValue('Work');
    expect(component.createSecAccountHolderForm.invalid).toBeFalse();
  });
  it('should be valid with optional fields', () => {
    relationshipToPrimaryControl.setValue('Married');
    firstNameControl.setValue('Joe');
    lastNameControl.setValue('Biden');
    emailControl.setValue('joe@whitehouse.gov');
    preferredNameControl.setValue('Jack');
    genderControl.setValue('Male');
    secAccountHolderPhoneControl.setValue('(720) 849-9937');
    secAccountHolderPhoneTypeControl.setValue('Work');
    pronounsControl.setValue('Test');
    maritalStatusControl.setValue('Test');
    expect(component.createSecAccountHolderForm.invalid).toBeFalse();
  });
  it('should require properly formatted email', () => {
    emailControl.setValue('joe@whitehouse.gov');
    expect(emailControl.invalid).toBeFalse();
    emailControl.setValue('joewhitehouse');
    expect(emailControl.invalid).toBeTrue();
    emailControl.setValue('123test');
    expect(emailControl.invalid).toBeTrue();
  });
  it('should require real phone number', () => {
    secAccountHolderPhoneControl.setValue('(720) 832 9221');
    expect(secAccountHolderPhoneControl.invalid).toBeFalse();
    secAccountHolderPhoneControl.setValue('+13033355526');
    expect(secAccountHolderPhoneControl.invalid).toBeFalse();
    secAccountHolderPhoneControl.setValue('joe@whitehouse');
    expect(secAccountHolderPhoneControl.invalid).toBeTrue();
    secAccountHolderPhoneControl.setValue('123test');
    expect(secAccountHolderPhoneControl.invalid).toBeTrue();
  });
  it('should disable button, call backend, navigate on submit', async () => {
    spyOn(profileService, 'addSecondaryAccountHolder').and.callThrough();
    spyOn(router, 'navigate');
    relationshipToPrimaryControl.setValue('Married');
    firstNameControl.setValue('Joe');
    lastNameControl.setValue('Biden');
    emailControl.setValue('joe@whitehouse.gov');
    preferredNameControl.setValue('Jack');
    genderControl.setValue('Male');
    secAccountHolderPhoneControl.setValue('(720) 849-9937');
    secAccountHolderPhoneTypeControl.setValue('Work');
    submitButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(profileService.addSecondaryAccountHolder).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(submitButton.getAttribute('disabled')).toEqual('');
  });
  it('should enable button, not navigate on error', async () => {
    spyOn(profileService, 'addSecondaryAccountHolder').and.returnValue(throwError(''));
    spyOn(router, 'navigate');
    relationshipToPrimaryControl.setValue('Married');
    firstNameControl.setValue('Joe');
    lastNameControl.setValue('Biden');
    emailControl.setValue('joe@whitehouse.gov');
    preferredNameControl.setValue('Jack');
    genderControl.setValue('Male');
    secAccountHolderPhoneControl.setValue('(720) 849-9937');
    secAccountHolderPhoneTypeControl.setValue('Work');
    submitButton.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(submitButton.getAttribute('disabled')).toEqual(null);
  });
});

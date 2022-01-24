import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishAccountModalComponent } from './finish-account-modal.component';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from '../../services/account-service/account.service';
import { AccountMockService } from '../../services/account-service/account.mock.service';
import { accounts } from '../../mock/database-entities';

describe('FinishAccountModalComponent', () => {
  let component: FinishAccountModalComponent;
  let fixture: ComponentFixture<FinishAccountModalComponent>;

  let accountService: AccountService = new AccountMockService();

  let preferredNameControl: AbstractControl;
  let genderControl: AbstractControl;
  let pronounsControl: AbstractControl;
  let maritalStatusControl: AbstractControl;
  let secFirstNameControl: AbstractControl;
  let secLastNameControl: AbstractControl;
  let secEmailControl: AbstractControl;
  let secPhoneControl: AbstractControl;
  let secPhoneTypeControl: AbstractControl;
  let secPreferredNameControl: AbstractControl;
  let secPronounsControl: AbstractControl;
  let secGenderControl: AbstractControl;
  let secMaritalStatusControl: AbstractControl;
  let secRelationshipToPrimaryControl: AbstractControl;
  let fosterYearsControl: AbstractControl;
  let totalChildrenControl: AbstractControl;
  let canProvideControl: AbstractControl;
  let lookingForRespiteControl: AbstractControl;
  let hasProvidedInPastControl: AbstractControl;
  let respiteCityControl: AbstractControl;
  let respiteRangeControl: AbstractControl;
  let minAgeControl: AbstractControl;
  let maxAgeControl: AbstractControl;
  let howManyControl: AbstractControl;
  let parentalUnitSizeControl: AbstractControl;
  let householdSizeControl: AbstractControl;
  let numChildrenControl: AbstractControl;
  let childrenInfoControl: AbstractControl;
  let petInfoControl: AbstractControl;
  let vehicleAccessControl: AbstractControl;
  let caredForLgbtControl: AbstractControl;
  let caredForPhysControl: AbstractControl;
  let cardForIntelControl: AbstractControl;
  let caredForMedControl: AbstractControl;
  let ownsFirearmControl: AbstractControl;
  let additionalInfoControl: AbstractControl;
  let dobControl: AbstractControl;
  let biographyControl: AbstractControl;

  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinishAccountModalComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: AccountService, useValue: accountService }],
    }).compileComponents();
    accountService = TestBed.inject(AccountService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.account = accounts[0];

    preferredNameControl = component.finishProfileForm.get('preferredName') as AbstractControl;
    genderControl = component.finishProfileForm.get('gender') as AbstractControl;
    pronounsControl = component.finishProfileForm.get('pronouns') as AbstractControl;
    maritalStatusControl = component.finishProfileForm.get('maritalStatus') as AbstractControl;
    secFirstNameControl = component.finishProfileForm.get('secfname') as AbstractControl;
    secLastNameControl = component.finishProfileForm.get('seclname') as AbstractControl;
    secEmailControl = component.finishProfileForm.get('secEmail') as AbstractControl;
    secPhoneControl = component.finishProfileForm.get('secPhone') as AbstractControl;
    secPhoneTypeControl = component.finishProfileForm.get('secPhoneType') as AbstractControl;
    secPreferredNameControl = component.finishProfileForm.get('secPreferredName') as AbstractControl;
    secPronounsControl = component.finishProfileForm.get('secPronouns') as AbstractControl;
    secGenderControl = component.finishProfileForm.get('secGender') as AbstractControl;
    secMaritalStatusControl = component.finishProfileForm.get('secMaritalStatus') as AbstractControl;
    secRelationshipToPrimaryControl = component.finishProfileForm.get('relationshipToPrimary') as AbstractControl;
    fosterYearsControl = component.finishProfileForm.get('fosterYears') as AbstractControl;
    totalChildrenControl = component.finishProfileForm.get('totalChildren') as AbstractControl;
    canProvideControl = component.finishProfileForm.get('canProvideRespite') as AbstractControl;
    lookingForRespiteControl = component.finishProfileForm.get('lookingForRespite') as AbstractControl;
    hasProvidedInPastControl = component.finishProfileForm.get('hasProvidedInPast') as AbstractControl;
    respiteCityControl = component.finishProfileForm.get('respiteCity') as AbstractControl;
    respiteRangeControl = component.finishProfileForm.get('respiteRange') as AbstractControl;
    minAgeControl = component.finishProfileForm.get('minAge') as AbstractControl;
    maxAgeControl = component.finishProfileForm.get('maxAge') as AbstractControl;
    howManyControl = component.finishProfileForm.get('howManyCareFor') as AbstractControl;
    parentalUnitSizeControl = component.finishProfileForm.get('parentalUnitSize') as AbstractControl;
    householdSizeControl = component.finishProfileForm.get('householdSize') as AbstractControl;
    numChildrenControl = component.finishProfileForm.get('numChildren') as AbstractControl;
    childrenInfoControl = component.finishProfileForm.get('childrenInfo') as AbstractControl;
    petInfoControl = component.finishProfileForm.get('petInfo') as AbstractControl;
    vehicleAccessControl = component.finishProfileForm.get('vehicleAccess') as AbstractControl;
    caredForLgbtControl = component.finishProfileForm.get('caredForLGBT') as AbstractControl;
    caredForPhysControl = component.finishProfileForm.get('caredForPhysicallyDisabled') as AbstractControl;
    cardForIntelControl = component.finishProfileForm.get('caredForIntellectuallyDisabled') as AbstractControl;
    caredForMedControl = component.finishProfileForm.get('careForMedicallyFragile') as AbstractControl;
    ownsFirearmControl = component.finishProfileForm.get('ownsFirearm') as AbstractControl;
    additionalInfoControl = component.finishProfileForm.get('additionalInfo') as AbstractControl;
    dobControl = component.finishProfileForm.get('dob') as AbstractControl;
    biographyControl = component.finishProfileForm.get('biography') as AbstractControl;

    submitButton = fixture.debugElement.nativeElement.querySelector('.submit-button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should allow you to submit with just required fields', () => {
    preferredNameControl.setValue('test');
    genderControl.setValue('Male');
    dobControl.setValue('10/31/2000');
    component.profileImgKey = 'TEST_KEY';
    fosterYearsControl.setValue(3);
    totalChildrenControl.setValue(4);
    canProvideControl.setValue('false');
    lookingForRespiteControl.setValue('true');
    hasProvidedInPastControl.setValue('true');
    parentalUnitSizeControl.setValue(3);
    householdSizeControl.setValue(3);
    numChildrenControl.setValue(3);
    childrenInfoControl.setValue('male 12 bio');
    biographyControl.setValue('Test biog');
    expect(component.finishProfileForm.invalid).toBeFalse();
  });
  it('should require image uuid for successful submit', () => {
    spyOn(accountService, 'completeProfile').and.callThrough();
    preferredNameControl.setValue('test');
    genderControl.setValue('Male');
    dobControl.setValue('10/31/2000');
    component.profileImgKey = ''; // Should be invalid since this is default and emitted on error
    fosterYearsControl.setValue(3);
    totalChildrenControl.setValue(4);
    canProvideControl.setValue('false');
    lookingForRespiteControl.setValue('true');
    hasProvidedInPastControl.setValue('true');
    parentalUnitSizeControl.setValue(3);
    householdSizeControl.setValue(3);
    numChildrenControl.setValue(3);
    childrenInfoControl.setValue('male 12 bio');
    biographyControl.setValue('Test biog');

    expect(accountService.completeProfile).toHaveBeenCalledTimes(0);
  });
  it('clicking yes add secondary should show secondary form, should require info', async () => {
    preferredNameControl.setValue('test');
    genderControl.setValue('Male');
    dobControl.setValue('10/31/2000');
    component.profileImgKey = 'TEST_KEY';
    fosterYearsControl.setValue(3);
    totalChildrenControl.setValue(4);
    canProvideControl.setValue('false');
    lookingForRespiteControl.setValue('true');
    hasProvidedInPastControl.setValue('true');
    parentalUnitSizeControl.setValue(3);
    householdSizeControl.setValue(3);
    numChildrenControl.setValue(3);
    childrenInfoControl.setValue('male 12 bio');
    biographyControl.setValue('Test biog');
    // @ts-ignore
    component.secChange({ target: { value: 'true' } });
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.optional-secondary-account-holder-row')).toBeTruthy();
    });
    expect(component.finishProfileForm.invalid).toBeTrue();
  });
  it('clicking no add secondary should not show secondary form, should not require info', () => {
    preferredNameControl.setValue('test');
    genderControl.setValue('Male');
    dobControl.setValue('10/31/2000');
    component.profileImgKey = 'TEST_KEY';
    fosterYearsControl.setValue(3);
    totalChildrenControl.setValue(4);
    canProvideControl.setValue('false');
    lookingForRespiteControl.setValue('true');
    hasProvidedInPastControl.setValue('true');
    parentalUnitSizeControl.setValue(3);
    householdSizeControl.setValue(3);
    numChildrenControl.setValue(3);
    childrenInfoControl.setValue('male 12 bio');
    biographyControl.setValue('Test biog');
    // @ts-ignore
    component.secChange({ target: { value: 'false' } });
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.optional-secondary-account-holder-row')).toBeFalsy();
    });
    expect(component.finishProfileForm.invalid).toBeFalse();
  });
  it('clicking yes provide respite should show form, should require info', () => {
    preferredNameControl.setValue('test');
    genderControl.setValue('Male');
    dobControl.setValue('10/31/2000');
    component.profileImgKey = 'TEST_KEY';
    fosterYearsControl.setValue(3);
    totalChildrenControl.setValue(4);
    canProvideControl.setValue('false');
    lookingForRespiteControl.setValue('true');
    hasProvidedInPastControl.setValue('true');
    parentalUnitSizeControl.setValue(3);
    householdSizeControl.setValue(3);
    numChildrenControl.setValue(3);
    childrenInfoControl.setValue('male 12 bio');
    biographyControl.setValue('Test biog');
    // @ts-ignore
    component.respiteProvideChange({ target: { value: 'true' } });
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.can-provide-row')).toBeTruthy();
    });
    expect(component.finishProfileForm.invalid).toBeTrue();
  });
  it('clicking no provide respite should not show form, should not require info', () => {
    preferredNameControl.setValue('test');
    genderControl.setValue('Male');
    dobControl.setValue('10/31/2000');
    component.profileImgKey = 'TEST_KEY';
    fosterYearsControl.setValue(3);
    totalChildrenControl.setValue(4);
    canProvideControl.setValue('false');
    lookingForRespiteControl.setValue('true');
    hasProvidedInPastControl.setValue('true');
    parentalUnitSizeControl.setValue(3);
    householdSizeControl.setValue(3);
    numChildrenControl.setValue(3);
    childrenInfoControl.setValue('male 12 bio');
    biographyControl.setValue('Test biog');
    // @ts-ignore
    component.respiteProvideChange({ target: { value: 'false' } });
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.can-provide-row')).toBeFalsy();
    });
    expect(component.finishProfileForm.invalid).toBeFalse();
  });
});

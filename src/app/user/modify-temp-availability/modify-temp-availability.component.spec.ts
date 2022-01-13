import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTempAvailabilityComponent } from './modify-temp-availability.component';
import { AvailabilityService } from '../../services/availability-service/availability.service';
import { AvailabilityMockService } from '../../services/availability-service/availability.mock.service';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ProfileMockService } from '../../services/profile-service/profile.mock.service';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { profiles } from '../../mock/database-entities';
import { AvailabilityType } from '../../models/availability.model';
import { of } from 'rxjs';

describe('ModifyTempAvailabilityComponent', () => {
  let component: ModifyTempAvailabilityComponent;
  let fixture: ComponentFixture<ModifyTempAvailabilityComponent>;

  let availabilityService: AvailabilityService = new AvailabilityMockService();
  let profileService: ProfileService = new ProfileMockService();

  let deleteButton: HTMLButtonElement;

  let endControl: AbstractControl;
  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyTempAvailabilityComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: ProfileService, useValue: profileService },
        { provide: AvailabilityService, useValue: availabilityService },
      ],
    }).compileComponents();
    availabilityService = TestBed.inject(AvailabilityService);
    profileService = TestBed.inject(ProfileService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyTempAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    deleteButton = fixture.debugElement.nativeElement.querySelector('.remove-button');
    submitButton = fixture.debugElement.nativeElement.querySelector('.add-button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the availability and remove button if profile has temp availability', async () => {
    spyOn(profileService, 'getCurrentProfile').and.returnValue(
      of({
        ...profiles[0],
        respiteBackground: {
          id: 1,
          fosterYearsExperience: 1,
          totalChildrenCaredFor: 10,
          canProvideRespite: true,
          lookingForRespite: true,
          respiteProviderInfo: {
            id: 1,
            cityCanProvideRespiteIn: 'boulder',
            respiteTravelDistance: 100,
            careForMinAge: 0,
            careForMaxAge: 10,
            maxNumCareFor: 3,
            availabilities: [
              {
                id: 1,
                type: AvailabilityType.PRIMARY,
                monday: [true, false, false, false],
                tuesday: [false, true, true, true],
                wednesday: [true, false, false, false],
                thursday: [false, true, true, true],
                friday: [true, false, false, false],
                saturday: [false, true, true, true],
                sunday: [true, false, false, false],
              },
            ],
          },
        },
      })
    );
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.debugElement.nativeElement.querySelector('.avail-grid-row')).toBeTruthy();
    expect(deleteButton).toBeTruthy();
    expect(deleteButton.getAttribute('disabled')).toEqual(null);
  });
  it('should display the availability inputs, end input, and add button if no temp avail', async () => {
    component.temporaryAvail = undefined;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.debugElement.nativeElement.querySelector('.avail-grid-row')).toBeFalsy();
    expect(fixture.debugElement.nativeElement.querySelector('.add-button')).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('.add-button').getAttribute('disabled')).toEqual(null);
    expect(fixture.debugElement.nativeElement.querySelector('.avail-input-row')).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('.end-row')).toBeTruthy();
  });
  describe('deleting the temporary availability', async () => {
    beforeEach(async () => {
      component.temporaryAvail = {
        type: AvailabilityType.TEMPORARY,
        monday: [true, false, false, false],
        tuesday: [false, true, true, true],
        wednesday: [true, false, false, false],
        thursday: [false, true, true, true],
        friday: [true, false, true, true],
        saturday: [false, true, true, true],
        sunday: [false, false, false, false],
        start: new Date(),
        end: new Date(),
      };
      fixture.detectChanges();
      await fixture.whenStable();
      deleteButton = fixture.debugElement.nativeElement.querySelector('button.remove-button');
    });
    it('should call backend, clear temp avail when remove button clicked', async () => {
      spyOn(availabilityService, 'removeTemporaryAvailability').and.callThrough();
      spyOn(component, 'deleteTempAvailability').and.callThrough();
      spyOn(window, 'confirm').and.returnValue(true);
      deleteButton.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.deleteTempAvailability).toHaveBeenCalled();
      expect(availabilityService.removeTemporaryAvailability).toHaveBeenCalled();
      expect(component.temporaryAvail).toBeUndefined();
      expect(fixture.debugElement.nativeElement.querySelector('.avail-input-row')).toBeTruthy();
    });
  });
  describe('adding the temporary availability', () => {
    beforeEach(async () => {
      component.temporaryAvail = undefined;
      fixture.detectChanges();
      await fixture.whenStable();
      submitButton = fixture.debugElement.nativeElement.querySelector('button.add-button');
    });
    it('should not let you submit without end date', async () => {
      spyOn(component.addTempAvailForm, 'markAllAsTouched');
      submitButton.click();
      expect(component.addTempAvailForm.invalid).toBeTrue();
      expect(component.addTempAvailForm.markAllAsTouched).toHaveBeenCalled();
    });
    it('should call backend, clear form, and show temp avail again on submit', async () => {
      component.addTempAvailForm.get('end')?.setValue('10/31/2022');
      expect(component.addTempAvailForm.invalid).toBeFalse();
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(availabilityService, 'addTemporaryAvailability').and.callThrough();
      submitButton.click();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(availabilityService.addTemporaryAvailability).toHaveBeenCalled();
      expect(component.addTempAvailForm.get('end')!.value).toEqual(null);
      component.dayModels.forEach((dm) => {
        expect(dm.morning).toBeFalse();
        expect(dm.afternoon).toBeFalse();
        expect(dm.evening).toBeFalse();
        expect(dm.overnight).toBeFalse();
      });
      expect(fixture.debugElement.nativeElement.querySelector('.avail-grid-row')).toBeTruthy();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrimaryAvailabilityComponent } from './update-primary-availability.component';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ProfileMockService } from '../../services/profile-service/profile.mock.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { profiles } from '../../mock/database-entities';
import { DayModel } from '../../common-components/day-availability-input/day-availability-input.component';
import { of, throwError } from 'rxjs';
import { AvailabilityType } from '../../models/availability.model';

describe('UpdatePrimaryAvailabilityComponent', () => {
  let component: UpdatePrimaryAvailabilityComponent;
  let fixture: ComponentFixture<UpdatePrimaryAvailabilityComponent>;

  let profileService: ProfileService = new ProfileMockService();
  let router: Router;

  let dayModels: DayModel[];
  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePrimaryAvailabilityComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: ProfileService, useValue: profileService }],
    }).compileComponents();
    profileService = TestBed.inject(ProfileService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePrimaryAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dayModels = component.dayModels;
    submitButton = fixture.debugElement.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch profile on load', async () => {
    spyOn(profileService, 'getCurrentProfile').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(profileService.getCurrentProfile).toHaveBeenCalled();
  });
  it('should set all day models to false if there are no primary availabilities', async () => {
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
            availabilities: [],
          },
        },
      })
    );
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();
    component.dayModels.forEach((dm) => {
      expect(dm.morning).toBeFalse();
      expect(dm.afternoon).toBeFalse();
      expect(dm.evening).toBeFalse();
      expect(dm.overnight).toBeFalse();
    });
  });
  it('should navigate if there is no provider info found', async () => {
    spyOn(profileService, 'getCurrentProfile').and.returnValue(
      of({
        ...profiles[0],
        respiteBackground: {
          id: 1,
          fosterYearsExperience: 1,
          totalChildrenCaredFor: 10,
          canProvideRespite: true,
          lookingForRespite: true,
        },
      })
    );
    spyOn(router, 'navigate');
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should set day models to those of the primary availability if there is one', async () => {
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
                monday: [true, true, true, true],
                tuesday: [true, true, true, true],
                wednesday: [true, true, true, true],
                thursday: [true, true, true, true],
                friday: [true, true, true, true],
                saturday: [true, true, true, true],
                sunday: [true, true, true, true],
              },
            ],
          },
        },
      })
    );
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();
    component.dayModels.forEach((dm) => {
      expect(dm.morning).toBeTrue();
      expect(dm.afternoon).toBeTrue();
      expect(dm.evening).toBeTrue();
      expect(dm.overnight).toBeTrue();
    });
  });
  it('should confirm that user wants to submit empty availability, cancel should cancel submit', async () => {
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
            availabilities: [],
          },
        },
      })
    );
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(router, 'navigate');
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();
    submitButton.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(window.confirm).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(submitButton.getAttribute('disabled')).toEqual(null);
  });
  it('should call backend, disable submit button, and navigate on success', async () => {
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
            availabilities: [],
          },
        },
      })
    );
    spyOn(profileService, 'updatePrimaryAvailability').and.callThrough();
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(router, 'navigate');
    component.ngOnInit();
    submitButton.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(window.confirm).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(submitButton.getAttribute('disabled')).toEqual('');
    expect(profileService.updatePrimaryAvailability).toHaveBeenCalled();
  });
  it('should enable submit button and not navigate on error', async () => {
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
            availabilities: [],
          },
        },
      })
    );
    spyOn(profileService, 'updatePrimaryAvailability').and.returnValue(throwError(''));
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(router, 'navigate');
    component.ngOnInit();
    submitButton.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(window.confirm).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(submitButton.getAttribute('disabled')).toEqual(null);
  });
});

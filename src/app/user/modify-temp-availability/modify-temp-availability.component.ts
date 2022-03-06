import { DayModel } from '../../common-components/day-availability-input/day-availability-input.component';
import { AvailabilityService } from '../../services/availability-service/availability.service';
import { AvailabilityType, SimpleAvailability } from '../../models/availability.model';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../common/utils/FormUtils';
import { Component, OnInit } from '@angular/core';
import { ProfileUtils } from '../../common/utils/ProfileUtils';

@Component({
  selector: 'app-modify-temp-availability',
  templateUrl: './modify-temp-availability.component.html',
  styleUrls: ['./modify-temp-availability.component.scss'],
})
export class ModifyTempAvailabilityComponent implements OnInit {
  public temporaryAvail: SimpleAvailability | undefined;
  public deletingAvail = false;

  public submittingAvail = false;
  public addTempAvailForm: FormGroup;
  public dayModels: DayModel[] = [
    {
      name: 'Monday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    },
    {
      name: 'Tuesday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    },
    {
      name: 'Wednesday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    },
    {
      name: 'Thursday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    },
    {
      name: 'Friday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    },
    {
      name: 'Saturday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    },
    {
      name: 'Sunday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    },
  ];

  constructor(
    private availService: AvailabilityService,
    private profileService: ProfileService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.addTempAvailForm = this.formBuilder.group({
      end: [null, Validators.compose([Validators.required, FormUtils.validateDate])],
    });
  }

  ngOnInit(): void {
    this.profileService.getCurrentProfile().subscribe((profile) => {
      if (profile.respiteBackground.respiteProviderInfo) {
        const avail = ProfileUtils.getAvailabilities(profile, this.availService);
        if (avail && avail.type === 'TEMPORARY') {
          this.temporaryAvail = avail;
        }
      }
    });
  }

  deleteTempAvailability(): void {
    const shouldDelete = confirm('Are you sure that you would like to remove your temporary availability?');

    if (!shouldDelete) {
      return;
    }

    this.deletingAvail = true;

    this.availService.removeTemporaryAvailability().subscribe(
      (_) => {
        this.temporaryAvail = undefined;
        this.toastService.success('Successfully removed your temporary availability.');
        this.deletingAvail = false;
      },
      (err) => {
        this.toastService.httpError(err);
        this.deletingAvail = false;
      }
    );
  }

  onSubmit(): void {
    if (this.addTempAvailForm.invalid) {
      this.addTempAvailForm.markAllAsTouched();
      return;
    } else if (!FormUtils.hasAvailability(this.dayModels)) {
      const shouldProceed = confirm(
        'You have indicated that you have no availability to provide respite. Is this correct?'
      );
      if (!shouldProceed) {
        return;
      }
    }
    this.submittingAvail = true;
    const req = FormUtils.generateRespiteAvailability(
      this.dayModels,
      AvailabilityType.TEMPORARY,
      new Date(),
      FormUtils.parseDateFromInput(this.addTempAvailForm.get('end')!.value)
    );
    this.availService.addTemporaryAvailability(req).subscribe(
      (profile) => {
        const avail = profile.respiteBackground.respiteProviderInfo?.availabilities.find(
          (avail) => avail.type === 'TEMPORARY'
        );
        if (avail) {
          this.temporaryAvail = avail;
        }
        this.toastService.success('Successfully added a temporary availability.');
        this.submittingAvail = false;
        this.resetForm();
      },
      (err) => {
        this.toastService.httpError(err);
        this.submittingAvail = false;
      }
    );
  }

  private resetForm(): void {
    this.addTempAvailForm.get('end')!.setValue(null);
    this.addTempAvailForm.get('end')!.markAsPristine();
    this.addTempAvailForm.get('end')!.markAsUntouched();
    this.addTempAvailForm.get('end')!.updateValueAndValidity();

    this.dayModels.forEach((dm) => {
      dm.morning = false;
      dm.afternoon = false;
      dm.evening = false;
      dm.overnight = false;
    });
  }
}

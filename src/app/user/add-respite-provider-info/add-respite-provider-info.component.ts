import { DayModel } from '../../common-components/day-availability-input/day-availability-input.component';
import { AvailabilityType } from '../../models/availability.model';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RespiteProviderInfoReq } from '../../models/profile.model';
import { ToastPresets } from '../../models/toast.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormUtils } from '../../common/utils/FormUtils';

@Component({
  selector: 'app-add-respite-provider-info',
  templateUrl: './add-respite-provider-info.component.html',
  styleUrls: ['./add-respite-provider-info.component.scss'],
})
export class AddRespiteProviderInfoComponent {
  public addRespiteProviderInfoForm: FormGroup;
  public submittingForm = false;

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
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.addRespiteProviderInfoForm = this.formBuilder.group({
      cityCanProvideRespiteIn: [null, Validators.required],
      respiteTravelDistance: [null, Validators.required],
      careForMinAge: [null, Validators.required],
      careForMaxAge: [null, Validators.required],
      maxNumCareFor: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addRespiteProviderInfoForm.invalid) {
      this.addRespiteProviderInfoForm.markAllAsTouched();
    } else {
      this.submittingForm = true;

      const req: RespiteProviderInfoReq = {
        cityCanProvideRespiteIn: this.addRespiteProviderInfoForm.get('cityCanProvideRespiteIn')!.value,
        respiteTravelDistance: this.addRespiteProviderInfoForm.get('respiteTravelDistance')!.value,
        careForMinAge: this.addRespiteProviderInfoForm.get('careForMinAge')!.value,
        careForMaxAge: this.addRespiteProviderInfoForm.get('careForMaxAge')!.value,
        maxNumCareFor: this.addRespiteProviderInfoForm.get('maxNumCareFor')!.value,
        availabilities: [FormUtils.generateRespiteAvailability(this.dayModels, AvailabilityType.PRIMARY)],
      };

      this.profileService.addRespiteProviderInfo(req).subscribe(
        (profile) => {
          this.toastService.show({
            body: 'Successfully added respite provider info.',
            preset: ToastPresets.SUCCESS,
          });
          this.router.navigate([`/user/${profile.id}`]);
        },
        (err) => {
          this.toastService.httpError(err);
          this.submittingForm = false;
        }
      );
    }
  }
}

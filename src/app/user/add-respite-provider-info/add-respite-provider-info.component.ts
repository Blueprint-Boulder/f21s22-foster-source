import { DayModel } from '../../common-components/day-availability-input/day-availability-input.component';
import { AvailabilityType, SimpleAvailability } from '../../models/availability.model';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RespiteProviderInfoReq } from '../../models/profile.model';
import { ToastPresets } from '../../models/toast.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
        availabilities: this.generateRespiteAvailability(),
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

  private generateRespiteAvailability(): [SimpleAvailability] {
    const m: DayModel = this.dayModels.find((dm) => dm.name === 'Monday') as DayModel;
    const t: DayModel = this.dayModels.find((dm) => dm.name === 'Tuesday') as DayModel;
    const w: DayModel = this.dayModels.find((dm) => dm.name === 'Wednesday') as DayModel;
    const th: DayModel = this.dayModels.find((dm) => dm.name === 'Thursday') as DayModel;
    const f: DayModel = this.dayModels.find((dm) => dm.name === 'Friday') as DayModel;
    const sa: DayModel = this.dayModels.find((dm) => dm.name === 'Saturday') as DayModel;
    const su: DayModel = this.dayModels.find((dm) => dm.name === 'Sunday') as DayModel;

    return [
      {
        type: AvailabilityType.PRIMARY,
        monday: [m.morning, m.afternoon, m.evening, m.overnight],
        tuesday: [t.morning, t.afternoon, t.evening, t.overnight],
        wednesday: [w.morning, w.afternoon, w.evening, w.overnight],
        thursday: [th.morning, th.afternoon, th.evening, th.overnight],
        friday: [f.morning, f.afternoon, f.evening, f.overnight],
        saturday: [sa.morning, sa.afternoon, sa.evening, sa.overnight],
        sunday: [su.morning, su.afternoon, su.evening, su.overnight],
      },
    ];
  }
}

import { ProfileService } from '../../services/profile-service/profile.service';
import { RespiteProviderInfoRes } from '../../models/get-profile-by-id.models';
import { ToastService } from '../../services/toast-service/toast.service';
import { UpdateRespiteProviderInfo } from '../../models/profile.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastPresets } from '../../models/toast.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-respite-provider-info',
  templateUrl: './update-respite-provider-info.component.html',
  styleUrls: ['./update-respite-provider-info.component.scss'],
})
export class UpdateRespiteProviderInfoComponent implements OnInit {
  public currentProviderInfo: RespiteProviderInfoRes;
  public updateProviderInfoForm: FormGroup;
  public submittingForm = false;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.updateProviderInfoForm = this.formBuilder.group({
      cityCanProvideRespiteIn: [null],
      respiteTravelDistance: [null],
      careForMinAge: [null],
      careForMaxAge: [null],
      maxNumCareFor: [null],
    });
  }

  ngOnInit(): void {
    this.profileService.getCurrentProfile().subscribe((profile) => {
      if (profile.respiteBackground.respiteProviderInfo) {
        this.currentProviderInfo = profile.respiteBackground.respiteProviderInfo;
      } else {
        this.toastService.show({
          body: 'This account does not currently have any respite provider info.',
          preset: ToastPresets.ERROR,
        });
        this.router.navigate(['/user/create/respite-provider-info']);
      }
    });
  }

  onSubmit(): void {
    if (this.updateProviderInfoForm.invalid) {
      this.updateProviderInfoForm.markAllAsTouched();
    } else {
      this.submittingForm = true;

      const req: UpdateRespiteProviderInfo = {
        cityCanProvideRespiteIn:
          this.updateProviderInfoForm.get('cityCanProvideRespiteIn')!.value === '' ||
          this.updateProviderInfoForm.get('cityCanProvideRespiteIn')!.value === null
            ? undefined
            : this.updateProviderInfoForm.get('cityCanProvideRespiteIn')!.value,
        respiteTravelDistance:
          this.updateProviderInfoForm.get('respiteTravelDistance')!.value === '' ||
          this.updateProviderInfoForm.get('respiteTravelDistance')!.value === null
            ? undefined
            : this.updateProviderInfoForm.get('respiteTravelDistance')!.value,
        careForMinAge:
          this.updateProviderInfoForm.get('careForMinAge')!.value === '' ||
          this.updateProviderInfoForm.get('careForMinAge')!.value === null
            ? undefined
            : this.updateProviderInfoForm.get('careForMinAge')!.value,
        careForMaxAge:
          this.updateProviderInfoForm.get('careForMaxAge')!.value === '' ||
          this.updateProviderInfoForm.get('careForMaxAge')!.value === null
            ? undefined
            : this.updateProviderInfoForm.get('careForMaxAge')!.value,
        maxNumCareFor:
          this.updateProviderInfoForm.get('maxNumCareFor')!.value === '' ||
          this.updateProviderInfoForm.get('maxNumCareFor')!.value === null
            ? undefined
            : this.updateProviderInfoForm.get('maxNumCareFor')!.value,
      };

      this.profileService.updateRespiteProviderInfo(req).subscribe(
        (profile) => {
          this.toastService.show({
            body: 'Successfully updated respite provider information.',
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

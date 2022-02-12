import { ProfileService } from '../../services/profile-service/profile.service';
import { RespiteBackgroundRes } from '../../models/get-profile-by-id.models';
import { ToastService } from '../../services/toast-service/toast.service';
import { UpdateRespiteBackgroundReq } from '../../models/profile.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastPresets } from '../../models/toast.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-respite-background',
  templateUrl: './update-respite-background.component.html',
  styleUrls: ['./update-respite-background.component.scss'],
})
export class UpdateRespiteBackgroundComponent implements OnInit {
  public currentRespiteBackground: RespiteBackgroundRes;
  public updateRespiteBackgroundForm: FormGroup;
  public submittingForm = false;

  constructor(
    private profileService: ProfileService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.updateRespiteBackgroundForm = this.formBuilder.group({
      fosterYearsExperience: [null],
      totalChildrenCaredFor: [null],
      lookingForRespite: [null],
    });
  }

  ngOnInit(): void {
    this.profileService.getCurrentProfile().subscribe(
      (profile) => {
        this.currentRespiteBackground = profile.respiteBackground;
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }

  onSubmit(): void {
    if (this.updateRespiteBackgroundForm.invalid) {
      this.updateRespiteBackgroundForm.markAllAsTouched();
    } else {
      this.submittingForm = true;

      const req: UpdateRespiteBackgroundReq = {
        fosterYearsExperience:
          this.updateRespiteBackgroundForm.get('fosterYearsExperience')!.value === '' ||
          this.updateRespiteBackgroundForm.get('fosterYearsExperience')!.value === null
            ? undefined
            : this.updateRespiteBackgroundForm.get('fosterYearsExperience')!.value,
        totalChildrenCaredFor:
          this.updateRespiteBackgroundForm.get('totalChildrenCaredFor')!.value === '' ||
          this.updateRespiteBackgroundForm.get('totalChildrenCaredFor')!.value === null
            ? undefined
            : this.updateRespiteBackgroundForm.get('totalChildrenCaredFor')!.value,
        lookingForRespite:
          this.updateRespiteBackgroundForm.get('lookingForRespite')!.value === '' ||
          this.updateRespiteBackgroundForm.get('lookingForRespite')!.value === null
            ? undefined
            : this.updateRespiteBackgroundForm.get('lookingForRespite')!.value,
      };

      this.profileService.updateRespiteBackground(req).subscribe(
        (profile) => {
          this.toastService.show({
            body: 'Successfully updated respite background.',
            preset: ToastPresets.SUCCESS,
          });
          this.router.navigate([`/user/`]);
        },
        (err) => {
          this.toastService.httpError(err);
          this.submittingForm = false;
        }
      );
    }
  }
}

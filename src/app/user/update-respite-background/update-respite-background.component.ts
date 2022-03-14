import { ProfileService } from '../../services/profile-service/profile.service';
import { RespiteBackgroundRes } from '../../models/get-profile-by-id.models';
import { ToastService } from '../../services/toast-service/toast.service';
import { UpdateRespiteBackgroundReq } from '../../models/profile.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
    private formBuilder: FormBuilder
  ) {
    this.updateRespiteBackgroundForm = this.formBuilder.group({
      fosterYearsExperience: [null],
      totalChildrenCaredFor: [null],
      lookingForRespite: [null],
    });
  }

  ngOnInit(): void {
    this.profileService.getCurrentProfile().subscribe((profile) => {
      this.currentRespiteBackground = profile.respiteBackground;
    }, this.toastService.httpError);
  }

  onSubmit(): void {
    if (this.updateRespiteBackgroundForm.invalid) {
      this.updateRespiteBackgroundForm.markAllAsTouched();
      return;
    }
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
        this.toastService.successAndNavigate('Successfully updated respite background.', `/user/`);
      },
      (err) => {
        this.toastService.httpError(err);
        this.submittingForm = false;
      }
    );
  }
}

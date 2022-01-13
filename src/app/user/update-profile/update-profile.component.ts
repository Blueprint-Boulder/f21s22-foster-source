import { ProfileService } from '../../services/profile-service/profile.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { FullProfileRes } from '../../models/get-profile-by-id.models';
import { UpdateProfileReq } from '../../models/profile.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastPresets } from '../../models/toast.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  public currentProfile: FullProfileRes;
  public updateProfileForm: FormGroup;
  public submittingForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private profileService: ProfileService
  ) {
    this.updateProfileForm = this.formBuilder.group({
      preferredName: [null],
      biography: [null],
      gender: [null],
      pronouns: [null],
      maritalStatus: [null],
    });
  }

  ngOnInit(): void {
    this.profileService.getCurrentProfile().subscribe((profile) => {
      this.currentProfile = profile;
    });
  }

  onSubmit(): void {
    if (this.updateProfileForm.invalid) {
      this.updateProfileForm.markAllAsTouched();
    } else {
      this.submittingForm = true;

      const req: UpdateProfileReq = {
        preferredName:
          this.updateProfileForm.get('preferredName')?.value === '' ||
          this.updateProfileForm.get('preferredName')?.value === null
            ? undefined
            : this.updateProfileForm.get('preferredName')?.value,
        biography:
          this.updateProfileForm.get('biography')?.value === '' ||
          this.updateProfileForm.get('biography')?.value === null
            ? undefined
            : this.updateProfileForm.get('biography')?.value,
        gender:
          this.updateProfileForm.get('gender')?.value === '' || this.updateProfileForm.get('gender')?.value === null
            ? undefined
            : this.updateProfileForm.get('gender')?.value,
        pronouns:
          this.updateProfileForm.get('pronouns')?.value === '' || this.updateProfileForm.get('gender')?.value === null
            ? undefined
            : this.updateProfileForm.get('gender')?.value,
        maritalStatus:
          this.updateProfileForm.get('maritalStatus')?.value === '' ||
          this.updateProfileForm.get('maritalStatus')?.value === null
            ? undefined
            : this.updateProfileForm.get('maritalStatus')?.value,
      };

      this.profileService.updateProfile(req).subscribe(
        (res) => {
          this.toastService.show({
            body: 'Profile information successfully updated.',
            preset: ToastPresets.SUCCESS,
          });
          this.router.navigate([`/user/${res.id}`]);
        },
        (err) => {
          this.toastService.httpError(err);
          this.submittingForm = false;
        }
      );
    }
  }
}

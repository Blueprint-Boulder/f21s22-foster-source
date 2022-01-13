import { ProfileService } from '../../services/profile-service/profile.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { SecondaryAccountHolderReq } from '../../models/profile.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneNumber } from '../../models/phonenumber.model';
import { FormUtils } from '../../common/utils/FormUtils';
import { ToastPresets } from '../../models/toast.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-secondary-account-holder',
  templateUrl: './create-secondary-account-holder.component.html',
  styleUrls: ['./create-secondary-account-holder.component.scss'],
})
export class CreateSecondaryAccountHolderComponent {
  public readonly PHONE_TYPES: string[];

  public createSecAccountHolderForm: FormGroup;
  public submittingForm = false;

  constructor(
    private profileService: ProfileService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.PHONE_TYPES = FormUtils.getPhoneTypes();

    this.createSecAccountHolderForm = this.formBuilder.group({
      relationshipToPrimary: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      preferredName: [null, Validators.required],
      pronouns: [null],
      gender: [null, Validators.required],
      maritalStatus: [null],
      secAccountHolderPhone: [null, Validators.compose([Validators.required, FormUtils.validatePhoneNumber])],
      secAccountHolderPhoneType: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.createSecAccountHolderForm.invalid) {
      this.createSecAccountHolderForm.markAllAsTouched();
    } else {
      this.submittingForm = true;

      const req: SecondaryAccountHolderReq = {
        firstName: this.createSecAccountHolderForm.get('firstName')!.value,
        lastName: this.createSecAccountHolderForm.get('lastName')!.value,
        preferredName: this.createSecAccountHolderForm.get('preferredName')!.value,
        relationshipToPrimary: this.createSecAccountHolderForm.get('relationshipToPrimary')!.value,
        gender: this.createSecAccountHolderForm.get('gender')!.value,
        email: this.createSecAccountHolderForm.get('email')!.value,
        pronouns:
          this.createSecAccountHolderForm.get('pronouns')!.value === '' ||
          this.createSecAccountHolderForm.get('pronouns')!.value === null
            ? undefined
            : this.createSecAccountHolderForm.get('pronouns')!.value,
        maritalStatus:
          this.createSecAccountHolderForm.get('maritalStatus')!.value === '' ||
          this.createSecAccountHolderForm.get('maritalStatus')!.value === null
            ? undefined
            : this.createSecAccountHolderForm.get('maritalStatus')!.value,
        secAccountHolderPhone: this.getPhone(),
      };

      this.profileService.addSecondaryAccountHolder(req).subscribe(
        (profile) => {
          this.toastService.show({
            body: 'Successfully added secondary account holder.',
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

  private getPhone(): PhoneNumber {
    return {
      phoneNumber: this.createSecAccountHolderForm.get('secAccountHolderPhone')!.value,
      type: this.createSecAccountHolderForm.get('secAccountHolderPhoneType')!.value,
    };
  }
}

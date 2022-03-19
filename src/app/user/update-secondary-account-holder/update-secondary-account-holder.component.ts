import { SecAccountHolderRes, UpdateSecAccountHolderReq } from '../../models/get-profile-by-id.models';
import { ProfileService } from '../../services/profile-service/profile.service';
import { PhoneNumber, PhoneNumberType } from '../../models/phonenumber.model';
import { ToastService } from '../../services/toast-service/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../common/utils/FormUtils';
import { ToastPresets } from '../../models/toast.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-secondary-account-holder',
  templateUrl: './update-secondary-account-holder.component.html',
  styleUrls: ['./update-secondary-account-holder.component.scss'],
})
export class UpdateSecondaryAccountHolderComponent implements OnInit {
  public readonly PHONE_TYPES: string[];

  public currentSecAccountHolder: SecAccountHolderRes;
  public updateSecAccountHolderForm: FormGroup;
  public submittingForm = false;

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) {
    this.PHONE_TYPES = FormUtils.getPhoneTypes();

    this.updateSecAccountHolderForm = this.formBuilder.group({
      relationshipToPrimary: [null],
      firstName: [null],
      lastName: [null],
      email: [null, Validators.email],
      preferredName: [null],
      pronouns: [null],
      gender: [null],
      maritalStatus: [null],
      secAccountHolderPhone: [null],
      secAccountHolderPhoneType: [null],
    });
  }

  ngOnInit(): void {
    this.profileService.getCurrentProfile().subscribe((profile) => {
      if (profile.secAccountHolder) {
        this.currentSecAccountHolder = profile.secAccountHolder;
      } else {
        this.toastService.show({
          body: 'This account does not currently have a secondary account holder.',
          preset: ToastPresets.ERROR,
        });
        this.router.navigate(['/user/create/secondary-account-holder']);
      }
    });

    this.updateSecAccountHolderForm
      .get('secAccountHolderPhone')
      ?.valueChanges.subscribe((secAccountHolderPhone: string) => {
        if (secAccountHolderPhone === '' || secAccountHolderPhone === null) {
          this.updateSecAccountHolderForm.get('secAccountHolderPhone')?.setValidators([]);
          this.updateSecAccountHolderForm.get('secAccountHolderPhoneType')?.setValidators([]);
        } else {
          this.updateSecAccountHolderForm.get('secAccountHolderPhone')?.setValidators([FormUtils.validatePhoneNumber]);
          this.updateSecAccountHolderForm.get('secAccountHolderPhoneType')?.setValidators([Validators.required]);
        }
        this.updateSecAccountHolderForm.get('secAccountHolderPhone')?.updateValueAndValidity({ emitEvent: false });
        this.updateSecAccountHolderForm.get('secAccountHolderPhoneType')?.updateValueAndValidity({ emitEvent: false });
      });
  }

  onSubmit(): void {
    if (this.updateSecAccountHolderForm.invalid) {
      this.updateSecAccountHolderForm.markAllAsTouched();
      return;
    }
    this.submittingForm = true;
    const req: UpdateSecAccountHolderReq = {
      relationshipToPrimary:
        this.updateSecAccountHolderForm.get('relationshipToPrimary')!.value === '' ||
        this.updateSecAccountHolderForm.get('relationshipToPrimary')!.value === null
          ? undefined
          : this.updateSecAccountHolderForm.get('relationshipToPrimary')!.value,
      firstName:
        this.updateSecAccountHolderForm.get('firstName')!.value === '' ||
        this.updateSecAccountHolderForm.get('firstName')!.value === null
          ? undefined
          : this.updateSecAccountHolderForm.get('firstName')!.value,
      lastName:
        this.updateSecAccountHolderForm.get('lastName')!.value === '' ||
        this.updateSecAccountHolderForm.get('lastName')!.value === null
          ? undefined
          : this.updateSecAccountHolderForm.get('lastName')!.value,
      email:
        this.updateSecAccountHolderForm.get('email')!.value === '' ||
        this.updateSecAccountHolderForm.get('email')!.value === null
          ? undefined
          : this.updateSecAccountHolderForm.get('email')!.value,
      preferredName:
        this.updateSecAccountHolderForm.get('preferredName')!.value === '' ||
        this.updateSecAccountHolderForm.get('preferredName')!.value === null
          ? undefined
          : this.updateSecAccountHolderForm.get('preferredName')!.value,
      pronouns:
        this.updateSecAccountHolderForm.get('pronouns')!.value === '' ||
        this.updateSecAccountHolderForm.get('pronouns')!.value === null
          ? undefined
          : this.updateSecAccountHolderForm.get('pronouns')!.value,
      gender:
        this.updateSecAccountHolderForm.get('gender')!.value === '' ||
        this.updateSecAccountHolderForm.get('gender')!.value === null
          ? undefined
          : this.updateSecAccountHolderForm.get('gender')!.value,
      maritalStatus:
        this.updateSecAccountHolderForm.get('maritalStatus')!.value === '' ||
        this.updateSecAccountHolderForm.get('maritalStatus')!.value === null
          ? undefined
          : this.updateSecAccountHolderForm.get('maritalStatus')!.value,
      secAccountHolderPhone: this.getPhoneNumberFromForm(),
    };

    this.profileService.updateSecondaryAccountHolder(req).subscribe(
      (profile) => {
        this.toastService.successAndNavigate('Successfully updated secondary account holder', '/user');
      },
      (err) => {
        this.toastService.httpError(err);
        this.submittingForm = false;
      }
    );
  }

  private getPhoneNumberFromForm(): PhoneNumber | undefined {
    if (
      this.updateSecAccountHolderForm.get('secAccountHolderPhone')!.value !== '' &&
      this.updateSecAccountHolderForm.get('secAccountHolderPhone')!.value !== null &&
      this.updateSecAccountHolderForm.get('secAccountHolderPhoneType')!.value !== '' &&
      this.updateSecAccountHolderForm.get('secAccountHolderPhoneType')!.value !== null
    ) {
      return {
        phoneNumber: FormUtils.formatPhoneNumber(
          this.updateSecAccountHolderForm.get('secAccountHolderPhone')!.value as string
        ),
        type: this.updateSecAccountHolderForm.get('secAccountHolderPhoneType')!.value as PhoneNumberType,
      };
    } else {
      return undefined;
    }
  }
}

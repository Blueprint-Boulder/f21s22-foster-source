import { PhoneNumberService } from '../../services/phone-number-service/phone-number.service';
import { PhoneNumber, PhoneNumbersUpdateReq } from '../../models/phonenumber.model';
import { ToastService } from '../../services/toast-service/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../common/utils/FormUtils';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['./update-phone.component.scss'],
})
export class UpdatePhoneComponent implements OnInit {
  public readonly PHONE_TYPES;

  public updatePhoneForm: FormGroup;
  public currentPrimaryPhoneNumber: PhoneNumber;
  public currentSecondaryPhoneNumber: PhoneNumber;
  public submittingForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private phoneService: PhoneNumberService
  ) {
    this.PHONE_TYPES = FormUtils.getPhoneTypes();
  }

  ngOnInit(): void {
    this.updatePhoneForm = this.formBuilder.group({
      primaryPhone: '',
      primaryType: '',
      secondaryPhone: '',
      secondaryType: '',
    });
    this.phoneService.getPhoneNumbers().subscribe((res) => {
      this.currentPrimaryPhoneNumber = res.primaryPhoneNumber;
      if (res.secondaryPhoneNumber) {
        this.currentSecondaryPhoneNumber = res.secondaryPhoneNumber;
      }
    });
    this.updatePhoneForm.get('primaryPhone')?.valueChanges.subscribe((secondaryPhone: string) => {
      if (secondaryPhone === '' || secondaryPhone === null) {
        this.updatePhoneForm.get('primaryPhone')?.setValidators([]);
        this.updatePhoneForm.get('primaryType')?.setValidators([]);
      } else {
        this.updatePhoneForm.get('primaryPhone')?.setValidators([FormUtils.validatePhoneNumber]);
        this.updatePhoneForm.get('primaryType')?.setValidators([Validators.required]);
      }
      this.updatePhoneForm.get('primaryPhone')?.updateValueAndValidity({ emitEvent: false });
      this.updatePhoneForm.get('primaryType')?.updateValueAndValidity({ emitEvent: false });
    });
    this.updatePhoneForm.get('secondaryPhone')?.valueChanges.subscribe((secondaryPhone: string) => {
      if (secondaryPhone === '' || secondaryPhone === null) {
        this.updatePhoneForm.get('secondaryPhone')?.setValidators([]);
        this.updatePhoneForm.get('secondaryType')?.setValidators([]);
      } else {
        this.updatePhoneForm.get('secondaryPhone')?.setValidators([FormUtils.validatePhoneNumber]);
        this.updatePhoneForm.get('secondaryType')?.setValidators([Validators.required]);
      }
      this.updatePhoneForm.get('secondaryPhone')?.updateValueAndValidity({ emitEvent: false });
      this.updatePhoneForm.get('secondaryType')?.updateValueAndValidity({ emitEvent: false });
    });
  }

  onSubmit(): void {
    if (this.updatePhoneForm.invalid) {
      this.updatePhoneForm.markAllAsTouched();
      return;
    }

    this.submittingForm = true;

    const req: PhoneNumbersUpdateReq = {
      primaryPhoneNumber: this.updatePhoneForm.get('primaryType')?.value
        ? {
            phoneNumber: FormUtils.formatPhoneNumber(this.updatePhoneForm.get('primaryPhone')!.value),
            type: this.updatePhoneForm.get('primaryType')!.value,
          }
        : undefined,
      secondaryPhoneNumber: this.updatePhoneForm.get('secondaryType')?.value
        ? {
            phoneNumber: FormUtils.formatPhoneNumber(this.updatePhoneForm.get('secondaryPhone')!.value),
            type: this.updatePhoneForm.get('secondaryType')!.value,
          }
        : undefined,
    };

    this.phoneService.updatePhoneNumber(req).subscribe(
      (_) => {
        this.toastService.successAndNavigate('Phone numbers successfully updated.', '/account');
      },
      (err) => {
        this.toastService.httpError(err);
        this.submittingForm = false;
      }
    );
  }
}

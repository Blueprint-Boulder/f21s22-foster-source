import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account-service/account.service';
import { accountServiceProvider } from '../../services/account-service/account.service.provider';
import { ToastService } from '../../services/toast-service/toast.service';
import { CaseWorkerInfo } from '../../models/account.model';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as libphonenumber from 'google-libphonenumber';
import { Router } from '@angular/router';
import { ToastPresets } from '../../models/toast.model';
import { FormUtils } from '../../common/utils/FormUtils';

@Component({
  selector: 'app-update-case-worker',
  templateUrl: './update-case-worker.component.html',
  styleUrls: ['./update-case-worker.component.scss'],
})
export class UpdateCaseWorkerComponent implements OnInit {
  public cwInfo: CaseWorkerInfo;
  public submittingForm = false;
  public updateCwInfoForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateCwInfoForm = this.formBuilder.group({
      caseworkerfname: ['', Validators.required],
      caseworkerlname: ['', Validators.required],
      caseworkeremail: ['', Validators.compose([Validators.required, Validators.email])],
      caseworkerphone: ['', Validators.compose([Validators.required, UpdateCaseWorkerComponent.validatePhoneNumber])],
      certifiedBy: ['', Validators.required],
      certExpiry: [null, Validators.compose([Validators.required, FormUtils.validateDate])],
    });
    this.accountService.getCwInfo().subscribe((cwInfo) => {
      this.cwInfo = cwInfo;
    }, this.toastService.httpError);
  }

  onSubmit(): void {
    if (this.updateCwInfoForm.invalid) {
      this.updateCwInfoForm.markAllAsTouched();
      return;
    }

    this.submittingForm = true;

    const req: CaseWorkerInfo = {
      cwEmail: this.updateCwInfoForm.get('caseworkeremail')!.value,
      cwFirstName: this.updateCwInfoForm.get('caseworkerfname')!.value,
      cwLastName: this.updateCwInfoForm.get('caseworkerlname')!.value,
      cwPhoneNumber: UpdateCaseWorkerComponent.formatPhoneNumber(this.updateCwInfoForm.get('caseworkerphone')!.value),
      certifiedBy: this.updateCwInfoForm.get('certifiedBy')!.value,
      certExpiry: this.updateCwInfoForm.get('certExpiry')!.value,
    };

    this.accountService.updateCwInfo(req).subscribe(
      (_) => {
        this.toastService.successAndNavigate('Successfully updated case worker information.', '/account');
      },
      (err) => {
        this.submittingForm = false;
        this.toastService.httpError(err);
      }
    );
  }

  private static validatePhoneNumber(control: AbstractControl): ValidationErrors | null {
    const err = { invalidPhone: 'Please enter a valid phone number.' };
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    try {
      const number = phoneUtil.parseAndKeepRawInput(control.value ? control.value : '', 'US');
      const valid = phoneUtil.isValidNumber(number);
      return valid ? null : err;
    } catch (e) {
      return err;
    }
  }

  private static formatPhoneNumber(num: string): string {
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    const parsed = phoneUtil.parse(num, 'US');
    return phoneUtil.format(parsed, libphonenumber.PhoneNumberFormat.E164);
  }
}

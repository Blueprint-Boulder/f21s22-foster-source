import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ChangePasswordReq } from '../../models/change-password';
import { AccountService } from '../../services/account-service/account.service';
import { accountServiceProvider } from '../../services/account-service/account.service.provider';
import { ToastService } from '../../services/toast-service/toast.service';
import { Router } from '@angular/router';
import { ToastPresets } from '../../models/toast.model';
import { FormUtils } from '../../common/utils/FormUtils';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public submittingForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmNewPassword: ['', Validators.required],
    });
    this.changePasswordForm.setValidators([FormUtils.confirmPasswordValidator('confirmNewPassword', 'newPassword')]);
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
    } else {
      this.submittingForm = true;
      const req: ChangePasswordReq = {
        oldPassword: this.changePasswordForm.get('oldPassword')!.value,
        newPassword: this.changePasswordForm.get('newPassword')!.value,
      };
      this.accountService.updatePasswordForCurrentAccount(req).subscribe(
        (_) => {
          this.toastService.show({
            body: 'Successfully updated password.',
            preset: ToastPresets.SUCCESS,
          });
          this.router.navigate(['/account']);
        },
        (err) => {
          this.submittingForm = false;
          this.toastService.httpError(err);
        }
      );
    }
  }
}

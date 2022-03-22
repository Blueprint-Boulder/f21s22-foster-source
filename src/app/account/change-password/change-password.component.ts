import { AccountService } from '../../services/account-service/account.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordReq } from '../../models/change-password';
import { FormUtils } from '../../common/utils/FormUtils';
import { Component, OnInit } from '@angular/core';

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
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmNewPassword: ['', Validators.required],
    });
    this.changePasswordForm.setValidators([FormUtils.confirmPasswordValidator('confirmNewPassword', 'newPassword')]);
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.submittingForm = true;

    const req: ChangePasswordReq = {
      oldPassword: this.changePasswordForm.get('oldPassword')!.value,
      newPassword: this.changePasswordForm.get('newPassword')!.value,
    };

    this.accountService.updatePasswordForCurrentAccount(req).subscribe(
      (_) => {
        this.toastService.successAndNavigate('Successfully updated password.', '/account');
      },
      (err) => {
        this.submittingForm = false;
        this.toastService.httpError(err);
      }
    );
  }
}

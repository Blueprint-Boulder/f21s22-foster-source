import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account-service/account.service';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPassForm = this.formBuilder.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
  });
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    return;
  }

  forgotPassSubmit(): void {
    if (this.forgotPassForm.invalid) {
      this.forgotPassForm.markAllAsTouched();
      return;
    }

    this.accountService.requestRecoverPassword(this.forgotPassForm.get('email')!.value).subscribe(
      (_) => {
        this.toastService.successAndNavigate('Successfully submitted request.', '/login/recovery/confirmation');
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }
}

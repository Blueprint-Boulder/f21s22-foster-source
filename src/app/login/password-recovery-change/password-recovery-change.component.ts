import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast-service/toast.service';
import { AccountService } from '../../services/account-service/account.service';
import { FormUtils } from '../../common/utils/FormUtils';
import { RecoveryChangePasswordReq } from '../../models/change-password';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery-change',
  templateUrl: './password-recovery-change.component.html',
  styleUrls: ['./password-recovery-change.component.scss'],
})
export class PasswordRecoveryChangeComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public key: string;
  public email: string;
  public submittingForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: [null, Validators.required],
    });
    this.changePasswordForm.setValidators([FormUtils.confirmPasswordValidator('confirmPassword', 'password')]);

    this.route.queryParamMap.subscribe((map) => {
      const email = map.get('email');
      const key = map.get('key');

      if (!email || !key) {
        this.toastService.error('Invalid URL.');
        this.router.navigate(['/login']);
        return;
      }

      this.email = email;
      this.key = key;
    });
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.submittingForm = true;

    const req: RecoveryChangePasswordReq = {
      email: this.email,
      key: this.key,
      password: this.changePasswordForm.get('password')!.value,
    };

    this.accountService.recoveryUpdatePassword(req).subscribe(
      (_) => {
        this.toastService.success('Successfully updated your password.');
        this.router.navigate(['/login']);
      },
      (err) => {
        this.toastService.httpError(err);
        this.submittingForm = false;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account-service/account.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { accountServiceProvider } from '../../services/account-service/account.service.provider';
import { Router } from '@angular/router';
import { ToastPresets } from '../../models/toast.model';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent implements OnInit {
  public deleteAccountForm: FormGroup;
  public submittingForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.deleteAccountForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.deleteAccountForm.invalid) {
      this.deleteAccountForm.markAllAsTouched();
    } else {
      this.submittingForm = true;
      this.accountService.deleteOwnAccount({ password: this.deleteAccountForm.get('password')!.value }).subscribe(
        (_) => {
          this.toastService.show({
            body: 'Successfully deleted account.',
            preset: ToastPresets.SUCCESS,
          });
          //TODO: Log out.
          this.router.navigate(['/']);
        },
        (err) => {
          this.toastService.httpError(err);
          this.submittingForm = false;
        }
      );
    }
  }
}

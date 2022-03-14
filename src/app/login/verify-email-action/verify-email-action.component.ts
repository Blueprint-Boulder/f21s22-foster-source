import { AccountService } from '../../services/account-service/account.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email-action',
  templateUrl: './verify-email-action.component.html',
  styleUrls: ['./verify-email-action.component.scss'],
})
export class VerifyEmailActionComponent implements OnInit {
  public isError = true;
  public errorMessage = 'Verifying your account...';

  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.key) {
        this.accountService.verifyAccount({ key: params.key }).subscribe(
          () => {
            this.toastService.success('Success! Account verified.');
            this.isError = false;
          },
          (err) => {
            this.isError = true;
            this.errorMessage = 'There was an error verifying your account. Please try again later';
          }
        );
      } else {
        this.toastService.error('Invalid verification URL, missing key.');
        this.isError = true;
        this.errorMessage = 'Invalid email verification link.';
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastPresets } from '../../models/toast.model';
import { AccountService } from '../../services/account-service/account.service';
import { accountServiceProvider } from '../../services/account-service/account.service.provider';

@Component({
  selector: 'app-verify-email-action',
  templateUrl: './verify-email-action.component.html',
  styleUrls: ['./verify-email-action.component.scss'],
  providers: [accountServiceProvider],
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
            this.toastService.show({
              body: 'Success! Account verified.',
              preset: ToastPresets.SUCCESS,
            });
            this.isError = false;
          },
          (err) => {
            this.isError = true;
            this.errorMessage = 'There was an error verifying your account. Please try again later';
          }
        );
      } else {
        this.toastService.show({
          body: 'Invalid verification URL, missing key.',
          preset: ToastPresets.ERROR,
        });
        this.isError = true;
        this.errorMessage = 'Invalid email verification link.';
      }
    });
  }
}

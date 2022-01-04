import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { accountServiceProvider } from '../../services/account-service/account.service.provider';
import { AccountService } from '../../services/account-service/account.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastPresets } from '../../models/toast.model';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  providers: [accountServiceProvider],
})
export class VerifyEmailComponent implements OnInit {
  public email: string | null;
  public countdown = 121;
  public verificationEmailReSent = false;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
    timer(0, 1000).subscribe((_) => {
      if (this.countdown > 0) {
        this.countdown = this.countdown - 1;
      }
    });
  }

  public resendEmail(): void {
    this.verificationEmailReSent = true;
    if (this.email) {
      this.accountService.resendVerificationEmail(this.email).subscribe(
        () => {
          this.toastService.show({
            body: 'Email successfully re-sent.',
            preset: ToastPresets.SUCCESS,
          });
        },
        (err) => {
          this.toastService.httpError(err);
        }
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { accountServiceProvider } from '../../services/account-service/account.service.provider';
import { AccountService } from '../../services/account-service/account.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastPresets } from '../../models/toast.model';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  public readonly EMAIL_REGEX: RegExp =
    /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i;

  public email: string | null;
  public countdown = 61;
  public verificationEmailReSent = false;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
    if (!this.email?.match(this.EMAIL_REGEX)) {
      this.router.navigate(['/not-found']);
      return;
    }

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
          this.toastService.success('Email was successfully re-sent.');
        },
        (err) => {
          this.toastService.httpError(err);
        }
      );
    }
  }
}

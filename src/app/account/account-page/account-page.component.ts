import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account-service/account.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { accountServiceProvider } from '../../services/account-service/account.service.provider';
import { Account } from '../../models/account.model';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
  public currentAccount: Account;
  public isUser = true;
  public certExpiresSoon = false;
  public certExpired = false;

  constructor(
    private accountService: AccountService,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.getCurrentAccount().subscribe(
      (acc: Account) => {
        this.currentAccount = acc;
        this.isUser = this.authService.getToken()?.privilegeLevel === 1;

        if (this.isUser) {
          this.certExpired = this.isCertExpired(this.currentAccount.certExpiry);

          if (!this.certExpired) {
            this.certExpiresSoon = this.doesCertExpireSoon(this.currentAccount.certExpiry);
          }
        }
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }

  deleteAccount(): void {
    const verify: boolean =
      prompt(
        'Are you sure you would like to delete your account? Type "confirm" to confirm deletion.'
      )?.toLowerCase() === 'confirm';
    if (verify) {
      this.router.navigate(['/account/delete-account']);
    }
  }

  getFormattedCertExpiryDate(): string {
    if (this.currentAccount) {
      return formatDate(this.currentAccount.certExpiry, 'MM/dd/yyyy', 'en-US');
    } else {
      return '';
    }
  }

  doesCertExpireSoon(expirationDate: Date): boolean {
    return (expirationDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) <= 30;
  }

  isCertExpired(expirationDate: Date): boolean {
    return expirationDate.getTime() <= new Date().getTime();
  }
}

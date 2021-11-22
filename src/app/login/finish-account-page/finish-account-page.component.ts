import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account-service/account.service';
import { Account } from '../../models/account.model';
import { accountServiceProvider } from '../../services/account-service/account.service.provider';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastPresets } from '../../models/toast.model';

@Component({
  selector: 'app-finish-account-page',
  templateUrl: './finish-account-page.component.html',
  styleUrls: ['./finish-account-page.component.scss'],
  providers: [accountServiceProvider],
})
export class FinishAccountPageComponent implements OnInit {
  public currentUser: Account;

  constructor(private accountService: AccountService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.accountService.getCurrentAccount().subscribe(
      (account: Account) => {
        this.currentUser = account;
      },
      (err) => {
        this.toastService.show({
          body: 'Unable to fetch the current logged in user.',
          preset: ToastPresets.ERROR,
        });
      }
    );
  }
}

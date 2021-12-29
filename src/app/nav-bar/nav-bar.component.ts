import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Privilege } from '../services/auth-service/auth.service';
import { Account } from '../models/account.model';
import { AccountService } from '../services/account-service/account.service';
import { accountServiceProvider } from '../services/account-service/account.service.provider';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  providers: [accountServiceProvider],
})
export class NavBarComponent implements OnInit {
  public currentAccount: Account;
  public isAdmin = false;

  constructor(public router: Router, private accountService: AccountService, private authService: AuthService) {
    this.authService.loggedInEvent.subscribe((_) => this.loggedIn());
  }

  ngOnInit() {
    this.loggedIn();
  }

  loggedIn(): void {
    this.accountService.getCurrentAccount().subscribe(
      (account: Account) => {
        this.currentAccount = account;
        const cookie = this.authService.getToken();
        if (cookie) {
          this.isAdmin = cookie.privilegeLevel >= Privilege.MOD;
        }
      },
      (err) => {
        console.log(err);
        console.log('No account found.');
      }
    );
  }

  logout(): void {
    this.accountService.logout().subscribe(
      () => {
        this.authService.init();
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err);
        console.log('Failed to log out');
      }
    );
  }

  getProfilePicture(): string {
    return 'assets/images/blank-profile-photo.jpg';
  }
}

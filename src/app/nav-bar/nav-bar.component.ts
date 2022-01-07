import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { Account } from '../models/account.model';
import { AccountService } from '../services/account-service/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public currentAccount: Account | undefined;
  public isMod = false;
  private isLoggedIn = false;

  constructor(public router: Router, private accountService: AccountService, private authService: AuthService) {
    this.authService.loggedInEvent.subscribe((_) => this.loggedIn());
  }

  ngOnInit(): void {
    // Account for possible race condition where auth service emits logged in before nav bar loads
    if (!this.isLoggedIn) {
      if (this.authService.isAtLeastUser()) {
        this.loggedIn();
      }
    }
  }

  loggedIn(): void {
    this.isLoggedIn = true;
    this.accountService.getCurrentAccount().subscribe(
      (account: Account) => {
        this.currentAccount = account;
        this.isMod = this.authService.isAtLeastMod();
      },
      (err) => {
        console.log(err);
        console.log('No account found.');
      }
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.authService.logout();
    this.accountService.logout().subscribe(
      () => {
        this.router.navigate(['/']);
        this.currentAccount = undefined;
        this.isMod = false;
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

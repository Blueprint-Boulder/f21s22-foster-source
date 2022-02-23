import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { Account } from '../models/account.model';
import { AccountService } from '../services/account-service/account.service';
import { ImageUtils } from '../common/utils/ImageUtils';
import { ProfileService } from '../services/profile-service/profile.service';
import { environment } from '../../environments/environment';
import { NavBarStatus } from '../models/nav-bar.models';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public profileImageSrc = 'assets/images/blank-profile-photo.jpg';
  public isProdEnv = environment.production;

  public currentAccount: Account | undefined;
  public isMod = false;
  public isCollapsed = true;
  public status: NavBarStatus;

  private isLoggedIn = false;

  constructor(
    public router: Router,
    private accountService: AccountService,
    private authService: AuthService,
    private profileService: ProfileService
  ) {
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

        if (account.profileCompleted) {
          this.profileService.getProfileImages().subscribe(
            (imageKeys) => {
              this.profileImageSrc = ImageUtils.buildS3Url(imageKeys.profileSmallAwsKey);
            },
            (err) => {
              console.log('Error fetching profile images.', err);
            }
          );
        }

        this.accountService.getNavBarStatus().subscribe((status) => {
          console.log(status);
          this.status = status;
        });
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

  collapse(): void {
    console.log(this.isCollapsed);
    this.isCollapsed = true;
  }

  onProfileImgErr(event: any): void {
    this.profileImageSrc = 'assets/images/blank-profile-photo.jpg';
  }
}

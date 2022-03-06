import { AnnouncementService } from '../../services/announcement-service/announcement.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { Announcement } from '../../models/announcement.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  public latestAnnouncement: Announcement;
  public isLoggedIn = false;
  constructor(
    private announcementService: AnnouncementService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.announcementService.getLatestAnnouncement().subscribe(
      (a: Announcement) => {
        this.latestAnnouncement = a;
      },
      (error: HttpErrorResponse) => {
        if (error.status !== 404) {
          this.toastService.httpError(error);
        }
      }
    );

    this.isLoggedIn = this.authService.isAtLeastUser();

    this.authService.loggedInEvent.subscribe(() => {
      this.isLoggedIn = true;
    });
    this.authService.loggedOutEvent.subscribe(() => {
      this.isLoggedIn = false;
    });
  }
}

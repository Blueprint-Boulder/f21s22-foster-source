import { AnnouncementService } from '../../services/announcement-service/announcement.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { Announcement } from '../../models/announcement.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  public latestAnnouncement: Announcement;
  constructor(private announcementService: AnnouncementService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.announcementService.getLatestAnnouncement().subscribe(
      (a: Announcement) => {
        this.latestAnnouncement = a;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status !== 404) {
          this.toastService.httpError(error);
        }
      }
    );
  }
}

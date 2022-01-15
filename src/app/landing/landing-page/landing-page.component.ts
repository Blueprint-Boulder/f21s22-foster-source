import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../models/announcement.model';
import { AnnouncementService } from '../../services/announcement-service/announcement.service';
import { announcementServiceProvider } from '../../services/announcement-service/announcement.service.provider';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastPresets } from '../../models/toast.model';
import { HttpErrorResponse } from '@angular/common/http';

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
        if (error.status !== 404) {
          this.toastService.httpError(error);
        }
      }
    );
  }
}

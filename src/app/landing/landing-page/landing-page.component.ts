import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Announcement } from '../../models/announcement.model';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementService } from '../../services/announcement-service/announcement.service';
import { announcementServiceProvider } from '../../services/announcement-service/announcement.service.provider';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [announcementServiceProvider],
})
export class LandingPageComponent implements OnInit {
  public latestAnnouncement: Announcement;
  @ViewChild('toast') toast: ElementRef;
  constructor(
    private announcementService: AnnouncementService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.announcementService.getLatestAnnouncement().subscribe(
      (a: Announcement) => {
        this.latestAnnouncement = a;
      },
      (error) => {
        this.toastService.error(
          'Failed to fetch latest announcement. Try reloading the page.',
          'Error'
        );
      }
    );
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '../../services/toast-service/toast.service';
import {
  Announcement,
  GetAnnouncementsRes,
  PostAnnouncementRequest,
  PostAnnouncementResponse,
} from '../../models/announcement.model';
import { ToastPresets } from '../../models/toast.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AnnouncementService } from '../../services/announcement-service/announcement.service';
import { announcementServiceProvider } from '../../services/announcement-service/announcement.service.provider';
@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
  providers: [announcementServiceProvider],
})
export class AnnouncementsComponent implements OnInit {
  public characterLimit = 2000;
  public richText = '';
  public title = '';
  public announcement: Announcement;
  public attemptingToPost = false;
  public pastAnnouncements: Announcement[] = [];

  constructor(
    private toastService: ToastService,
    private router: Router,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.announcementService.getAnnouncements().subscribe(
      (res: GetAnnouncementsRes) => {
        this.pastAnnouncements = res.announcements;
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }

  public postAnnouncement(): void {
    if (this.title.length === 0 || this.richText.length === 0) {
      this.toastService.show({
        body: 'Please enter a title and some body text.',
        preset: ToastPresets.ERROR,
      });
      return;
    }
    this.attemptingToPost = true;

    this.announcementService
      .postAnnouncement({
        title: this.title,
        bodyHtml: this.richText,
      } as PostAnnouncementRequest)
      .subscribe(
        (res: Announcement) => {
          this.toastService.show({
            body: `Successfully posted the announcement.`,
            preset: ToastPresets.SUCCESS,
          });
          this.reloadPage();
        },
        (error) => {
          this.toastService.httpError(error);
        }
      );
  }

  public textChange(changes: string) {
    this.richText = changes;
    this.announcement = {
      id: -1,
      title: this.title,
      account: {
        firstName: 'Your name',
        lastName: '',
      },
      bodyHtml: changes,
      datePosted: new Date(),
    };
  }

  public updatePreview() {
    this.announcement = {
      id: -1,
      title: this.title,
      account: {
        firstName: '[Your name]',
        lastName: '',
      },
      bodyHtml: this.richText,
      datePosted: new Date(),
    };
  }

  public reloadPage() {
    this.router
      .navigateByUrl('/admin', { skipLocationChange: true })
      .then(() => this.router.navigate(['/admin/announcements']));
  }
}

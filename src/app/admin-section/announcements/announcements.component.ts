import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../../services/database-service/database.service';
import { ToastService } from '../../services/toast-service/toast.service';
import {
  PostAnnouncementRequest,
  PostAnnouncementResponse,
} from '../../models/announcement.model';
import { ToastPresets } from '../../models/toast.model';
import { HttpErrorResponse } from '@angular/common/http';
import { databaseServiceProvider } from '../../services/database-service/database.service.provider';
@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
  providers: [databaseServiceProvider],
})
export class AnnouncementsComponent {
  public characterLimit = 2000;
  public richText = '';
  public title = '';

  constructor(
    private dbService: DatabaseService,
    private toastService: ToastService
  ) {}

  public postAnnouncement(): void {
    if (this.title.length === 0 || this.richText.length === 0) {
      this.toastService.show({
        body: 'Please enter a title and some body text.',
        preset: ToastPresets.ERROR,
      });
      return;
    }
    this.dbService
      .postAnnouncement({
        title: this.title,
        bodyHtml: this.richText,
      } as PostAnnouncementRequest)
      .subscribe(
        (res: PostAnnouncementResponse) => {
          if (res.error) {
            this.toastService.show({
              body: 'Something went wrong trying to post the announcement.',
              preset: ToastPresets.ERROR,
            });
          } else {
            this.toastService.show({
              body: `Successfully posted the announcement.`,
              preset: ToastPresets.SUCCESS,
            });
          }
        },
        (error: HttpErrorResponse) => {
          this.toastService.show({
            body: 'Something went wrong trying to post the announcement.',
            preset: ToastPresets.ERROR,
          });
        }
      );
  }

  public textChange(changes: string) {
    this.richText = changes;
  }
}

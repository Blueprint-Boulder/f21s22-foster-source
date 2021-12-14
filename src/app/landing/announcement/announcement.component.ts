import { Component, Input } from '@angular/core';
import { Announcement } from '../../models/announcement.model';
import { formatDate } from '@angular/common';
import { AnnouncementService } from '../../services/announcement-service/announcement.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { announcementServiceProvider } from '../../services/announcement-service/announcement.service.provider';
import { ToastPresets } from '../../models/toast.model';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
  providers: [announcementServiceProvider],
})
export class AnnouncementComponent {
  public editMode = false;
  private preEditAnnouncement: Announcement;

  @Input() announcement: Announcement | undefined;

  constructor(private announcementService: AnnouncementService, private toastService: ToastService) {}

  public getFormattedDate(): string {
    if (this.announcement) {
      return formatDate(this.announcement.datePosted, 'dd/MM/yyyy', 'en-US');
    } else {
      return '';
    }
  }

  public deleteAnnouncement(): void {
    if (this.announcement) {
      this.announcementService.deleteAnnouncement(this.announcement.id).subscribe(
        (_) => {
          this.toastService.show({
            body: 'Successfully deleted the announcement.',
            preset: ToastPresets.SUCCESS,
          });
          this.announcement = undefined;
        },
        (e) => {
          this.toastService.httpError(e);
        }
      );
    }
  }

  public updateAnnouncement(): void {
    if (this.announcement) {
      this.announcementService
        .updateAnnouncement({
          id: this.announcement.id,
          title: this.announcement.title,
          bodyHtml: this.announcement.bodyHtml,
        })
        .subscribe(
          (_) => {
            this.toastService.show({
              body: 'Successfully updated the announcement.',
              preset: ToastPresets.SUCCESS,
            });
            this.editMode = false;
          },
          (e) => {
            this.toastService.httpError(e);
          }
        );
    }
  }

  public enableEditMode(): void {
    if (this.announcement) {
      this.editMode = true;
      this.preEditAnnouncement = AnnouncementComponent.cloneAnnouncement(this.announcement);
    }
  }

  public cancelEditMode(): void {
    this.editMode = false;
    if (this.preEditAnnouncement) {
      this.announcement = AnnouncementComponent.cloneAnnouncement(this.preEditAnnouncement);
    }
  }

  private static cloneAnnouncement(source: Announcement): Announcement {
    return {
      id: source.id,
      datePosted: new Date(source.datePosted),
      title: source.title,
      bodyHtml: source.bodyHtml,
      account: {
        firstName: source.account.firstName,
        lastName: source.account.lastName,
      },
    };
  }
}

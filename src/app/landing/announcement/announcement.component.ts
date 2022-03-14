import { AnnouncementService } from '../../services/announcement-service/announcement.service';
import { AuthService, Privilege } from '../../services/auth-service/auth.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { Announcement } from '../../models/announcement.model';
import { Component, Input, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  public editMode = false;
  public canEdit = false;
  private preEditAnnouncement: Announcement;

  @Input() announcement: Announcement | undefined;

  constructor(
    private announcementService: AnnouncementService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const cookie = this.authService.getToken();

    if (cookie) {
      this.canEdit = cookie.privilegeLevel >= Privilege.MOD;
    }
  }

  public getFormattedDate(): string {
    if (this.announcement) {
      return formatDate(this.announcement.datePosted, 'MM/dd/yyyy', 'en-US');
    } else {
      return '';
    }
  }

  public deleteAnnouncement(): void {
    if (this.announcement) {
      this.announcementService.deleteAnnouncement(this.announcement.id).subscribe((_) => {
        this.toastService.success('Successfully deleted the announcement.');
        this.announcement = undefined;
      }, this.toastService.httpError);
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
        .subscribe((_) => {
          this.toastService.success('Successfully updated the announcement.');
          this.editMode = false;
        }, this.toastService.httpError);
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

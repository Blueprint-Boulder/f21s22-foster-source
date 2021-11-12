import { Component, Input, OnInit } from '@angular/core';
import { Announcement } from '../../models/announcement.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent {
  @Input() announcement: Announcement;

  public getFormattedDate(): string {
    return formatDate(this.announcement.date, 'dd/MM/yyyy', 'en-US');
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Announcement } from '../../models/announcement.model';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css'],
})
export class AnnouncementComponent {
  @Input() announcement: Announcement;
}

import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement-service/announcement.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { Announcement } from '../../models/announcement.model';

@Component({
  selector: 'app-all-announcements',
  templateUrl: './all-announcements.component.html',
  styleUrls: ['./all-announcements.component.scss'],
})
export class AllAnnouncementsComponent implements OnInit {
  public announcements: Announcement[];

  constructor(private announcementService: AnnouncementService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.announcementService.getAnnouncements().subscribe((res) => {
      this.announcements = res.announcements;
    });
  }
}

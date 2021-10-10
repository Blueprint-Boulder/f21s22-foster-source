import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Announcement } from '../../models/announcement.model';
import { DatabaseService } from '../../services/database-service/database.service';
import { databaseServiceProvider } from '../../services/database-service/database.service.provider';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [databaseServiceProvider],
})
export class LandingPageComponent implements OnInit {
  public latestAnnouncement: Announcement;
  @ViewChild('toast') toast: ElementRef;
  constructor(
    private dbService: DatabaseService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dbService.getLatestAnnouncement().subscribe(
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

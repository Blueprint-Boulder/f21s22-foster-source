import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../models/announcement.model';
import { DatabaseService } from '../../services/database-service/database.service';
import { databaseServiceProvider } from '../../services/database-service/database.service.provider';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [databaseServiceProvider],
})
export class LandingPageComponent implements OnInit {
  public latestAnnouncement: Announcement | null = null;

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.dbService
      .getLatestAnnouncement()
      .pipe(
        tap((a: Announcement) => {
          this.latestAnnouncement = a;
        })
      )
      .subscribe();
  }
}

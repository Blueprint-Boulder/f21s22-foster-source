import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../models/announcement.model';
import { DatabaseService } from '../../services/database-service/database.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [],
})
export class LandingPageComponent implements OnInit {
  // public latestAnnouncement: Announcement;

  constructor(private dbService: DatabaseService) {
    // this.latestAnnouncement = undefined;
  }

  ngOnInit(): void {
    return;
  }
}

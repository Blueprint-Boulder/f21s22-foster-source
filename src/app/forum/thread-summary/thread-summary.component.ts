import { Component, Input, OnInit } from '@angular/core';
import { ThreadSummary } from '../../models/forum.models';

@Component({
  selector: 'app-thread-summary',
  templateUrl: './thread-summary.component.html',
  styleUrls: ['./thread-summary.component.scss'],
})
export class ThreadSummaryComponent implements OnInit {
  @Input() thread: ThreadSummary;

  ngOnInit(): void {
    return;
  }

  getProfileImage() {
    return 'assets/images/blank-profile-photo.jpg';
  }
}

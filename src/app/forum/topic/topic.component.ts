import { Component, Input, OnInit } from '@angular/core';
import { TopicSummary } from '../../models/forum.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  @Input() topic: TopicSummary;

  constructor(private router: Router) {
    void 0;
  }

  ngOnInit(): void {
    return;
  }

  navigateToTopic(): void {
    if (this.topic !== undefined) {
      this.router.navigate([`/forum/topics/${this.topic.id}`]);
    }
  }
}

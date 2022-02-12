import { Component, Input, OnInit } from '@angular/core';
import { TopicSummary } from '../../models/forum.models';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  @Input() topic: TopicSummary;
  @Input() clickable = true;

  constructor() {
    void 0;
  }

  ngOnInit(): void {
    return;
  }
}

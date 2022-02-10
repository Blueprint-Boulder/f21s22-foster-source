import { Component, OnInit } from '@angular/core';
import { topicSummaries } from '../../mock/database-entities';
import { TopicSummary } from '../../models/forum.models';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  public topic: TopicSummary = topicSummaries[0];

  ngOnInit(): void {
    return;
  }
}

import { Component, OnInit } from '@angular/core';
import { FullTopicRes } from '../../models/forum.models';
import { topics } from '../../mock/database-entities';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  public topic: FullTopicRes = topics[0];

  ngOnInit(): void {
    return;
  }
}

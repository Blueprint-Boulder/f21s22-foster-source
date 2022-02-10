import { Component, OnInit } from '@angular/core';
import { TopicSummary } from '../../models/forum.models';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  public topics: TopicSummary[];

  constructor(private forumService: ForumService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.forumService.getTopicSummaries().subscribe(
      (res) => {
        this.topics = res.topics;
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }
}

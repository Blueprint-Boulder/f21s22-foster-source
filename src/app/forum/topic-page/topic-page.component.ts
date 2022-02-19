import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { Router } from '@angular/router';
import { ThreadSummary, TopicSummary } from '../../models/forum.models';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.scss'],
})
export class TopicPageComponent implements OnInit {
  public topic: TopicSummary;
  public threads: ThreadSummary[];

  // TODO: WILL DELETE THIS
  public testThreadForThreadSummaryComponent: ThreadSummary;

  constructor(private forumService: ForumService, private toastService: ToastService, private router: Router) {}

  ngOnInit(): void {
    // TODO: WE WILL DELETE THIS WHEN YOU ARE FINISHED CREATING THE THREADSUMMARY COMPONENT. THIS IS JUST
    // SO THAT YOU CAN SEE THE COMPONENT AS YOU ARE DEVELOPING IT, SAME AS LAST TIME.

    this.forumService.getThreadById(1).subscribe((t) => {
      this.testThreadForThreadSummaryComponent = t;
    });

    // TODO: END DELETE SECTION

    // forum service: getTopicSummaryById to display topic at top of page, returns TopicSummary
    // forum service: getThreadsForTopic, which returns GetThreadSummariesRes
    //                just set limit=25 and offset = 0, and I'll help out getting that stuff up and running
    return;
  }
}

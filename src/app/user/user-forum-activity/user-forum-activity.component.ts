import { Component, Input, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { ThreadSummary } from '../../models/forum.models';

@Component({
  selector: 'app-user-forum-activity',
  templateUrl: './user-forum-activity.component.html',
  styleUrls: ['./user-forum-activity.component.scss'],
})
export class UserForumActivityComponent implements OnInit {
  public readonly FETCH_COUNT = 10;

  public threads: ThreadSummary[] = [];
  public totalCount: number;

  @Input() accountId: number;

  constructor(private forumService: ForumService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.forumService.getLatestThreadsForAccount(this.accountId, this.FETCH_COUNT).subscribe((res) => {
      this.threads = res.threads;
      this.totalCount = res.totalResults;
    }, this.toastService.httpError);
  }

  likeUnlikeThread(index: number): void {
    const userHasLiked = this.threads[index].requesterHasLiked;

    if (!userHasLiked) {
      this.forumService.likeThread(this.threads[index].id).subscribe(() => {
        this.threads[index].requesterHasLiked = true;
        this.threads[index].likes += 1;
      }, this.toastService.httpError);
    } else {
      this.forumService.unlikeThread(this.threads[index].id).subscribe(() => {
        this.threads[index].requesterHasLiked = false;
        this.threads[index].likes -= 1;
      }, this.toastService.httpError);
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum-service/forum.service';
import { ForumStats } from '../../models/forum.models';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-user-forum-stats',
  templateUrl: './user-forum-stats.component.html',
  styleUrls: ['./user-forum-stats.component.scss'],
})
export class UserForumStatsComponent implements OnInit {
  public stats: ForumStats;

  @Input() accountId: number;

  constructor(private forumService: ForumService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.forumService.getStatsForAccount(this.accountId).subscribe(
      (stats) => {
        console.log('#@@@@@@@@');
        console.log(stats);
        this.stats = stats;
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }
}

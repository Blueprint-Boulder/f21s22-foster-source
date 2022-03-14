import { Component, OnInit } from '@angular/core';
import { TopicSummary } from '../../models/forum.models';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  public topics: TopicSummary[];
  public isMod = false;
  constructor(
    private forumService: ForumService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.forumService.getTopicSummaries().subscribe(
      (res) => {
        this.topics = res.topics;
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );

    this.isMod = this.authService.isAtLeastMod();
  }
}

import { Component, OnInit } from '@angular/core';
import { Reply, ThreadSummary, UpdateReplyReq } from '../../models/forum.models';
import { AuthService } from '../../services/auth-service/auth.service';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-reply',
  templateUrl: './edit-reply.component.html',
  styleUrls: ['./edit-reply.component.scss'],
})
export class EditReplyComponent implements OnInit {
  public reply: Reply;
  public submittingForm = false;

  constructor(
    private authService: AuthService,
    private forumService: ForumService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (!id || isNaN(parseInt(id))) {
        this.toastService.error('Invalid reply id.');
        return;
      }

      this.forumService.getReplyById(parseInt(id)).subscribe(
        (rs) => {
          if (this.authService.getToken()?.id !== rs.account.id) {
            this.toastService.error('Access denied. You can only edit your own replies.');
          } else {
            this.reply = rs;
          }
        },
        (err) => {
          this.toastService.httpError(err);
        }
      );
    });
  }

  onSubmit(): void {
    const req: UpdateReplyReq = {
      replyId: this.reply.id,
      body: this.reply.body,
    };

    this.forumService.updateReply(req).subscribe(
      (_) => {
        this.toastService.successAndNavigate(
          'Successfully updated your reply.',
          `/forum/threads/${this.reply.threadId}`
        );
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }

  bodyChange(text: string): void {
    this.reply.body = text;
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadSummary, UpdateThreadReq } from '../../models/forum.models';

@Component({
  selector: 'app-edit-thread',
  templateUrl: './edit-thread.component.html',
  styleUrls: ['./edit-thread.component.scss'],
})
export class EditThreadComponent implements OnInit {
  public thread: ThreadSummary;
  public submittingForm = false;

  constructor(
    private authService: AuthService,
    private forumService: ForumService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (!id || isNaN(parseInt(id))) {
        this.toastService.error('Invalid thread id.');
        return;
      }

      this.forumService.getThreadById(parseInt(id)).subscribe(
        (ts) => {
          if (this.authService.getToken()?.id !== ts.account.id) {
            this.toastService.error('Access denied. You can only edit your own threads.');
          } else {
            this.thread = ts;
          }
        },
        (err) => {
          this.toastService.httpError(err);
        }
      );
    });
  }

  onSubmit(): void {
    const req: UpdateThreadReq = {
      id: this.thread.id,
      title: this.thread.title !== undefined && this.thread.title !== null ? this.thread.title : undefined,
      body: this.thread.body !== undefined && this.thread.body !== null ? this.thread.body : undefined,
    };

    this.submittingForm = true;

    this.forumService.updateThread(req).subscribe(
      (thread) => {
        this.toastService.successAndNavigate('Successfully updated thread.', '/forum/threads/' + thread.id.toString());
      },
      (err) => {
        this.submittingForm = false;
        this.toastService.httpError(err);
      }
    );
  }

  bodyChange(text: string): void {
    this.thread.body = text;
  }
}

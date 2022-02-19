import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { ActivatedRoute } from '@angular/router';
import { ThreadSummary } from '../../models/forum.models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-thread',
  templateUrl: './edit-thread.component.html',
  styleUrls: ['./edit-thread.component.scss'],
})
export class EditThreadComponent implements OnInit {
  public thread: ThreadSummary;
  public editForm: FormGroup;
  public submittingForm = false;

  constructor(
    private authService: AuthService,
    private forumService: ForumService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
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
    return;
  }
}

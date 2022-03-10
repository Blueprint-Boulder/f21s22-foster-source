import { Component, Input, OnInit } from '@angular/core';
import { TopicSummary } from '../../models/forum.models';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  public isMod = false;
  public isAdmin = false;

  @Input() topic: TopicSummary;
  @Input() clickable = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private forumService: ForumService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.isMod = this.authService.isAtLeastMod();
    this.isAdmin = this.authService.isAdmin();
  }

  navigateToTopic(): void {
    if (this.topic !== undefined && this.clickable) {
      this.router.navigate([`/forum/topics/${this.topic.id}`]);
    }
  }

  deleteSelf(): void {
    const confirmAnswer = prompt(
      "Are you sure that you'd like to delete this topic? This action cannot be undone and all threads and responses that are related to this topic will be lost forever. To confirm, type 'confirm'"
    );
    if (confirmAnswer !== 'confirm') {
      this.toastService.info('Topic not deleted.');
      return;
    }

    this.forumService.deleteTopic(this.topic.id).subscribe(
      () => {
        this.toastService.success('Topic successfully deleted.');
        window.location.reload();
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }

  editSelf(): void {
    this.router.navigate([`/forum/edit-topic/${this.topic.id}`]);
  }
}

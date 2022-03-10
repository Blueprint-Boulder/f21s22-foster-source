import { Component, Input, OnInit } from '@angular/core';
import { ThreadSummary } from '../../models/forum.models';
import { ImageUtils } from '../../common/utils/ImageUtils';
import { Router } from '@angular/router';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-thread-summary',
  templateUrl: './thread-summary.component.html',
  styleUrls: ['./thread-summary.component.scss'],
})
export class ThreadSummaryComponent implements OnInit {
  public profileImageSrc = 'assets/images/blank-profile-photo.jpg';
  public userHasLiked = false;
  @Input() thread: ThreadSummary;

  constructor(private router: Router, private forumService: ForumService, private toastService: ToastService) {}

  ngOnInit(): void {
    if (this.thread) {
      console.log(this.thread);
      this.userHasLiked = this.thread.requesterHasLiked;
      this.generateProfileImageSrc();
    }
    return;
  }

  generateProfileImageSrc(): void {
    if (this.thread.account.privilege === 'MOD' || this.thread.account.privilege === 'ADMIN') {
      this.profileImageSrc = 'assets/images/modShield.png';
      return;
    }
    if (this.thread.account.profileSmallAwsKey) {
      this.profileImageSrc = ImageUtils.buildS3Url(this.thread.account.profileSmallAwsKey);
    }
  }
  imgError(): void {
    this.profileImageSrc = 'assets/images/blank-profile-photo.jpg';
  }

  navigateToThread(): void {
    if (this.thread !== undefined) {
      this.router.navigate([`/forum/threads/${this.thread.id}`]);
    }
  }

  likeUnlikeThread(): void {
    if (!this.userHasLiked) {
      this.forumService.likeThread(this.thread.id).subscribe(
        () => {
          this.userHasLiked = true;
          this.thread.likes += 1;
        },
        (err) => {
          this.toastService.httpError(err);
        }
      );
    } else {
      this.forumService.unlikeThread(this.thread.id).subscribe(
        () => {
          this.userHasLiked = false;
          this.thread.likes -= 1;
        },
        (err) => {
          this.toastService.httpError(err);
        }
      );
    }
  }
}

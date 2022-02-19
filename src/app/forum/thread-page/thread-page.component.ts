import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum-service/forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast-service/toast.service';
import { FullThread } from '../../models/forum.models';
import { formatDate } from '@angular/common';
import { AuthService } from '../../services/auth-service/auth.service';
import { ImageUtils } from '../../common/utils/ImageUtils';
import { ProfileService } from '../../services/profile-service/profile.service';

@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.scss'],
})
export class ThreadPageComponent implements OnInit {
  public readonly REPLY_LIMIT = 25;
  public resultPage = 0;
  public userHasLiked = false;
  public isMod = false;
  public profileImageSrc = 'assets/images/blank-profile-photo.jpg';
  public isOwnThread = false;

  public thread: FullThread;

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.isMod = this.authService.isAtLeastMod();
    this.generateProfileImageSrc();

    this.route.params.subscribe((params) => {
      const id = parseInt(params['id']);

      if (!id || isNaN(id)) {
        this.toastService.error('Invalid thread id.');
        return;
      }

      this.route.queryParamMap.subscribe((map) => {
        const replyOffset = map.get('replyOffset');
        if (replyOffset !== null && !isNaN(parseInt(replyOffset))) {
          this.resultPage = parseInt(replyOffset);
        }

        this.forumService
          .getThreadByIdWithReplies(
            id,
            this.REPLY_LIMIT,
            replyOffset === null ? 0 : isNaN(parseInt(replyOffset)) ? 0 : parseInt(replyOffset)
          )
          .subscribe(
            (ft) => {
              this.thread = ft;
              this.isOwnThread = this.authService.getToken()?.id === this.thread.account.id;
            },
            (err) => {
              this.toastService.httpError(err);
            }
          );
      });
    });
  }

  getParsedDate(): string {
    return formatDate(this.thread.updatedAt, 'MM/dd/yyyy - hh:mm', 'en-US');
  }

  changePage(newPage: number): void {
    this.router.navigate([`/forum/threads/${this.thread.id}`], {
      queryParams: { replyOffset: (newPage - 1) * this.REPLY_LIMIT },
    });
  }

  likeUnlikeThread(): void {
    if (!this.userHasLiked) {
      this.forumService.likeThread(this.thread.id).subscribe(
        () => {
          this.userHasLiked = true;
        },
        (err) => {
          this.toastService.httpError(err);
        }
      );
    } else {
      this.forumService.unlikeThread(this.thread.id).subscribe(
        () => {
          this.userHasLiked = false;
        },
        (err) => {
          this.toastService.httpError(err);
        }
      );
    }
  }

  generateProfileImageSrc(): void {
    if (this.isMod) {
      this.profileImageSrc = 'assets/images/modShield.png';
      return;
    }

    this.profileService.getProfileImages().subscribe(
      (images) => {
        this.profileImageSrc = ImageUtils.buildS3Url(images.profileSmallAwsKey);
      },
      (err) => {
        this.profileImageSrc = 'assets/images/blank-profile-photo.jpg';
      }
    );
  }

  reportThread(): void {
    alert('Well get this taken care of');
  }

  modRemoveThread(): void {
    alert('Removing thread');
  }

  imgError(): void {
    this.profileImageSrc = 'assets/images/blank-profile-photo.jpg';
  }

  visitProfile(): void {
    if (!this.thread.account.profileId) {
      return;
    }
    this.router.navigate([`/user/${this.thread.account.profileId}`]);
  }
}

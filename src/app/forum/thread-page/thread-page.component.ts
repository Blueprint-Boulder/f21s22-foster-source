import { FullThread, ModRemoveThreadReq, PostReplyReq, ReportThreadReq } from '../../models/forum.models';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { ForumService } from '../../services/forum-service/forum.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplyEvent } from '../thread-reply/thread-reply.component';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { formatDate, ViewportScroller } from '@angular/common';
import { ImageUtils } from '../../common/utils/ImageUtils';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.scss'],
})
export class ThreadPageComponent implements OnInit {
  // Pagination
  public readonly REPLY_LIMIT = 25;
  public resultPage = 0;

  // For determining how the user should interact with/see this thread
  public userHasLiked = false;
  public isMod = false;
  public isOwnThread = false;
  public profileImageSrc = 'assets/images/blank-profile-photo.jpg';

  // For if an administrator is inspecting a thread report.
  public inspectingReplyId: number;

  // For the report modal
  public reportDescription: string;
  public submittingReport = false;

  // For the moderation modal
  public removeForm: FormGroup;
  public shouldShowSuspendForm = false;
  public submittingRemove = false;

  // For constructing replies to the current thread
  public isReplyingToSomeone = false;
  public submittingReply = false;
  public replyReq: PostReplyReq;

  // Used to propagate all click events to child reply component
  // See: app-thread-reply for handler, addresses buggy behavior of text highlighting
  public clickEvent: EventEmitter<void> = new EventEmitter<void>();

  public thread: FullThread;

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.isMod = this.authService.isAtLeastMod();

    this.route.params.subscribe((params) => {
      const id = parseInt(params['id']);

      if (!id || isNaN(id)) {
        this.router.navigate(['/not-found']);
        return;
      }

      this.route.queryParamMap.subscribe((map) => {
        const replyOffset = map.get('replyOffset');
        if (replyOffset !== null && !isNaN(parseInt(replyOffset))) {
          this.resultPage = parseInt((parseInt(replyOffset) / this.REPLY_LIMIT).toString()) + 1;
        }

        const inspecting = map.get('inspecting');

        if (inspecting) {
          this.inspectingReplyId = parseInt(inspecting);
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

              this.generateProfileImageSrc();

              this.isOwnThread = this.authService.getToken()?.id === this.thread.account.id;
              this.userHasLiked = this.thread.requesterHasLiked;
              this.replyReq = {
                threadId: ft.id,
                body: '',
              };
            },
            (err) => {
              this.toastService.httpError(err);
              if (err?.error?.code === 404) {
                this.router.navigate(['/not-found']);
              }
            }
          );
      });
    });
  }

  getParsedDate(): string {
    return formatDate(this.thread.createdAt, 'MM/dd/yyyy - hh:mm', 'en-US');
  }

  changePage(newPage: number): void {
    this.router.navigate([`/forum/threads/${this.thread.id}`], {
      queryParams: { replyOffset: (newPage - 1) * this.REPLY_LIMIT },
      queryParamsHandling: 'merge',
    });
    this.scrollToTop();
  }

  goToLastPage(): void {
    const replyCount = parseInt(this.thread.replyCount.toString()) + 1;
    const lastPage = replyCount - (replyCount % this.REPLY_LIMIT);

    this.router.navigate([`/forum/threads/${this.thread.id}`], {
      queryParams: { replyOffset: lastPage },
      queryParamsHandling: 'merge',
    });
    this.scrollToTop();
  }

  likeUnlikeThread(): void {
    if (!this.userHasLiked) {
      this.forumService.likeThread(this.thread.id).subscribe(() => {
        this.userHasLiked = true;
        this.thread.likes += 1;
      }, this.toastService.httpError);
    } else {
      this.forumService.unlikeThread(this.thread.id).subscribe(() => {
        this.userHasLiked = false;
        this.thread.likes -= 1;
      }, this.toastService.httpError);
    }
  }

  generateProfileImageSrc(): void {
    if (this.thread.account.privilege === 'MOD' || this.thread.account.privilege === 'ADMIN') {
      this.profileImageSrc = 'assets/images/modShield.png';
      return;
    }

    this.profileService.getProfileImages().subscribe((images) => {
      this.profileImageSrc = ImageUtils.buildS3Url(images.profileSmallAwsKey);
    });
  }

  reportThread(): void {
    this.submittingReport = true;

    const req: ReportThreadReq = {
      id: this.thread.id,
      description: this.reportDescription,
    };

    this.forumService.reportThread(req).subscribe(
      () => {
        this.toastService.success('Thank you for submitting your report, staff will look into it shortly.');
        this.submittingReport = false;
        this.modalService.dismissAll();
        this.resetForms();
      },
      (err) => {
        this.toastService.httpError(err);
        this.submittingReport = false;
      }
    );
  }

  modRemoveThread(): void {
    if (this.removeForm.invalid) {
      this.removeForm.markAllAsTouched();
      return;
    }

    if (
      this.removeForm.get('adminAction')?.value === 'blacklist' &&
      prompt(
        'Are you certain you\'d like to blacklist this user? Their account (along with all associated forum posts and replies) will be deleted and they will be unable to reapply. To verify that this is the correct action, type "confirm"'
      ) !== 'confirm'
    ) {
      return;
    }

    this.submittingRemove = true;

    const req: ModRemoveThreadReq = {
      id: this.thread.id,
      reason: this.removeForm.get('reason')!.value,
      shouldBlacklist: this.removeForm.get('adminAction')!.value === 'blacklist' ? true : undefined,
      shouldSuspend: this.removeForm.get('adminAction')!.value === 'suspend' ? true : undefined,
      suspendForDays:
        this.removeForm.get('adminAction')!.value === 'suspend' && this.removeForm.get('suspendForDays')!.value
          ? this.removeForm.get('suspendForDays')!.value
          : undefined,
    };

    this.forumService.modRemoveThread(req).subscribe(
      () => {
        this.modalService.dismissAll();
        this.submittingRemove = false;
        this.toastService.successAndNavigate('Successfully removed the thread.', '/forum');
      },
      (err) => {
        this.toastService.httpError(err);
        this.submittingRemove = false;
      }
    );
  }

  imgError(): void {
    this.profileImageSrc = 'assets/images/blank-profile-photo.jpg';
  }

  visitProfile(): void {
    if (!this.thread.account.profileId) {
      this.toastService.info('This user does not have a profile.');
      return;
    }
    this.router.navigate([`/user/${this.thread.account.profileId}`]);
  }

  openModal(modal: any): void {
    this.modalService.open(modal, {
      backdropClass: 'modal-background',
    });

    this.resetForms();
  }

  private resetForms(): void {
    this.reportDescription = '';

    this.removeForm = this.formBuilder.group({
      reason: [null, Validators.required],
      adminAction: [null, Validators.required],
      suspendForDays: [null, Validators.min(1)],
    });

    this.removeForm.get('adminAction')?.valueChanges.subscribe((value) => {
      if (value === 'suspend') {
        this.removeForm.get('suspendForDays')?.addValidators(Validators.required);
        this.shouldShowSuspendForm = true;
      } else {
        this.removeForm.get('suspendForDays')?.removeValidators(Validators.required);
        this.shouldShowSuspendForm = false;
      }
      this.removeForm.get('suspendForDays')?.updateValueAndValidity();
    });
  }

  removeOwnThread(): void {
    if (
      !(
        prompt(
          'Are you sure that you\'d like to delete your thread? This action cannot be undone, and the thread (along with all its associated replies) will be lost forever. To continue, type "confirm"'
        ) === 'confirm'
      )
    ) {
      return;
    }

    this.forumService.removeOwnThread(this.thread.id).subscribe(() => {
      this.modalService.dismissAll();
      this.toastService.successAndNavigate('Successfully deleted thread.', '/forum');
    }, this.toastService.httpError);
  }

  submitReply(): void {
    this.submittingReply = true;

    this.forumService.postReply(this.replyReq).subscribe(
      (res) => {
        this.toastService.success('Successfully posted reply.');
        this.submittingReply = false;

        this.thread.replies.push(res);
        this.thread.replyCount = parseInt(this.thread.replyCount.toString()) + 1;

        this.fullyClearReplyForm();
        this.goToLastPage();
      },
      (err) => {
        this.toastService.httpError(err);
        this.submittingReply = false;
      }
    );
  }

  replyChange(text: string): void {
    this.replyReq.body = text;
  }

  scrollTo(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  fullyClearReplyForm(): void {
    this.isReplyingToSomeone = false;
    this.replyReq.replyingToUsername = undefined;
    this.replyReq.replyingToText = undefined;
    this.replyReq.body = '';
  }

  // From stackoverflow
  private scrollToTop(): void {
    (function smoothScroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothScroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

  replyToReplyEvent(event: ReplyEvent): void {
    this.isReplyingToSomeone = true;
    this.replyReq = {
      threadId: this.thread.id,
      replyingToUsername: event.replyingToUsername,
      replyingToText: event.replyingToText,
      body: '',
    };
    this.scrollTo('reply-section');
  }

  getPageCount(): number {
    return Math.ceil(this.thread.replyCount / this.REPLY_LIMIT);
  }

  goToTopic(): void {
    this.router.navigate(['/forum/topics/' + this.thread.topicId]);
  }
}

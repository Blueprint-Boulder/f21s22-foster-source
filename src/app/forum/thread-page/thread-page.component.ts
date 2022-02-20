import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum-service/forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast-service/toast.service';
import { FullThread, ModRemoveThreadReq, ReportThreadReq } from '../../models/forum.models';
import { formatDate } from '@angular/common';
import { AuthService } from '../../services/auth-service/auth.service';
import { ImageUtils } from '../../common/utils/ImageUtils';
import { ProfileService } from '../../services/profile-service/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public reportDescription: string;
  public submittingReport = false;

  public removeForm: FormGroup;
  public shouldShowSuspendForm = false;
  public submittingRemove = false;

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
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
              console.log(ft);
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
    this.submittingReport = true;
    const req: ReportThreadReq = {
      id: this.thread.id,
      description: this.reportDescription,
    };
    this.forumService.reportThread(req).subscribe(
      () => {
        this.toastService.success('Thank you for submitting your report, staff will look into it shortly.');
        this.reportDescription = '';
        this.modalService.dismissAll();
        this.submittingReport = false;
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
        this.toastService.success('Successfully removed the thread.');
        this.router.navigate(['/forum']);
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

    this.forumService.removeOwnThread(this.thread.id).subscribe(
      () => {
        this.toastService.success('Successfully deleted thread.');
        this.router.navigate(['/forum']);
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }
}

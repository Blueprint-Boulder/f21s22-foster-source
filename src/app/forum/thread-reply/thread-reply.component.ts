import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ModRemoveReplyReq,
  ModRemoveThreadReq,
  Reply,
  ReportReplyReq,
  ReportThreadReq,
} from '../../models/forum.models';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageUtils } from '../../common/utils/ImageUtils';

export interface ReplyEvent {
  replyingToUsername: string;
  replyingToText: string;
}

@Component({
  selector: 'app-thread-reply',
  templateUrl: './thread-reply.component.html',
  styleUrls: ['./thread-reply.component.scss'],
})
export class ThreadReplyComponent implements OnInit {
  public profileImageSrc = 'assets/images/blank-profile-photo.jpg';
  public userHasLiked = false;
  public isOwnReply = false;
  public textSelected = false;
  public reportDescription: string;
  public submittingReport = false;
  public isMod = false;

  public removeForm: FormGroup;
  public shouldShowSuspendForm = false;
  public submittingRemove = false;

  @Input() reply: Reply;
  @Input() author: string;

  @Output() replyEvent: EventEmitter<ReplyEvent> = new EventEmitter<ReplyEvent>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private forumService: ForumService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.reply) {
      this.isOwnReply = this.authService.getToken()?.id === this.reply.account.id;
      this.userHasLiked = this.reply.requesterHasLiked;
      this.isMod = this.authService.isAtLeastMod();
      this.generateProfileImageSrc();
    }
  }
  getParsedDate(): string {
    return formatDate(this.reply.createdAt, 'MM/dd/yyyy - hh:mm', 'en-US');
  }

  visitProfile(): void {
    if (!this.reply.account.profileId) {
      return;
    }
    this.router.navigate([`/user/${this.reply.account.profileId}`]);
  }

  imgError(): void {
    this.profileImageSrc = 'assets/images/blank-profile-photo.jpg';
  }

  likeUnlikeReply(): void {
    if (!this.userHasLiked) {
      this.forumService.likeReply(this.reply.threadId, this.reply.id).subscribe(
        () => {
          this.userHasLiked = true;
          this.reply.likes += 1;
        },
        (err) => {
          this.toastService.httpError(err);
        }
      );
    } else {
      this.forumService.unlikeReply(this.reply.threadId, this.reply.id).subscribe(
        () => {
          this.userHasLiked = false;
          this.reply.likes -= 1;
        },
        (err) => {
          this.toastService.httpError(err);
        }
      );
    }
  }

  clickReply() {
    this.replyEvent.emit({
      replyingToUsername: this.reply.account.username,
      replyingToText: this.reply.body,
    });
  }

  removeOwnReply(): void {
    if (
      !(
        prompt(
          'Are you sure that you\'d like to delete your reply? This action cannot be undone, and the reply will be lost forever. To continue, type "confirm"'
        ) === 'confirm'
      )
    ) {
      return;
    }

    this.forumService.deleteReply(this.reply.threadId, this.reply.id).subscribe(
      () => {
        this.toastService.success('Successfully deleted reply.');
        this.modalService.dismissAll();
        this.router.navigate([`/forum/threads/${this.reply.threadId}`]);
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }

  clicked(event: Event): void {
    const e = event as PointerEvent;
    if (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      !e.composedPath()[0].classList.contains('inner-text')
    ) {
      this.textSelected = false;
    }
  }

  getSelectedText() {
    let text = '';
    if (typeof window.getSelection !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      text = window.getSelection().toString();
      // eslint-disable-next-line eqeqeq
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    } else if (typeof document.selection !== 'undefined' && document.selection.type === 'Text') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      text = document.selection.createRange().text;
    }
    return text;
  }

  doSomethingWithSelectedText() {
    const selectedText = this.getSelectedText();
    if (selectedText) {
      this.textSelected = true;
    } else {
      this.textSelected = false;
    }
  }

  replyToSelected(): void {
    if (this.getSelectedText()) {
      this.replyEvent.emit({
        replyingToUsername: this.reply.account.username,
        replyingToText: this.getSelectedText(),
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getSelection().removeAllRanges();
    }
  }

  reportReply(): void {
    this.submittingReport = true;
    const req: ReportReplyReq = {
      threadId: this.reply.threadId,
      replyId: this.reply.id,
      description: this.reportDescription,
    };
    this.forumService.reportReply(req).subscribe(
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

  openModal(modal: any): void {
    this.modalService.open(modal, {
      backdropClass: 'modal-background',
    });
    this.resetForms();
  }

  resetForms(): void {
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

  modRemoveReply(): void {
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

    const req: ModRemoveReplyReq = {
      threadId: this.reply.threadId,
      replyId: this.reply.id,
      reason: this.removeForm.get('reason')!.value,
      shouldBlacklist: this.removeForm.get('adminAction')!.value === 'blacklist' ? true : undefined,
      shouldSuspend: this.removeForm.get('adminAction')!.value === 'suspend' ? true : undefined,
      suspendForDays:
        this.removeForm.get('adminAction')!.value === 'suspend' && this.removeForm.get('suspendForDays')!.value
          ? this.removeForm.get('suspendForDays')!.value
          : undefined,
    };

    this.forumService.modRemoveReply(req).subscribe(
      () => {
        this.toastService.success('Successfully removed the reply.');
        this.router.navigate([`/forum/threads/${this.reply.threadId}`]);
        this.modalService.dismissAll();
        this.submittingRemove = false;
      },
      (err) => {
        this.toastService.httpError(err);
        this.submittingRemove = false;
      }
    );
  }

  generateProfileImageSrc(): void {
    if (this.reply.account.privilege === 'MOD' || this.reply.account.privilege === 'ADMIN') {
      this.profileImageSrc = 'assets/images/modShield.png';
      return;
    }

    this.profileImageSrc = ImageUtils.buildS3Url(this.reply.account.profileSmallAwsKey);
  }
}

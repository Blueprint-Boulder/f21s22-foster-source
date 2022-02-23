import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reply, ReportReplyReq, ReportThreadReq } from '../../models/forum.models';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  @Input() reply: Reply;
  @Input() author: string;

  @Output() replyEvent: EventEmitter<ReplyEvent> = new EventEmitter<ReplyEvent>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private forumService: ForumService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if (this.reply) {
      this.isOwnReply = this.authService.getToken()?.id === this.reply.account.id;
      this.userHasLiked = this.reply.requesterHasLiked;
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
    return;
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

    this.reportDescription = '';
  }
}

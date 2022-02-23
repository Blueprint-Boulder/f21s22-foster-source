import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reply } from '../../models/forum.models';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

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

  @Input() reply: Reply;
  @Input() author: string;

  @Output() replyEvent: EventEmitter<ReplyEvent> = new EventEmitter<ReplyEvent>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    return;
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
    this.userHasLiked = !this.userHasLiked;
  }

  clickReply() {
    this.replyEvent.emit({
      replyingToUsername: this.reply.account.username,
      replyingToText: this.reply.body,
    });
  }
}

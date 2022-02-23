import { Component, Input, OnInit } from '@angular/core';
import { Reply } from '../../models/forum.models';

@Component({
  selector: 'app-thread-reply',
  templateUrl: './thread-reply.component.html',
  styleUrls: ['./thread-reply.component.scss'],
})
export class ThreadReplyComponent implements OnInit {
  @Input() reply: Reply;
  ngOnInit(): void {
    return;
  }
}

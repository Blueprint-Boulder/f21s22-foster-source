import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ThreadReplyComponent } from './thread-reply/thread-reply.component';
import { ForumComponent } from './forum/forum.component';

@NgModule({
  declarations: [ThreadReplyComponent, ForumComponent],
  imports: [CommonModule, ForumRoutingModule],
})
export class ForumModule {}

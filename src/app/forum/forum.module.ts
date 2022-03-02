import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ThreadReplyComponent } from './thread-reply/thread-reply.component';
import { ForumComponent } from './forum/forum.component';
import { TopicComponent } from './topic/topic.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThreadSummaryComponent } from './thread-summary/thread-summary.component';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ThreadReplyComponent,
    ForumComponent,
    TopicComponent,
    CreateTopicComponent,
    ThreadSummaryComponent,
    TopicPageComponent,
  ],
  imports: [CommonModule, ForumRoutingModule, ReactiveFormsModule, RouterModule, NgbPaginationModule],
})
export class ForumModule {}

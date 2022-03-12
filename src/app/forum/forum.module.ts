import { CommonComponentsModule } from '../common-components/common-components.module';
import { CreateThreadComponent } from './create-thread/create-thread.component';
import { ThreadReplyComponent } from './thread-reply/thread-reply.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { ThreadPageComponent } from './thread-page/thread-page.component';
import { EditThreadComponent } from './edit-thread/edit-thread.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ForumRoutingModule } from './forum-routing.module';
import { TopicComponent } from './topic/topic.component';
import { ForumComponent } from './forum/forum.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { NgModule } from '@angular/core';
import { ThreadSummaryComponent } from './thread-summary/thread-summary.component';

@NgModule({
  declarations: [
    ThreadReplyComponent,
    ForumComponent,
    TopicComponent,
    CreateTopicComponent,
    EditTopicComponent,
    ThreadPageComponent,
    ThreadSummaryComponent,
    EditThreadComponent,
    CreateThreadComponent,
    TopicPageComponent,
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    NgbPaginationModule,
    FormsModule,
    NgxEditorModule,
    CommonComponentsModule,
  ],
})
export class ForumModule {}

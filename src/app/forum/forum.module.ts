import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ThreadReplyComponent } from './thread-reply/thread-reply.component';
import { ForumComponent } from './forum/forum.component';
import { TopicComponent } from './topic/topic.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { ThreadPageComponent } from './thread-page/thread-page.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EditThreadComponent } from './edit-thread/edit-thread.component';
import { NgxEditorModule } from 'ngx-editor';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { CreateThreadComponent } from './create-thread/create-thread.component';

@NgModule({
  declarations: [
    ThreadReplyComponent,
    ForumComponent,
    TopicComponent,
    CreateTopicComponent,
    EditTopicComponent,
    ThreadPageComponent,
    EditThreadComponent,
    CreateThreadComponent,
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

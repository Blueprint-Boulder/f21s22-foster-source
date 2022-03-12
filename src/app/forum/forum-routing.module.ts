import { CreateThreadComponent } from './create-thread/create-thread.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { EditThreadComponent } from './edit-thread/edit-thread.component';
import { ThreadPageComponent } from './thread-page/thread-page.component';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { LoggedInGuard } from '../guards/logged-in/logged-in.guard';
import { ForumComponent } from './forum/forum.component';
import { RouterModule, Routes } from '@angular/router';
import { ModGuard } from '../guards/mod/mod.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ForumComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'topics',
    component: ForumComponent,
  },
  {
    path: 'create-topic',
    component: CreateTopicComponent,
    canActivate: [ModGuard],
  },
  {
    path: 'edit-topic/:id',
    component: EditTopicComponent,
    canActivate: [ModGuard],
  },
  {
    path: 'create-thread',
    component: CreateThreadComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'threads/:id',
    component: ThreadPageComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'edit-thread/:id',
    component: EditThreadComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'topics/:id',
    component: TopicPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumRoutingModule {}

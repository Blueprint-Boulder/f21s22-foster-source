import { CreateTopicComponent } from './create-topic/create-topic.component';
import { ForumComponent } from './forum/forum.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TopicPageComponent } from './topic-page/topic-page.component';

const routes: Routes = [
  {
    path: '',
    component: ForumComponent,
  },
  {
    path: 'topics',
    component: ForumComponent,
  },
  {
    path: 'create-topic',
    component: CreateTopicComponent,
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

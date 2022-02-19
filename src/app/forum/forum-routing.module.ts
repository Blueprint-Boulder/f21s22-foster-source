import { CreateTopicComponent } from './create-topic/create-topic.component';
import { ForumComponent } from './forum/forum.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoggedInGuard } from '../guards/logged-in/logged-in.guard';
import { ModGuard } from '../guards/mod/mod.guard';
import { EditTopicComponent } from './edit-topic/edit-topic.component';

const routes: Routes = [
  {
    path: '',
    component: ForumComponent,
    canActivate: [LoggedInGuard],
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumRoutingModule {}

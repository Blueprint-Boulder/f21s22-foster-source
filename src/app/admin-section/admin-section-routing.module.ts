import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserActionTableComponent } from './user-action-table/user-action-table.component';
import { BlacklistTableComponent } from './blacklist-table/blacklist-table.component';
import { AnnouncementsComponent } from './announcements/announcements.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: '',
        component: UserActionTableComponent,
      },
      {
        path: 'blacklist',
        component: BlacklistTableComponent,
      },
      {
        path: 'announcements',
        component: AnnouncementsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSectionRoutingModule {}

import { StaffAccountRequestsComponent } from './staff-account-requests/staff-account-requests.component';
import { UserActionTableComponent } from './user-action-table/user-action-table.component';
import { BlacklistTableComponent } from './blacklist-table/blacklist-table.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { BugReportsComponent } from './bug-reports/bug-reports.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminGuard } from '../guards/admin/admin.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ThreadReportsComponent } from './thread-reports/thread-reports.component';
import { ReplyReportsComponent } from './reply-reports/reply-reports.component';
import { ProfileReportsComponent } from './profile-reports/profile-reports.component';

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
      {
        path: 'staff-requests',
        component: StaffAccountRequestsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'bug-reports',
        component: BugReportsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'thread-reports',
        component: ThreadReportsComponent,
      },
      {
        path: 'reply-reports',
        component: ReplyReportsComponent,
      },
      {
        path: 'profile-reports',
        component: ProfileReportsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSectionRoutingModule {}

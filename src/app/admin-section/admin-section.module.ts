import { StaffAccountRequestsComponent } from './staff-account-requests/staff-account-requests.component';
import { UserActionTableComponent } from './user-action-table/user-action-table.component';
import { BlacklistTableComponent } from './blacklist-table/blacklist-table.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AdminSectionRoutingModule } from './admin-section-routing.module';
import { BugReportsComponent } from './bug-reports/bug-reports.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingModule } from '../landing/landing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ThreadReportsComponent } from './thread-reports/thread-reports.component';
import { ReplyReportsComponent } from './reply-reports/reply-reports.component';
import { ProfileReportsComponent } from './profile-reports/profile-reports.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    UserActionTableComponent,
    BlacklistTableComponent,
    AnnouncementsComponent,
    StaffAccountRequestsComponent,
    BugReportsComponent,
    ThreadReportsComponent,
    ReplyReportsComponent,
    ProfileReportsComponent,
  ],
  imports: [
    CommonModule,
    AdminSectionRoutingModule,
    NgbCollapseModule,
    ReactiveFormsModule,
    FormsModule,
    LandingModule,
    CommonComponentsModule,
  ],
})
export class AdminSectionModule {}

import { StaffAccountRequestsComponent } from './staff-account-requests/staff-account-requests.component';
import { UserActionTableComponent } from './user-action-table/user-action-table.component';
import { BlacklistTableComponent } from './blacklist-table/blacklist-table.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AdminSectionRoutingModule } from './admin-section-routing.module';
import { BugReportsComponent } from './bug-reports/bug-reports.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { EditorComponent } from '../common/editor/editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingModule } from '../landing/landing.module';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AdminPageComponent,
    UserActionTableComponent,
    BlacklistTableComponent,
    AnnouncementsComponent,
    EditorComponent,
    StaffAccountRequestsComponent,
    BugReportsComponent,
  ],
  imports: [
    CommonModule,
    AdminSectionRoutingModule,
    NgbCollapseModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEditorModule,
    LandingModule,
  ],
})
export class AdminSectionModule {}

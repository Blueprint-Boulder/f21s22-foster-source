import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserActionTableComponent } from './user-action-table/user-action-table.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSectionRoutingModule } from './admin-section-routing.module';
import { BlacklistTableComponent } from './blacklist-table/blacklist-table.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { EditorComponent } from '../common/editor/editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { LandingModule } from '../landing/landing.module';
import { StaffAccountRequestsComponent } from './staff-account-requests/staff-account-requests.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    UserActionTableComponent,
    BlacklistTableComponent,
    AnnouncementsComponent,
    EditorComponent,
    StaffAccountRequestsComponent,
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

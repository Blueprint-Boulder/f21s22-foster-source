import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../login/login-page/login-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserActionTableComponent } from './user-action-table/user-action-table.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminSectionRoutingModule } from './admin-section-routing.module';
import { BlacklistTableComponent } from './blacklist-table/blacklist-table.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    UserActionTableComponent,
    BlacklistTableComponent,
  ],
  imports: [
    CommonModule,
    AdminSectionRoutingModule,
    NgbCollapseModule,
    ReactiveFormsModule,
  ],
})
export class AdminSectionModule {}

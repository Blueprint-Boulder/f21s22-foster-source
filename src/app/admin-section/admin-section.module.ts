import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../login/login-page/login-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserActionTableComponent } from './user-action-table/user-action-table.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
  },
];

export const adminRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [AdminPageComponent, UserActionTableComponent],
  imports: [CommonModule, adminRouting, NgbCollapseModule, ReactiveFormsModule],
})
export class AdminSectionModule {}

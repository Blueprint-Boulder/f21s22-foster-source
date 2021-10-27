import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountPageComponent } from './create-account-page/create-account-page.component';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CreateAccountPageComponent,
  },
];

export const createAccountRouting = RouterModule.forChild(routes);
@NgModule({
  declarations: [CreateAccountPageComponent, CreateAccountModalComponent],
  imports: [CommonModule, createAccountRouting, ReactiveFormsModule],
})
export class CreateAccountModule {}

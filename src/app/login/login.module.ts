import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountPageComponent } from './create-account-page/create-account-page.component';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'create-account',
    component: CreateAccountPageComponent,
  },
];

export const loginRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginModalComponent,
    CreateAccountPageComponent,
    CreateAccountModalComponent,
  ],
  imports: [CommonModule, loginRouting, FormsModule, ReactiveFormsModule],
  exports: [],
})
export class LoginModule {}

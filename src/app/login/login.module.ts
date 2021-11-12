import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountPageComponent } from './create-account-page/create-account-page.component';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'create-account',
    component: CreateAccountPageComponent,
  },
  {
    path: 'create-account/verify/:email',
    component: VerifyEmailComponent,
  },
];

export const loginRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginModalComponent,
    CreateAccountPageComponent,
    CreateAccountModalComponent,
    VerifyEmailComponent,
  ],
  imports: [
    CommonModule,
    loginRouting,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [],
})
export class LoginModule {}

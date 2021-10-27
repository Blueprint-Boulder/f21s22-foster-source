import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
];

export const loginRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [LoginPageComponent, LoginModalComponent],
  imports: [CommonModule, loginRouting, ReactiveFormsModule],
})
export class LoginModule {}

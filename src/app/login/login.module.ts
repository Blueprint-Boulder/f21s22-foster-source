import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
];

export const loginRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, loginRouting],
})
export class LoginModule {}

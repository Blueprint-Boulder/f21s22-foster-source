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
import { FinishAccountPageComponent } from './finish-account-page/finish-account-page.component';
import { FinishAccountModalComponent } from './finish-account-modal/finish-account-modal.component';
import { DayAvailabilityInputComponent } from './day-availability-input/day-availability-input.component';
import { ProfileImageUploadComponent } from './profile-image-upload/profile-image-upload.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { VerifyEmailActionComponent } from './verify-email-action/verify-email-action.component';
import { ModRegisterComponent } from './mod-register/mod-register.component';
import { ProfileNotCompletedGuard } from '../guards/profile-not-completed/profile-not-completed.guard';

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
  {
    path: 'complete-profile',
    component: FinishAccountPageComponent,
    canActivate: [ProfileNotCompletedGuard],
  },
  {
    path: 'verify',
    component: VerifyEmailActionComponent,
  },
  {
    path: 'create-account/staff',
    component: ModRegisterComponent,
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
    FinishAccountPageComponent,
    FinishAccountModalComponent,
    DayAvailabilityInputComponent,
    ProfileImageUploadComponent,
    VerifyEmailActionComponent,
    ModRegisterComponent,
  ],
  imports: [CommonModule, loginRouting, FormsModule, ReactiveFormsModule, NgbModule, ImageCropperModule],
  exports: [],
})
export class LoginModule {}

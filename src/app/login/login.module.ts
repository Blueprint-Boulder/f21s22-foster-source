import { ProfileNotCompletedGuard } from '../guards/profile-not-completed/profile-not-completed.guard';
import { ProfileImageUploadComponent } from './profile-image-upload/profile-image-upload.component';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';
import { FinishAccountModalComponent } from './finish-account-modal/finish-account-modal.component';
import { CreateAccountPageComponent } from './create-account-page/create-account-page.component';
import { FinishAccountPageComponent } from './finish-account-page/finish-account-page.component';
import { VerifyEmailActionComponent } from './verify-email-action/verify-email-action.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ModRegisterComponent } from './mod-register/mod-register.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasswordRecoveryChangeComponent } from './password-recovery-change/password-recovery-change.component';

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
  {
    path: 'recovery/update-password',
    component: PasswordRecoveryChangeComponent,
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
    ProfileImageUploadComponent,
    VerifyEmailActionComponent,
    ModRegisterComponent,
    PasswordRecoveryChangeComponent,
  ],
  imports: [
    CommonModule,
    loginRouting,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ImageCropperModule,
    CommonComponentsModule,
  ],
  exports: [],
})
export class LoginModule {}

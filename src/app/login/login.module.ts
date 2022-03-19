import { ForgotPasswordConfirmationComponent } from './forgot-password-confirmation/forgot-password-confirmation.component';
import { PasswordRecoveryChangeComponent } from './password-recovery-change/password-recovery-change.component';
import { ProfileNotCompletedGuard } from '../guards/profile-not-completed/profile-not-completed.guard';
import { ProfileImageUploadComponent } from './profile-image-upload/profile-image-upload.component';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';
import { FinishAccountModalComponent } from './finish-account-modal/finish-account-modal.component';
import { FinishAccountPageComponent } from './finish-account-page/finish-account-page.component';
import { VerifyEmailActionComponent } from './verify-email-action/verify-email-action.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ModRegisterComponent } from './mod-register/mod-register.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LoginModalComponent,
  },
  {
    path: 'create-account',
    component: CreateAccountModalComponent,
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
  {
    path: 'recovery',
    component: ForgotPasswordComponent,
  },
  {
    path: 'recovery/confirmation',
    component: ForgotPasswordConfirmationComponent,
  },
];

export const loginRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    CreateAccountModalComponent,
    VerifyEmailComponent,
    FinishAccountPageComponent,
    FinishAccountModalComponent,
    ProfileImageUploadComponent,
    VerifyEmailActionComponent,
    ModRegisterComponent,
    LoginModalComponent,
    PasswordRecoveryChangeComponent,
    ForgotPasswordComponent,
    ForgotPasswordConfirmationComponent,
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
  exports: [ProfileImageUploadComponent],
})
export class LoginModule {}

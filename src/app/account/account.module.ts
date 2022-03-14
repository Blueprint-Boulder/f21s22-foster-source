import { UpdateCaseWorkerComponent } from './update-case-worker/update-case-worker.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { UpdatePhoneComponent } from './update-phone/update-phone.component';
import { AccountRoutingModule } from './account-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AccountPageComponent,
    ChangePasswordComponent,
    DeleteAccountComponent,
    UpdateAddressComponent,
    UpdatePhoneComponent,
    UpdateCaseWorkerComponent,
  ],
  imports: [CommonModule, AccountRoutingModule, ReactiveFormsModule, CommonComponentsModule],
})
export class AccountModule {}

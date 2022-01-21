import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { UpdatePhoneComponent } from './update-phone/update-phone.component';
import { UpdateCaseWorkerComponent } from './update-case-worker/update-case-worker.component';

const routes: Routes = [
  {
    path: '',
    component: AccountPageComponent,
  },
  {
    path: 'delete-account',
    component: DeleteAccountComponent,
  },
  {
    path: 'update/password',
    component: ChangePasswordComponent,
  },
  {
    path: 'update/address',
    component: UpdateAddressComponent,
  },
  {
    path: 'update/phone-number',
    component: UpdatePhoneComponent,
  },
  {
    path: 'update/case-worker-info',
    component: UpdateCaseWorkerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}

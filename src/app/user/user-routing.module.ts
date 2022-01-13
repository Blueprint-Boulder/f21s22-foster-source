import { UpdateSecondaryAccountHolderComponent } from './update-secondary-account-holder/update-secondary-account-holder.component';
import { CreateSecondaryAccountHolderComponent } from './create-secondary-account-holder/create-secondary-account-holder.component';
import { UpdateHouseholdBackgroundComponent } from './update-household-background/update-household-background.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'update/profile',
    component: UpdateProfileComponent,
  },
  {
    path: 'update/household-background',
    component: UpdateHouseholdBackgroundComponent,
  },
  {
    path: 'update/secondary-account-holder',
    component: UpdateSecondaryAccountHolderComponent,
  },
  {
    path: 'create/secondary-account-holder',
    component: CreateSecondaryAccountHolderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

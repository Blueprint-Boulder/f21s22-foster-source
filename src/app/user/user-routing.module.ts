import { UpdateSecondaryAccountHolderComponent } from './update-secondary-account-holder/update-secondary-account-holder.component';
import { CreateSecondaryAccountHolderComponent } from './create-secondary-account-holder/create-secondary-account-holder.component';
import { UpdateRespiteProviderInfoComponent } from './update-respite-provider-info/update-respite-provider-info.component';
import { UpdateHouseholdBackgroundComponent } from './update-household-background/update-household-background.component';
import { UpdatePrimaryAvailabilityComponent } from './update-primary-availability/update-primary-availability.component';
import { UpdateRespiteBackgroundComponent } from './update-respite-background/update-respite-background.component';
import { AddRespiteProviderInfoComponent } from './add-respite-provider-info/add-respite-provider-info.component';
import { ModifyTempAvailabilityComponent } from './modify-temp-availability/modify-temp-availability.component';
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
    path: 'update/respite-background',
    component: UpdateRespiteBackgroundComponent,
  },
  {
    path: 'update/respite-provider-info',
    component: UpdateRespiteProviderInfoComponent,
  },
  {
    path: 'update/primary-availability',
    component: UpdatePrimaryAvailabilityComponent,
  },
  {
    path: 'update/temporary-availability',
    component: ModifyTempAvailabilityComponent,
  },
  {
    path: 'create/secondary-account-holder',
    component: CreateSecondaryAccountHolderComponent,
  },
  {
    path: 'create/respite-provider-info',
    component: AddRespiteProviderInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

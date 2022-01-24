import { UpdateSecondaryAccountHolderComponent } from './update-secondary-account-holder/update-secondary-account-holder.component';
import { CreateSecondaryAccountHolderComponent } from './create-secondary-account-holder/create-secondary-account-holder.component';
import { UpdateRespiteProviderInfoComponent } from './update-respite-provider-info/update-respite-provider-info.component';
import { UpdateHouseholdBackgroundComponent } from './update-household-background/update-household-background.component';
import { UpdatePrimaryAvailabilityComponent } from './update-primary-availability/update-primary-availability.component';
import { UpdateProfileCollectionComponent } from './update-profile-collection/update-profile-collection.component';
import { UpdateRespiteBackgroundComponent } from './update-respite-background/update-respite-background.component';
import { AddRespiteProviderInfoComponent } from './add-respite-provider-info/add-respite-provider-info.component';
import { ModifyTempAvailabilityComponent } from './modify-temp-availability/modify-temp-availability.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { PureUserGuard } from '../guards/pure-user/pure-user.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'update',
    component: UpdateProfileCollectionComponent,
    canActivate: [PureUserGuard],
  },
  {
    path: 'update/profile',
    component: UpdateProfileComponent,
    canActivate: [PureUserGuard],
  },
  {
    path: 'update/household-background',
    component: UpdateHouseholdBackgroundComponent,
    canActivate: [PureUserGuard],
  },
  {
    path: 'update/secondary-account-holder',
    component: UpdateSecondaryAccountHolderComponent,
    canActivate: [PureUserGuard],
  },
  {
    path: 'update/respite-background',
    component: UpdateRespiteBackgroundComponent,
    canActivate: [PureUserGuard],
  },
  {
    path: 'update/respite-provider-info',
    component: UpdateRespiteProviderInfoComponent,
    canActivate: [PureUserGuard],
  },
  {
    path: 'update/primary-availability',
    component: UpdatePrimaryAvailabilityComponent,
    canActivate: [PureUserGuard],
  },
  {
    path: 'update/temporary-availability',
    component: ModifyTempAvailabilityComponent,
    canActivate: [PureUserGuard],
  },
  {
    path: 'create/secondary-account-holder',
    component: CreateSecondaryAccountHolderComponent,
    canActivate: [PureUserGuard],
  },
  {
    path: 'create/respite-provider-info',
    component: AddRespiteProviderInfoComponent,
    canActivate: [PureUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

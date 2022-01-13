import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UpdateHouseholdBackgroundComponent } from './update-household-background/update-household-background.component';
import { UpdateSecondaryAccountHolderComponent } from './update-secondary-account-holder/update-secondary-account-holder.component';
import { CreateSecondaryAccountHolderComponent } from './create-secondary-account-holder/create-secondary-account-holder.component';
import { AddRespiteProviderInfoComponent } from './add-respite-provider-info/add-respite-provider-info.component';
import { CommonComponentsModule } from '../common-components/common-components.module';

@NgModule({
  declarations: [
    UpdateProfileComponent,
    UpdateHouseholdBackgroundComponent,
    UpdateSecondaryAccountHolderComponent,
    CreateSecondaryAccountHolderComponent,
    AddRespiteProviderInfoComponent,
  ],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule, CommonComponentsModule],
})
export class UserModule {}

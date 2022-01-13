import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UpdateHouseholdBackgroundComponent } from './update-household-background/update-household-background.component';
import { UpdateSecondaryAccountHolderComponent } from './update-secondary-account-holder/update-secondary-account-holder.component';
import { CreateSecondaryAccountHolderComponent } from './create-secondary-account-holder/create-secondary-account-holder.component';

@NgModule({
  declarations: [
    UpdateProfileComponent,
    UpdateHouseholdBackgroundComponent,
    UpdateSecondaryAccountHolderComponent,
    CreateSecondaryAccountHolderComponent,
  ],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule],
})
export class UserModule {}

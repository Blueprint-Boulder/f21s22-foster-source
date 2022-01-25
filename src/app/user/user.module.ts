import { UpdateSecondaryAccountHolderComponent } from './update-secondary-account-holder/update-secondary-account-holder.component';
import { CreateSecondaryAccountHolderComponent } from './create-secondary-account-holder/create-secondary-account-holder.component';
import { UpdateRespiteProviderInfoComponent } from './update-respite-provider-info/update-respite-provider-info.component';
import { UpdateHouseholdBackgroundComponent } from './update-household-background/update-household-background.component';
import { UpdatePrimaryAvailabilityComponent } from './update-primary-availability/update-primary-availability.component';
import { AddRespiteProviderInfoComponent } from './add-respite-provider-info/add-respite-provider-info.component';
import { UpdateRespiteBackgroundComponent } from './update-respite-background/update-respite-background.component';
import { ModifyTempAvailabilityComponent } from './modify-temp-availability/modify-temp-availability.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { PublicUserPageComponentComponent } from './public-user-page-component/public-user-page-component.component';

@NgModule({
  declarations: [
    UpdateProfileComponent,
    UpdateHouseholdBackgroundComponent,
    UpdateSecondaryAccountHolderComponent,
    CreateSecondaryAccountHolderComponent,
    AddRespiteProviderInfoComponent,
    UpdateRespiteBackgroundComponent,
    UpdateRespiteProviderInfoComponent,
    UpdatePrimaryAvailabilityComponent,
    ModifyTempAvailabilityComponent,
    PublicUserPageComponentComponent,
  ],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule, CommonComponentsModule, NgbAccordionModule],
})
export class UserModule {}

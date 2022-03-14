import { UpdateSecondaryAccountHolderComponent } from './update-secondary-account-holder/update-secondary-account-holder.component';
import { CreateSecondaryAccountHolderComponent } from './create-secondary-account-holder/create-secondary-account-holder.component';
import { UpdateRespiteProviderInfoComponent } from './update-respite-provider-info/update-respite-provider-info.component';
import { UpdateHouseholdBackgroundComponent } from './update-household-background/update-household-background.component';
import { UpdatePrimaryAvailabilityComponent } from './update-primary-availability/update-primary-availability.component';
import { PublicUserPageComponentComponent } from './public-user-page-component/public-user-page-component.component';
import { UpdateProfileCollectionComponent } from './update-profile-collection/update-profile-collection.component';
import { UpdateRespiteBackgroundComponent } from './update-respite-background/update-respite-background.component';
import { AddRespiteProviderInfoComponent } from './add-respite-provider-info/add-respite-provider-info.component';
import { ModifyTempAvailabilityComponent } from './modify-temp-availability/modify-temp-availability.component';
import { UpdateProfilePhotoComponent } from './update-profile-photo/update-profile-photo.component';
import { UserForumActivityComponent } from './user-forum-activity/user-forum-activity.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from '../login/login.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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
    UpdateProfileCollectionComponent,
    UserForumActivityComponent,
    UpdateProfilePhotoComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    CommonComponentsModule,
    NgbAccordionModule,
    LoginModule,
  ],
})
export class UserModule {}

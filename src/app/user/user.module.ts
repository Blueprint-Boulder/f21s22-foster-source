import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UpdateHouseholdBackgroundComponent } from './update-household-background/update-household-background.component';

@NgModule({
  declarations: [UpdateProfileComponent, UpdateHouseholdBackgroundComponent],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule],
})
export class UserModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UpdateHouseholdBackgroundComponent } from './update-household-background/update-household-background.component';

const routes: Routes = [
  {
    path: 'update-profile',
    component: UpdateProfileComponent,
  },
  {
    path: 'update-household-background',
    component: UpdateHouseholdBackgroundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

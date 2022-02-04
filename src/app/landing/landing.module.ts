import { AllAnnouncementsComponent } from './all-announcements/all-announcements.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'past-announcements',
    component: AllAnnouncementsComponent,
  },
];

export const landingRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [LandingPageComponent, AnnouncementComponent, AllAnnouncementsComponent],
  imports: [CommonModule, landingRouting, ReactiveFormsModule, FormsModule],
  exports: [AnnouncementComponent],
})
export class LandingModule {}

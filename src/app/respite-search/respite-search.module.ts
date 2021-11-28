import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RespiteSearchPageComponent } from './respite-search-page/respite-search-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { AvailabilityFiltersComponent } from './availability-filters/availability-filters.component';
import { DayAvailabilityFilterComponent } from './day-availability-filter/day-availability-filter.component';
import { HouseholdBackgroundFiltersComponent } from './household-background-filters/household-background-filters.component';

const routes: Routes = [
  {
    path: '',
    component: RespiteSearchPageComponent,
  },
];

export const respiteRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    RespiteSearchPageComponent,
    SearchResultsComponent,
    SearchBarComponent,
    FilterPanelComponent,
    AvailabilityFiltersComponent,
    DayAvailabilityFilterComponent,
    HouseholdBackgroundFiltersComponent,
  ],
  imports: [
    CommonModule,
    respiteRouting,
    NgxBootstrapSliderModule,
    NgxSliderModule,
    FormsModule,
  ],
})
export class RespiteSearchModule {}

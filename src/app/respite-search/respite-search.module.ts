import { HouseholdBackgroundFiltersComponent } from './household-background-filters/household-background-filters.component';
import { DayAvailabilityFilterComponent } from './day-availability-filter/day-availability-filter.component';
import { AvailabilityFiltersComponent } from './availability-filters/availability-filters.component';
import { RespiteSearchPageComponent } from './respite-search-page/respite-search-page.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ShowFiltersComponent } from './show-filters/show-filters.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { ResultCardComponent } from './result-card/result-card.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

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
    ResultCardComponent,
    ShowFiltersComponent,
  ],
  imports: [CommonModule, respiteRouting, NgxBootstrapSliderModule, NgxSliderModule, FormsModule, NgbPaginationModule],
})
export class RespiteSearchModule {}

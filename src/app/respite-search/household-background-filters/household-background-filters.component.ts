import { Component, Input, OnInit } from '@angular/core';
import { HouseholdBackgroundRadioFilters } from '../../models/filters.model';

@Component({
  selector: 'app-household-background-filters',
  templateUrl: './household-background-filters.component.html',
  styleUrls: ['./household-background-filters.component.scss'],
})
export class HouseholdBackgroundFiltersComponent implements OnInit {
  @Input() radioModel: HouseholdBackgroundRadioFilters;

  ngOnInit(): void {
    return;
  }
}

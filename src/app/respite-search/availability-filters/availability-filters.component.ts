import { Component, Input, OnInit } from '@angular/core';
import {
  AvailabilityFilters,
  DayAvailability,
} from '../../models/availability.model';

@Component({
  selector: 'app-availability-filters',
  templateUrl: './availability-filters.component.html',
  styleUrls: ['./availability-filters.component.scss'],
})
export class AvailabilityFiltersComponent implements OnInit {
  public days: string[] = [];
  public availabilities: DayAvailability[] = [];

  @Input() availabilityModel: AvailabilityFilters;

  ngOnInit(): void {
    if (this.availabilityModel) {
      Object.keys(this.availabilityModel).forEach((key) => {
        this.days.push(key);
      });
      Object.values(this.availabilityModel).forEach((availability) => {
        this.availabilities.push(availability);
      });
    }
  }
}

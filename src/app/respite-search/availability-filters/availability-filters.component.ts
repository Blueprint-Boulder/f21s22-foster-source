import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AvailabilityFilters, DayAvailability } from '../../models/availability.model';

@Component({
  selector: 'app-availability-filters',
  templateUrl: './availability-filters.component.html',
  styleUrls: ['./availability-filters.component.scss'],
})
export class AvailabilityFiltersComponent implements OnInit, OnChanges {
  public days: string[] = [];
  public availabilities: DayAvailability[] = [];

  @Input() availabilityModel: AvailabilityFilters;

  ngOnInit(): void {
    this.availabilities = [];
    this.days = [];
    if (this.availabilityModel) {
      Object.keys(this.availabilityModel).forEach((key) => {
        this.days.push(key);
      });
      Object.values(this.availabilityModel).forEach((availability) => {
        this.availabilities.push(availability);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
}

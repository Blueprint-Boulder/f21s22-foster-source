import { Component, Input } from '@angular/core';
import { DayAvailability } from '../../models/availability.model';

@Component({
  selector: 'app-day-availability-filter',
  templateUrl: './day-availability-filter.component.html',
  styleUrls: ['./day-availability-filter.component.scss'],
})
export class DayAvailabilityFilterComponent {
  @Input() day: string;
  @Input() dayModel: DayAvailability;
  @Input() index: number;
}

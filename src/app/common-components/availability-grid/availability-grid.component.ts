import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Availability, SimpleAvailability } from '../../models/availability.model';
import { DayModel } from '../day-availability-input/day-availability-input.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-availability-grid',
  templateUrl: './availability-grid.component.html',
  styleUrls: ['./availability-grid.component.scss'],
})
export class AvailabilityGridComponent implements OnInit, OnChanges {
  public dayModels: DayModel[];

  @Input() availability: SimpleAvailability;

  // constructor() {}

  ngOnInit(): void {
    if (this.availability) {
      this.dayModels = this.generateDayAvails(this.availability);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.availability) {
      this.dayModels = this.generateDayAvails(changes.availability.currentValue);
    }
  }

  private generateDayAvails(a: SimpleAvailability): DayModel[] {
    return [
      {
        name: 'Monday',
        morning: a.monday[0],
        afternoon: a.monday[1],
        evening: a.monday[2],
        overnight: a.monday[3],
      },
      {
        name: 'Tuesday',
        morning: a.tuesday[0],
        afternoon: a.tuesday[1],
        evening: a.tuesday[2],
        overnight: a.tuesday[3],
      },
      {
        name: 'Wednesday',
        morning: a.wednesday[0],
        afternoon: a.wednesday[1],
        evening: a.wednesday[2],
        overnight: a.wednesday[3],
      },
      {
        name: 'Thursday',
        morning: a.thursday[0],
        afternoon: a.thursday[1],
        evening: a.thursday[2],
        overnight: a.thursday[3],
      },
      {
        name: 'Friday',
        morning: a.friday[0],
        afternoon: a.friday[1],
        evening: a.friday[2],
        overnight: a.friday[3],
      },
      {
        name: 'Saturday',
        morning: a.saturday[0],
        afternoon: a.saturday[1],
        evening: a.saturday[2],
        overnight: a.saturday[3],
      },
      {
        name: 'Sunday',
        morning: a.sunday[0],
        afternoon: a.sunday[1],
        evening: a.sunday[2],
        overnight: a.sunday[3],
      },
    ];
  }

  public getFormattedDate(date: Date): string {
    return formatDate(date, 'MM/dd/yyyy', 'en-US');
  }
}

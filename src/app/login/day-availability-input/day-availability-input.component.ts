import { Component, Input } from '@angular/core';

export interface DayModel {
  name: string;
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  overnight: boolean;
}

@Component({
  selector: 'app-day-availability-input',
  templateUrl: './day-availability-input.component.html',
  styleUrls: ['./day-availability-input.component.scss'],
})
export class DayAvailabilityInputComponent {
  @Input() dayModel: DayModel;
}

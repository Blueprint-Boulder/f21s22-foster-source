import { Component, Input, OnInit } from '@angular/core';

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
export class DayAvailabilityInputComponent implements OnInit {
  @Input() dayModel: DayModel;

  ngOnInit(): void {
    return;
  }
}

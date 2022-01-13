import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayAvailabilityInputComponent } from './day-availability-input/day-availability-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvailabilityGridComponent } from './availability-grid/availability-grid.component';

@NgModule({
  declarations: [DayAvailabilityInputComponent, AvailabilityGridComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  exports: [DayAvailabilityInputComponent, AvailabilityGridComponent],
})
export class CommonComponentsModule {}

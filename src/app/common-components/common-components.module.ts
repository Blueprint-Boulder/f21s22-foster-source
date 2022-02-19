import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayAvailabilityInputComponent } from './day-availability-input/day-availability-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvailabilityGridComponent } from './availability-grid/availability-grid.component';
import { EditorComponent } from './editor/editor.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [DayAvailabilityInputComponent, AvailabilityGridComponent, EditorComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, NgxEditorModule],
  exports: [DayAvailabilityInputComponent, AvailabilityGridComponent, EditorComponent],
})
export class CommonComponentsModule {}

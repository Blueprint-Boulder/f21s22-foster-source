import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayAvailabilityInputComponent } from './day-availability-input/day-availability-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvailabilityGridComponent } from './availability-grid/availability-grid.component';
import { EditorComponent } from './editor/editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { FieldInvalidMessageComponent } from './field-invalid-message/field-invalid-message.component';

@NgModule({
  declarations: [
    DayAvailabilityInputComponent,
    AvailabilityGridComponent,
    EditorComponent,
    FieldInvalidMessageComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, NgxEditorModule],
  exports: [DayAvailabilityInputComponent, AvailabilityGridComponent, EditorComponent, FieldInvalidMessageComponent],
})
export class CommonComponentsModule {}

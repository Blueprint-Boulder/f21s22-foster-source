import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayAvailabilityInputComponent } from './day-availability-input/day-availability-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvailabilityGridComponent } from './availability-grid/availability-grid.component';
import { EditorComponent } from './editor/editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { FieldInvalidMessageComponent } from './field-invalid-message/field-invalid-message.component';
import { BasicTextFieldComponent } from './basic-text-field/basic-text-field.component';
import { BasicCheckFieldComponent } from './basic-check-field/basic-check-field.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    DayAvailabilityInputComponent,
    AvailabilityGridComponent,
    EditorComponent,
    FieldInvalidMessageComponent,
    BasicTextFieldComponent,
    BasicTextFieldComponent,
    BasicCheckFieldComponent,
    SafeHtmlPipe,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, NgxEditorModule],
  exports: [
    DayAvailabilityInputComponent,
    AvailabilityGridComponent,
    EditorComponent,
    FieldInvalidMessageComponent,
    BasicTextFieldComponent,
    BasicCheckFieldComponent,
    SafeHtmlPipe,
  ],
})
export class CommonComponentsModule {}

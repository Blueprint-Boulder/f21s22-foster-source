import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-check-field',
  templateUrl: './basic-check-field.component.html',
  styleUrls: ['./basic-check-field.component.scss'],
})
export class BasicCheckFieldComponent {
  @Input() field: string;
  @Input() title: string;
  @Input() form: FormGroup;
  @Input() italic = false;

  @Input() errors: string[];
  @Input() errorMessages: string[];

  @Input() formErrors: string[];
  @Input() formErrorMessages: string[];

  isRequired(): boolean {
    return (
      <boolean>this.form?.get(this.field)?.hasValidator(Validators.required) ||
      this.errors?.filter((e) => e === 'required').length > 0
    );
  }
}

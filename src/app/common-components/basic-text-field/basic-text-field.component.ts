import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-text-field',
  templateUrl: './basic-text-field.component.html',
  styleUrls: ['./basic-text-field.component.scss'],
})
export class BasicTextFieldComponent {
  @Input() field: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() form: FormGroup;

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

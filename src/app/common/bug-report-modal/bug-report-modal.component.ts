import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BugService } from '../../services/bug-service/bug.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BugReportReq } from '../../models/bug.model';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-bug-report-modal',
  templateUrl: './bug-report-modal.component.html',
  styleUrls: ['./bug-report-modal.component.scss'],
})
export class BugReportModalComponent implements OnInit {
  public bugForm: FormGroup;
  public submittingForm = false;

  @Input() open = false;
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private bugService: BugService, private toastService: ToastService) {
    this.bugForm = this.formBuilder.group({
      description: [null, Validators.required],
      url: [null],
      stepsToReproduce: [null],
    });
  }

  ngOnInit(): void {
    return;
  }

  closeModal(): void {
    this.closeModalEvent.emit();
    this.resetForm();
  }

  onSubmit(): void {
    if (this.bugForm.invalid) {
      this.bugForm.markAllAsTouched();
    } else {
      const report: BugReportReq = {
        description: this.bugForm.get('description')!.value,
        stepsToReproduce:
          this.bugForm.get('stepsToReproduce')!.value === '' || this.bugForm.get('stepsToReproduce')!.value === null
            ? undefined
            : this.bugForm.get('stepsToReproduce')!.value,
        url:
          this.bugForm.get('url')!.value === '' || this.bugForm.get('url')!.value === null
            ? undefined
            : this.bugForm.get('url')!.value,
        environment: navigator.userAgent,
      };
      this.bugService.postBug(report).subscribe(
        (_) => {
          this.toastService.success('Successfully submitted bug report. We will look into it shortly');
          this.closeModal();
        },
        (err) => {
          this.toastService.httpError(err);
          this.submittingForm = false;
        }
      );
    }
  }

  private resetForm() {
    Object.keys(this.bugForm.controls).forEach((key) => {
      this.bugForm.get(key)?.setValue(null);
      this.bugForm.get(key)?.markAsUntouched();
      this.bugForm.get(key)?.markAsPristine();
      this.bugForm.get(key)?.updateValueAndValidity();
    });
    this.bugForm.markAsUntouched();
    this.bugForm.markAsPristine();
    this.bugForm.updateValueAndValidity();
  }
}

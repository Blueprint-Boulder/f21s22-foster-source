import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPassForm = this.formBuilder.group({
    email: ['', Validators.required],
  });
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    return;
  }
  forgotPassSubmit(): void {
    if (this.forgotPassForm.invalid) {
      this.forgotPassForm.markAllAsTouched();
    } else {
      this.router.navigate(['/login/recover/confirmation']);
    }
  }
}

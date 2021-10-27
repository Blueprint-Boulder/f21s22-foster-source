import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    return;
  }
  public loginSubmit(): void {
    console.log(this.loginForm.value.username);
    console.log(this.loginForm.value.password);
  }
}

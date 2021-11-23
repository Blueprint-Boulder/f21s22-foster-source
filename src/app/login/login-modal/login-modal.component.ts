import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../services/account-service/account.service';
import { accountServiceProvider } from '../../services/account-service/account.service.provider';
import { AuthService } from '../../services/auth-service/auth.service';
import { LoginRequest } from 'src/app/models/account.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  providers: [accountServiceProvider],
})
export class LoginModalComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    remember: true,
  });

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    return;
  }
  public loginSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      const data: LoginRequest = {
        //Typescript was complaining about abstract control typing
        username: String(this.loginForm.controls.username),
        password: String(this.loginForm.controls.password),
      };
      this.accountService.login(data).subscribe((res: string) => {
        this.cookieService.set('access-token', res);
        this.authService.init();
      });
    }
  }
}

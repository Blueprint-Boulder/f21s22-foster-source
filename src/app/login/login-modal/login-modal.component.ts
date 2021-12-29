import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../services/account-service/account.service';
import { accountServiceProvider } from '../../services/account-service/account.service.provider';
import { AuthService } from '../../services/auth-service/auth.service';
import { LoginRequest } from 'src/app/models/account.model';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastPresets } from '../../models/toast.model';
import { Router } from '@angular/router';
<<<<<<< HEAD
=======
import { Observable } from 'rxjs';
>>>>>>> a86d693b65aac805eebecb6cac00adccc3a70ce8

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
    private cookieService: CookieService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    return;
  }
  public loginSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      const data: LoginRequest = {
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
      };
<<<<<<< HEAD
      console.log(JSON.stringify(data));
      this.accountService.login(data).subscribe(
        (res: string) => {
          // this.cookieService.set('access-token', res);
          this.authService.init();
          this.router.navigate(['/respite']);
        },
        (err) => {
          this.toastService.show({
            body: 'Something went wrong when trying to login.',
            preset: ToastPresets.ERROR,
          });
=======
      this.accountService.login(data).subscribe(
        (res: string) => {
          this.authService.init();
          this.router.navigate(['/respite']);
          this.authService.emitLoggedIn();
        },
        (err) => {
          this.toastService.httpError(err);
>>>>>>> a86d693b65aac805eebecb6cac00adccc3a70ce8
        }
      );
    }
  }
}

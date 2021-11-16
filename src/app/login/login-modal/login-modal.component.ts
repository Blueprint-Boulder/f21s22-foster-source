import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountMockService } from '../../services/account-service/account.mock.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { LoginRequest, Cookie } from '../../models/account.model';
import { cookies } from 'src/app/mock/database-entities';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    remember: true,
  });

  constructor(private formBuilder: FormBuilder, private accountMockService: AccountMockService,
    private authService: AuthService, private cookieService: CookieService) {}
  ngOnInit(): void {
    return;
  }
  public loginSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      let data: LoginRequest;
      data = {
        //Typescript was yelling at me about abstract control typing
        username: String(this.loginForm.controls.username),
        password: String(this.loginForm.controls.password)
      };
      this.accountMockService.login(data)
        .subscribe((res: string) => {
          this.cookieService.set("auth-token", res);
        }, (error: any) => {
          console.log(error);
        }, () => {
          this.authService.init();
        });

    }
  }
}

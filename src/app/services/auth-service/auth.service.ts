import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Cookie } from '../../models/account.model';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  isUser = false;
  isAdmin = false;
  isMod = false;
  expiresAt = moment();

  init(): void {
    //Setting dummy token to use in service and guards. init will be called when the user logs in.
    // this.cookieService.set(
    //   'access-token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsImlkIjo3LCJwcml2aWxlZ2VMZXZlbCI6MCwiZXhwIjo3MjAwfQ.Uh0Feuo5ZAplMsD7KRvHm_Qbzgk-3-mEa-s4-UPXWMU'
    // );
    console.log('init function');
    const token = this.getToken();
    console.log(token);
    if (token) {
      this.expiresAt = moment().add(token.exp, 'second');
      this.isUser = token.privilegeLevel > 0;
      this.isAdmin = token.privilegeLevel > 1;
      this.isMod = token.privilegeLevel > 2;
    }
  }

  getToken(): Cookie {
    console.log('getting token');
    const token = this.cookieService.get('access-token');
    console.log(token);
    const tokenBody: Cookie = jwtDecode(token);
    console.log(tokenBody);
    return tokenBody;
  }

  validTime(): boolean {
    return moment().isBefore(this.expiresAt);
  }

  validUser(): boolean {
    return this.isUser && this.validTime();
  }

  validAdmin(): boolean {
    return this.isAdmin && this.validTime();
  }

  validMod(): boolean {
    return this.isMod && this.validTime();
  }
}

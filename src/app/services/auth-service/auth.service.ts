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
    const token = this.getToken();
    if (token) {
      this.expiresAt = moment().add(token.exp, 'second');
      this.isUser = (token.privilegeLevel === 0);
      this.isAdmin = (token.privilegeLevel === 1);
      this.isMod = (token.privilegeLevel === 2);
    }
  }

  getToken(): Cookie {
    const token = this.cookieService.get('access-token');
    const tokenBody: Cookie = jwtDecode(token);
    return tokenBody;
  }

  validTime(): boolean {
    return moment().isBefore(this.expiresAt);
  }

  validUser(): boolean {
    //calling init so dummy token is set, will not be in final implementation
    this.init();
    return this.isUser && this.validTime();
  }

  validAdmin(): boolean {
    this.init();
    return this.isAdmin && this.validTime();
  }

  validMod(): boolean {
    this.init();
    return this.isMod && this.validTime();
  }
}

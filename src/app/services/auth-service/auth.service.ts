import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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
    this.cookieService.set(
      'access-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjIsImlkIjo3LCJwcml2aWxlZ2VMZXZlbCI6MCwiZXhwIjo3MjAwfQ.Uh0Feuo5ZAplMsD7KRvHm_Qbzgk-3-mEa-s4-UPXWMU'
    );
    const token = this.getToken();
    if (token) {
      this.expiresAt = moment().add(token.exp, 'second');
      this.isUser = token.privilegeLevel === 0;
      this.isAdmin = token.privilegeLevel === 1;
      this.isMod = token.privilegeLevel === 2;
    }
  }

  getToken(): { iat: number; id: number; privilegeLevel: number; exp: number } {
    const token = this.cookieService.get('access-token');
    const tokenBody: {
      iat: number;
      id: number;
      privilegeLevel: number;
      exp: number;
    } = jwtDecode(token);
    console.log(tokenBody);
    return tokenBody;
  }

  validTime(): boolean {
    return moment().isBefore(this.expiresAt);
  }

  validUser(): boolean {
    this.init();
    console.log(this.isUser);
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

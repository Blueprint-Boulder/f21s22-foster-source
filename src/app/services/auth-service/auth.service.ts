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

  //Storing priveleges of the user.
  private isUser = false;
  private isAdmin = false;
  private isMod = false;
  private expiresAt = moment();

  init(): void {
    const token = this.getToken();
    if (token) {
      //reads off the properties of the new token to initialize the properties
      //used in the service.
      this.expiresAt = moment().add(token.exp, 'second');
      this.isUser = token.privilegeLevel > 0;
      this.isAdmin = token.privilegeLevel > 1;
      this.isMod = token.privilegeLevel > 2;
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
    return this.isUser && this.validTime();
  }

  validAdmin(): boolean {
    return this.isAdmin && this.validTime();
  }

  validMod(): boolean {
    return this.isMod && this.validTime();
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Cookie } from '../../models/account.model';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';

export enum Privilege {
  NONE,
  USER,
  MOD,
  ADMIN,
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  public loggedInEvent: EventEmitter<void> = new EventEmitter<void>();

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
      this.isMod = token.privilegeLevel > 1;
      this.isAdmin = token.privilegeLevel > 2;
    }
  }

  getToken(): Cookie | undefined {
    try {
      const token = this.cookieService.get('access-token');
      return jwtDecode(token);
    } catch (e) {
      return undefined;
    }
  }

  validTime(): boolean {
    this.init();
    return moment().isBefore(this.expiresAt);
  }

  validUser(): boolean {
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

  emitLoggedIn(): void {
    this.loggedInEvent.emit();
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '../../models/account.model';
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
  public loggedInEvent: EventEmitter<void> = new EventEmitter<void>();
  public loggedOutEvent: EventEmitter<void> = new EventEmitter<void>();

  private privilegeLevel = Privilege.NONE;
  private expiresAt = moment();

  constructor(private cookieService: CookieService) {
    this.init();
  }

  init(): void {
    console.log('Initting');
    const token = this.getToken();
    if (token) {
      console.log('token got');
      this.expiresAt = moment().add(token.exp, 'second');
      console.log(`Expires at ${this.expiresAt}`);
      this.privilegeLevel = token.privilegeLevel;
      console.log(`PRivilege ${this.privilegeLevel}`);
      this.emitLoggedIn();
    } else {
      console.log('no token');
      this.privilegeLevel = Privilege.NONE;
    }
  }

  getToken(): Token | undefined {
    console.log('Getting Token');
    try {
      const token = this.cookieService.get('access-token');
      console.log('cookie exists', token);
      console.log('jwt:', jwtDecode(token));
      return jwtDecode(token);
    } catch (e) {
      console.log('Invalid token.');
      console.log(e);
      return undefined;
    }
  }

  validTime(): boolean {
    const valid = moment().isBefore(this.expiresAt);
    if (!valid) {
      this.emitLoggedOut();
      return false;
    }
    return true;
  }

  isUser(): boolean {
    return this.privilegeLevel === Privilege.USER && this.validTime();
  }

  isAtLeastUser(): boolean {
    return this.privilegeLevel >= Privilege.USER && this.validTime();
  }

  isMod(): boolean {
    return this.privilegeLevel === Privilege.MOD && this.validTime();
  }

  isAtLeastMod(): boolean {
    return this.privilegeLevel >= Privilege.MOD && this.validTime();
  }

  isAdmin(): boolean {
    return this.privilegeLevel === Privilege.USER && this.validTime();
  }

  isAtLeastAdmin(): boolean {
    return this.privilegeLevel >= Privilege.ADMIN && this.validTime();
  }

  logout(): void {
    this.cookieService.delete('access-token');
    this.emitLoggedOut();
  }

  emitLoggedIn(): void {
    console.log('emitting logged in');
    this.loggedInEvent.emit();
  }

  emitLoggedOut(): void {
    this.loggedOutEvent.emit();
  }
}

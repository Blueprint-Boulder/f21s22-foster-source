import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlacklistedUser } from '../../models/blacklisted-user.model';

@Injectable({
  providedIn: 'root',
})
export abstract class BlacklistService {
  public abstract getBlacklistedUsers(): Observable<BlacklistedUser>;
  public abstract blacklistUser(
    user: BlacklistedUser
  ): Observable<BlacklistedUser>;
  public abstract deleteFromBlacklist(
    phoneNumber: string,
    email: string
  ): Observable<void>;
}

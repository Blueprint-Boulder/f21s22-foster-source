import {
  BlacklistAccountReq,
  BlacklistedUser,
  GetBlacklistedUsersRes,
  SuspendUserReq,
} from '../../models/blacklisted-user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BlacklistService {
  public abstract getBlacklistedUsers(): Observable<GetBlacklistedUsersRes>;
  public abstract blacklistUser(user: BlacklistedUser): Observable<BlacklistedUser>;
  public abstract deleteFromBlacklist(phoneNumber: string, email: string): Observable<any>;
  public abstract suspendUser(req: SuspendUserReq): Observable<any>;
  public abstract blacklistUserByAccountId(req: BlacklistAccountReq): Observable<any>;
}

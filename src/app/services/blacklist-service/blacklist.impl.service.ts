import { BlacklistService } from './blacklist.service';
import { HttpClient } from '@angular/common/http';
import {
  BlacklistAccountReq,
  BlacklistedUser,
  GetBlacklistedUsersRes,
  SuspendUserReq,
} from '../../models/blacklisted-user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export class BlacklistImplService implements BlacklistService {
  constructor(private http: HttpClient) {}

  blacklistUser(user: BlacklistedUser): Observable<BlacklistedUser> {
    return this.http.post<BlacklistedUser>(`${environment.backendHost}/api/db/blacklist`, JSON.stringify(user), {
      withCredentials: true,
    });
  }

  deleteFromBlacklist(phoneNumber: string, email: string): Observable<any> {
    return this.http.delete<void>(
      `${environment.backendHost}/api/db/blacklist/?phoneNumber=${encodeURIComponent(
        phoneNumber
      )}&email=${encodeURIComponent(email)}`,
      { withCredentials: true }
    );
  }

  getBlacklistedUsers(): Observable<GetBlacklistedUsersRes> {
    return this.http.get<GetBlacklistedUsersRes>(`${environment.backendHost}/api/db/blacklist`, {
      withCredentials: true,
    });
  }

  suspendUser(req: SuspendUserReq): Observable<any> {
    return this.http.put(`${environment.backendHost}/api/db/accounts/${req.accountId}/suspension`, req, {
      withCredentials: true,
    });
  }

  blacklistUserByAccountId(req: BlacklistAccountReq): Observable<any> {
    return this.http.post(`${environment.backendHost}/api/db/blacklist`, req, {
      withCredentials: true,
    });
  }
}

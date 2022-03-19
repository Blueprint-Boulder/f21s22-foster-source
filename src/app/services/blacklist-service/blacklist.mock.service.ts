import { BlacklistService } from './blacklist.service';
import { Observable, of } from 'rxjs';
import {
  BlacklistAccountReq,
  BlacklistedUser,
  GetBlacklistedUsersRes,
  SuspendUserReq,
} from '../../models/blacklisted-user.model';
import { blacklist } from '../../mock/database-entities';

export class BlacklistMockService implements BlacklistService {
  deleteFromBlacklist(phoneNumber: string, email: string): Observable<any> {
    return of({});
  }

  getBlacklistedUsers(): Observable<GetBlacklistedUsersRes> {
    return of({
      blacklist: blacklist,
    });
  }

  blacklistAndDeleteAccount(req: BlacklistAccountReq): Observable<any> {
    return of({});
  }

  suspendUser(req: SuspendUserReq): Observable<any> {
    return of({});
  }
}

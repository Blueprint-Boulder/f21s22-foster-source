import { BlacklistService } from './blacklist.service';
import { Observable, of } from 'rxjs';
import { BlacklistedUser, GetBlacklistedUsersRes } from '../../models/blacklisted-user.model';
import { blacklist } from '../../mock/database-entities';

export class BlacklistMockService implements BlacklistService {
  blacklistUser(user: BlacklistedUser): Observable<BlacklistedUser> {
    return of(blacklist[0]);
  }

  deleteFromBlacklist(phoneNumber: string, email: string): Observable<any> {
    return of({});
  }

  getBlacklistedUsers(): Observable<GetBlacklistedUsersRes> {
    return of({
      blacklist: blacklist,
    });
  }
}

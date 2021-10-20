import { DatabaseService } from './database.service';
import { Observable, of } from 'rxjs';
import {
  Announcement,
  DeleteAnnouncementRequest,
  DeleteAnnouncementResponse,
  PostAnnouncementRequest,
  PostAnnouncementResponse,
} from '../../models/announcement.model';
import {
  announcements,
  users,
  applicants,
  blacklist,
} from '../../mock/database-entities';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { User } from '../../models/user.model';
import {
  Applicant,
  ApproveApplicantRequest,
  ApproveApplicantResponse,
  DenyApplicantRequest,
  DenyApplicantResponse,
} from '../../models/applicant.model';
import {
  BlacklistedUser,
  RemoveFromBlacklistRequest,
  RemoveFromBlacklistResponse,
} from '../../models/blacklisted-user.model';

export class DatabaseMockService implements DatabaseService {
  constructor(private http: HttpClient) {}

  public getLatestAnnouncement(): Observable<Announcement> {
    return of(announcements[0]).pipe(delay(50));
  }

  public getUserById(id: number): Observable<User> {
    return of(users[0]);
  }

  public getApplicants(): Observable<Applicant[]> {
    return of(applicants);
  }

  public getBlacklist(): Observable<BlacklistedUser[]> {
    return of(blacklist);
  }

  public denyApplicant(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: DenyApplicantRequest
  ): Observable<DenyApplicantResponse> {
    return of({});
  }

  public approveApplicant(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: ApproveApplicantRequest
  ): Observable<ApproveApplicantResponse> {
    return of({});
  }

  public removeFromBlacklist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: RemoveFromBlacklistRequest
  ): Observable<RemoveFromBlacklistResponse> {
    return of({});
  }

  public postAnnouncement(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    announcement: PostAnnouncementRequest
  ): Observable<PostAnnouncementResponse> {
    return of({});
  }

  public deleteAnnouncement(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: DeleteAnnouncementRequest
  ): Observable<DeleteAnnouncementResponse> {
    return of({});
  }
}

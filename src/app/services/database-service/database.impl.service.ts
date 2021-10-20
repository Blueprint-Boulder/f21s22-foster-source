import { DatabaseService } from './database.service';
import { Observable, throwError } from 'rxjs';
import {
  Announcement,
  DeleteAnnouncementRequest,
  DeleteAnnouncementResponse,
  PostAnnouncementRequest,
  PostAnnouncementResponse,
} from '../../models/announcement.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
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

export class DatabaseImplService implements DatabaseService {
  constructor(private http: HttpClient) {}

  public getLatestAnnouncement(): Observable<Announcement> {
    return this.http
      .get<Announcement>(
        `${environment.backendHost}/api/db/latest-announcement`
      )
      .pipe(
        catchError((error) => {
          console.log('Error getting latest announcement.');
          console.log(error);
          return throwError(error);
        })
      );
  }

  public getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(
        `${environment.backendHost}/api/db/user/${encodeURIComponent(id)}`
      )
      .pipe(
        catchError((error) => {
          console.log('Error getting user by ID.');
          console.log(error);
          return throwError(error);
        })
      );
  }

  public getApplicants(): Observable<Applicant[]> {
    return this.http
      .get<Applicant[]>(`${environment.backendHost}/api/db/applicants`)
      .pipe(
        catchError((error) => {
          console.log('Error getting applicants.');
          console.log(error);
          return throwError(error);
        })
      );
  }

  public getBlacklist(): Observable<BlacklistedUser[]> {
    return this.http
      .get<BlacklistedUser[]>(`${environment.backendHost}/api/db/blacklist`)
      .pipe(
        catchError((error) => {
          console.log('Error getting blacklisted users.');
          console.log(error);
          return throwError(error);
        })
      );
  }

  public denyApplicant(
    params: DenyApplicantRequest
  ): Observable<DenyApplicantResponse> {
    return this.http
      .put<DenyApplicantResponse>(
        `${environment.backendHost}/api/db/applicant-status/deny`,
        params
      )
      .pipe(
        catchError((error) => {
          console.log('Error denying user.');
          console.log(error);
          return throwError(error);
        })
      );
  }

  public approveApplicant(
    params: ApproveApplicantRequest
  ): Observable<ApproveApplicantResponse> {
    return this.http
      .post<ApproveApplicantResponse>(
        `${environment.backendHost}/api/db/approveUser`,
        params
      )
      .pipe(
        catchError((error) => {
          console.log('Error approving user.');
          console.log(error);
          return throwError(error);
        })
      );
  }

  public removeFromBlacklist(
    params: RemoveFromBlacklistRequest
  ): Observable<RemoveFromBlacklistResponse> {
    return this.http
      .post<RemoveFromBlacklistResponse>(
        `${environment.backendHost}/api/db/removeFromBlacklist`,
        params
      )
      .pipe(
        catchError((error) => {
          console.log('Error approving removing user from blacklist.');
          console.log(error);
          return throwError(error);
        })
      );
  }

  public postAnnouncement(
    params: PostAnnouncementRequest
  ): Observable<PostAnnouncementResponse> {
    return this.http
      .post<PostAnnouncementResponse>(
        `${environment.backendHost}/api/db/announcements`,
        params
      )
      .pipe(
        catchError((error) => {
          console.log('Error posting announcement.');
          console.log(error);
          return throwError(error);
        })
      );
  }

  public deleteAnnouncement(
    params: DeleteAnnouncementRequest
  ): Observable<DeleteAnnouncementResponse> {
    return this.http
      .delete<DeleteAnnouncementResponse>(
        `${environment.backendHost}/api/db/announcements/${params.id}`
      )
      .pipe(
        catchError((error) => {
          console.log('Error deleting announcement.');
          console.log(error);
          return throwError(error);
        })
      );
  }
}

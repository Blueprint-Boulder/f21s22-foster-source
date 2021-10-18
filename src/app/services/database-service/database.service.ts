import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Announcement,
  DeleteAnnouncementRequest,
  DeleteAnnouncementResponse,
  PostAnnouncementRequest,
  PostAnnouncementResponse,
} from '../../models/announcement.model';
import { HttpClient } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root',
})
export abstract class DatabaseService {
  public abstract getLatestAnnouncement(): Observable<Announcement>;

  public abstract getUserById(id: number): Observable<User>;

  public abstract getApplicants(): Observable<Applicant[]>;

  public abstract getBlacklist(): Observable<BlacklistedUser[]>;

  public abstract denyApplicant(
    params: DenyApplicantRequest
  ): Observable<DenyApplicantResponse>;

  public abstract approveApplicant(
    params: ApproveApplicantRequest
  ): Observable<ApproveApplicantResponse>;

  public abstract removeFromBlacklist(
    params: RemoveFromBlacklistRequest
  ): Observable<RemoveFromBlacklistResponse>;

  public abstract postAnnouncement(
    announcement: PostAnnouncementRequest
  ): Observable<PostAnnouncementResponse>;

  public abstract deleteAnnouncement(
    params: DeleteAnnouncementRequest
  ): Observable<DeleteAnnouncementResponse>;
}

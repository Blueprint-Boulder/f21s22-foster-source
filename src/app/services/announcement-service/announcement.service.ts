import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Announcement,
  GetAnnouncementsRes,
  OptionalAnnouncement,
  PostAnnouncementRequest,
} from '../../models/announcement.model';

@Injectable({
  providedIn: 'root',
})
export abstract class AnnouncementService {
  public abstract getAnnouncements(): Observable<GetAnnouncementsRes>;
  public abstract getAnnouncementById(id: number): Observable<Announcement>;
  public abstract getLatestAnnouncement(): Observable<Announcement>;
  public abstract postAnnouncement(
    announcement: PostAnnouncementRequest
  ): Observable<Announcement>;
  public abstract updateAnnouncement(
    opAnnouncement: OptionalAnnouncement
  ): Observable<Announcement>;
  public abstract deleteAnnouncement(id: number): Observable<any>;
}

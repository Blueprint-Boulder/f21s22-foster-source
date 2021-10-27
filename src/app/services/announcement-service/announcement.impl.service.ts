import { AnnouncementService } from './announcement.service';
import { HttpClient } from '@angular/common/http';
import {
  Announcement,
  GetAnnouncementsRes,
  OptionalAnnouncement,
} from '../../models/announcement.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export class AnnouncementImplService implements AnnouncementService {
  constructor(private http: HttpClient) {}

  getAnnouncements(): Observable<GetAnnouncementsRes> {
    return this.http.get<GetAnnouncementsRes>(
      `${environment.backendHost}/api/db/announcements`
    );
  }

  getAnnouncementById(id: number): Observable<Announcement> {
    return this.http.get<Announcement>(
      `${environment.backendHost}/api/db/announcements/${encodeURIComponent(
        id
      )}`
    );
  }

  getLatestAnnouncement(): Observable<Announcement> {
    return this.http.get<Announcement>(
      `${environment.backendHost}/api/db/announcements/recent`
    );
  }

  postAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(
      `${environment.backendHost}/api/db/announcements`,
      JSON.stringify(announcement)
    );
  }

  updateAnnouncement(
    opAnnouncement: OptionalAnnouncement
  ): Observable<Announcement> {
    return this.http.put<Announcement>(
      `${environment.backendHost}/api/db/announcements/${encodeURIComponent(
        opAnnouncement.id
      )}`,
      JSON.stringify(opAnnouncement)
    );
  }

  deleteAnnouncement(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.backendHost}/api/db/announcements/${encodeURIComponent(
        id
      )}`
    );
  }
}

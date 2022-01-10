import { AnnouncementService } from './announcement.service';
import { HttpClient } from '@angular/common/http';
import {
  Announcement,
  GetAnnouncementsRes,
  OptionalAnnouncement,
  PostAnnouncementRequest,
} from '../../models/announcement.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export class AnnouncementImplService implements AnnouncementService {
  constructor(private http: HttpClient) {}

  getAnnouncements(): Observable<GetAnnouncementsRes> {
    return this.http.get<GetAnnouncementsRes>(`${environment.backendHost}/api/db/announcements`, {
      withCredentials: true,
    });
  }

  getAnnouncementById(id: number): Observable<Announcement> {
    return this.http.get<Announcement>(`${environment.backendHost}/api/db/announcements/${encodeURIComponent(id)}`, {
      withCredentials: true,
    });
  }

  getLatestAnnouncement(): Observable<Announcement> {
    return this.http.get<Announcement>(`${environment.backendHost}/api/db/announcements/recent`, {
      withCredentials: true,
    });
  }

  postAnnouncement(announcement: PostAnnouncementRequest): Observable<Announcement> {
    return this.http.post<Announcement>(`${environment.backendHost}/api/db/announcements`, announcement, {
      withCredentials: true,
    });
  }

  updateAnnouncement(opAnnouncement: OptionalAnnouncement): Observable<Announcement> {
    return this.http.put<Announcement>(
      `${environment.backendHost}/api/db/announcements/${encodeURIComponent(opAnnouncement.id)}`,
      opAnnouncement,
      { withCredentials: true }
    );
  }

  deleteAnnouncement(id: number): Observable<any> {
    return this.http.delete<void>(`${environment.backendHost}/api/db/announcements/${encodeURIComponent(id)}`, {
      withCredentials: true,
    });
  }
}

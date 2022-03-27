import { AnnouncementService } from './announcement.service';
import { Observable, of } from 'rxjs';
import {
  Announcement,
  GetAnnouncementsRes,
  OptionalAnnouncement,
  PostAnnouncementRequest,
} from '../../models/announcement.model';
import { announcements, getAnnouncementResponses } from '../../mock/database-entities';

export class AnnouncementMockService implements AnnouncementService {
  deleteAnnouncement(id: number): Observable<any> {
    return of({});
  }

  getAnnouncements(): Observable<GetAnnouncementsRes> {
    return of(getAnnouncementResponses[0]);
  }

  getLatestAnnouncement(): Observable<Announcement> {
    return of(announcements[0]);
  }

  postAnnouncement(announcement: PostAnnouncementRequest): Observable<Announcement> {
    return of(announcements[0]);
  }

  updateAnnouncement(opAnnouncement: OptionalAnnouncement): Observable<Announcement> {
    return of(announcements[0]);
  }
}

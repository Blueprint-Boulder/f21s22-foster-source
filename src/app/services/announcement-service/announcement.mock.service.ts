import { AnnouncementService } from './announcement.service';
import { Observable, of } from 'rxjs';
import {
  Announcement,
  GetAnnouncementsRes,
  OptionalAnnouncement,
} from '../../models/announcement.model';
import {
  announcements,
  getAnnouncementResponses,
} from '../../mock/database-entities';

export class AnnouncementMockService implements AnnouncementService {
  deleteAnnouncement(id: number): Observable<void> {
    return of();
  }

  getAnnouncementById(id: number): Observable<Announcement> {
    return of(announcements[0]);
  }

  getAnnouncements(): Observable<GetAnnouncementsRes> {
    return of(getAnnouncementResponses[0]);
  }

  getLatestAnnouncement(): Observable<Announcement> {
    return of(announcements[0]);
  }

  postAnnouncement(announcement: Announcement): Observable<Announcement> {
    return of(announcements[0]);
  }

  updateAnnouncement(
    opAnnouncement: OptionalAnnouncement
  ): Observable<Announcement> {
    return of(announcements[0]);
  }
}

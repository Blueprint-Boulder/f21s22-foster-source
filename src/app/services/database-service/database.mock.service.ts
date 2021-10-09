import { DatabaseService } from './database.service';
import { Observable, of } from 'rxjs';
import { Announcement } from '../../models/announcement.model';
import { announcements } from '../../mock/database-entities';
import { HttpClient } from '@angular/common/http';

export class DatabaseMockService implements DatabaseService {
  constructor(private http: HttpClient) {}

  public getLatestAnnouncement(): Observable<Announcement> {
    return of(announcements[0]);
  }
}

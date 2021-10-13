import { DatabaseService } from './database.service';
import { Observable, of } from 'rxjs';
import { Announcement } from '../../models/announcement.model';
import { announcements, users } from '../../mock/database-entities';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { User } from '../../models/user.model';

export class DatabaseMockService implements DatabaseService {
  constructor(private http: HttpClient) {}

  public getLatestAnnouncement(): Observable<Announcement> {
    return of(announcements[0]).pipe(delay(50));
  }

  public getUserById(id: number): Observable<User> {
    return of(users[0]);
  }
}

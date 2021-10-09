import { DatabaseService } from './database.service';
import { Observable } from 'rxjs';
import { Announcement } from '../../models/announcement.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class DatabaseImplService implements DatabaseService {
  constructor(private http: HttpClient) {}

  public getLatestAnnouncement(): Observable<Announcement> {
    return this.http.get<Announcement>(
      `${environment.backendHost}/api/db/getLatestAnnouncement`
    );
  }
}

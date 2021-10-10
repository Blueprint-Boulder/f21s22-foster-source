import { DatabaseService } from './database.service';
import { Observable, throwError } from 'rxjs';
import { Announcement } from '../../models/announcement.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

export class DatabaseImplService implements DatabaseService {
  constructor(private http: HttpClient) {}

  public getLatestAnnouncement(): Observable<Announcement> {
    return this.http
      .get<Announcement>(
        `${environment.backendHost}/api/db/getLatestAnnouncement`
      )
      .pipe(
        catchError((error) => {
          console.log('Error getting latest announcement.');
          console.log(error);
          return throwError(error);
        })
      );
  }
}

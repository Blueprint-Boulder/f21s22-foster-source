import { DatabaseService } from './database.service';
import { Observable, throwError } from 'rxjs';
import { Announcement } from '../../models/announcement.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { Applicant } from '../../models/applicant.model';

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

  public getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(
        `${environment.backendHost}/api/db/getUserById?id=${encodeURIComponent(
          id
        )}`
      )
      .pipe(
        catchError((error) => {
          console.log('Error getting user by ID.');
          console.log(error);
          return throwError(error);
        })
      );
  }

  public getApplicants(): Observable<Applicant[]> {
    return this.http
      .get<Applicant[]>(`${environment.backendHost}/api/db/getApplicants?`)
      .pipe(
        catchError((error) => {
          console.log('Error getting applicants.');
          console.log(error);
          return throwError(error);
        })
      );
  }
}

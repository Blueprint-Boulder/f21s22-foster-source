import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from '../../models/announcement.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Applicant } from '../../models/applicant.model';

@Injectable({
  providedIn: 'root',
})
export abstract class DatabaseService {
  public abstract getLatestAnnouncement(): Observable<Announcement>;
  public abstract getUserById(id: number): Observable<User>;
  public abstract getApplicants(): Observable<Applicant[]>;
}

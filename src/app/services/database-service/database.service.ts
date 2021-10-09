import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from '../../models/announcement.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export abstract class DatabaseService {
  public abstract getLatestAnnouncement(): Observable<Announcement>;
}

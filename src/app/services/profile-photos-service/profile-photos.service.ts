import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export abstract class ProfilePhotosService {
  public abstract postProfilePhoto(key: string): Observable<Photo>;
  public abstract deletePhoto(key: string): Observable<any>;
}
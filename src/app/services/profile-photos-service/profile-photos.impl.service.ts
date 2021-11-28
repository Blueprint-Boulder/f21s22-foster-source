import { ProfilePhotosService } from './profile-photos.service';
import { Observable } from 'rxjs';
import { Photo } from '../../models/profile.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class ProfilePhotosImplService implements ProfilePhotosService {
  constructor(private http: HttpClient) {}

  deletePhoto(key: string): Observable<any> {
    return this.http.delete<void>(`${environment.backendHost}/api/db/profile/photos/${encodeURIComponent(key)}`);
  }

  postProfilePhoto(key: string): Observable<Photo> {
    return this.http.post<Photo>(`${environment.backendHost}/api/db/profile.photos`, JSON.stringify(key));
  }
}

import { ProfilePhotosService } from './profile-photos.service';
import { Observable, of } from 'rxjs';
import { Photo } from '../../models/profile.model';
import { photos } from '../../mock/database-entities';

export class ProfilePhotosMockService implements ProfilePhotosService {
  deletePhoto(key: string): Observable<any> {
    return of({});
  }

  postProfilePhoto(key: string): Observable<Photo> {
    return of(photos[0]);
  }
}

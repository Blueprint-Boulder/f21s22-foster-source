import { ImageService, ImgKey } from './image.service';
import { Observable, of } from 'rxjs';
import { ImagePostRes } from '../../models/image.model';

export class ImageMockService implements ImageService {
  public uploadImage(image: File): Observable<ImagePostRes> {
    return of({ key: 'FAKE_IMAGE_KEY' });
  }

  public deleteImage(key: string): Observable<any> {
    return of({});
  }
}

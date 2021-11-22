import { ImageService, ImgKey } from './image.service';
import { Observable, of } from 'rxjs';

export class ImageMockService implements ImageService {
  public uploadImage(image: File): Observable<ImgKey> {
    return of('FAKE_IMAGE_KEY');
  }
}

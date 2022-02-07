import { ImageService, ImgKey } from './image.service';
import { Observable, of } from 'rxjs';
import { ImagePostRes } from '../../models/image.model';
import { delay } from 'rxjs/operators';

export class ImageMockService implements ImageService {
  public uploadImage(image: File): Observable<ImagePostRes> {
    return of({ key: 'FAKE_IMAGE_KEY' }).pipe(delay(1000));
  }

  public deleteImage(key: string): Observable<any> {
    return of({});
  }
}

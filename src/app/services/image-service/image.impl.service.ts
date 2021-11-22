import { ImageService, ImgKey } from './image.service';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class ImageImplService implements ImageService {
  constructor(private http: HttpClient) {}

  public uploadImage(image: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<string>(`${environment.backendHost}/api/image`, formData);
  }
}

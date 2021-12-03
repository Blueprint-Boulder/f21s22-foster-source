import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { ImagePostRes } from '../../models/image.model';

export type ImgKey = string;

@Injectable({
  providedIn: 'root',
})
export abstract class ImageService {
  public abstract uploadImage(image: File): Observable<ImagePostRes>;
  public abstract deleteImage(key: string): Observable<any>;
}

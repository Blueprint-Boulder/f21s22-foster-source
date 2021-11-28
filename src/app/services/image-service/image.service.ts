import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

export type ImgKey = string;

@Injectable({
  providedIn: 'root',
})
export abstract class ImageService {
  public abstract uploadImage(image: File): Observable<string>;
  public abstract deleteImage(key: string): Observable<any>;
}

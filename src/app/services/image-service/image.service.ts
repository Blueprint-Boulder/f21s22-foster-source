import { Injectable } from '@angular/core';

export type S3Key = string;

@Injectable({
  providedIn: 'root',
})
export abstract class ImageService {
  public abstract uploadImage(image: File): S3Key;
  public abstract getImageLinkByUuid(uuid: string): string;
}

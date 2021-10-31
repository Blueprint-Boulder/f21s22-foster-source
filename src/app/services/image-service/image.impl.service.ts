import { ImageService, S3Key } from './image.service';
import { HttpClient } from '@angular/common/http';
import * as AWS from 'aws-sdk';

export class ImageImplService implements ImageService {
  constructor(private http: HttpClient) {
    // AWS.config.credentials = credentials;
    AWS.config.getCredentials(function (err) {
      if (err) console.log(err.stack);
      // credentials not loaded
      else {
        console.log('Access key:', AWS!.config!.credentials!.accessKeyId);
      }
    });
  }

  uploadImage(image: File): S3Key {
    return '';
  }

  getImageLinkByUuid(uuid: string): string {
    return '';
  }
}

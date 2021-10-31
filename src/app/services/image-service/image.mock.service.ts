import { ImageService, S3Key } from './image.service';

export class ImageMockService implements ImageService {
  uploadImage(image: File): S3Key {
    return '';
  }

  getImageLinkByUuid(uuid: string): string {
    return '';
  }
}

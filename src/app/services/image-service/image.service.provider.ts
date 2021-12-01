import { environment } from '../../../environments/environment';
import { ImageImplService } from './image.impl.service';
import { ImageMockService } from './image.mock.service';
import { ImageService } from './image.service';
import { HttpClient } from '@angular/common/http';

const imageServiceFactory = (http: HttpClient) => {
  if (environment.useRealImageService) {
    return new ImageImplService(http);
  } else {
    return new ImageMockService();
  }
};

export const imageServiceProvider = {
  provide: ImageService,
  useFactory: imageServiceFactory,
  deps: [HttpClient],
};

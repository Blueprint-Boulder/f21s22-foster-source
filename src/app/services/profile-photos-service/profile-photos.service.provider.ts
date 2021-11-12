import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProfilePhotosService } from './profile-photos.service';
import { ProfilePhotosImplService } from './profile-photos.impl.service';
import { ProfilePhotosMockService } from './profile-photos.mock.service';

const profilePhotosServiceFactory = (http: HttpClient) => {
  if (environment.useRealProfilePhotosService) {
    return new ProfilePhotosImplService(http);
  } else {
    return new ProfilePhotosMockService();
  }
};

export const profilePhotosServiceProvider = {
  provide: ProfilePhotosService,
  useFactory: profilePhotosServiceFactory,
  deps: [HttpClient],
};

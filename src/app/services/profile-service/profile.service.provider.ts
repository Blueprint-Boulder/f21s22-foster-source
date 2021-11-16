import { environment } from '../../../environments/environment';
import { ProfileImplService } from './profile.impl.service';
import { ProfileMockService } from './profile.mock.service';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from './profile.service';

const profileServiceFactory = (http: HttpClient) => {
  if (environment.useRealProfileService) {
    return new ProfileImplService(http);
  } else {
    return new ProfileMockService();
  }
};

export const profileServiceProvider = {
  provide: ProfileService,
  useFactory: profileServiceFactory,
  deps: [HttpClient],
};

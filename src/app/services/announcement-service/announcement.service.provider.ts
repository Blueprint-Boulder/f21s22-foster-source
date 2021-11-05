import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AnnouncementImplService } from './announcement.impl.service';
import { AnnouncementMockService } from './announcement.mock.service';
import { AnnouncementService } from './announcement.service';

const announcementServiceFactory = (http: HttpClient) => {
  if (environment.useRealAnnouncementService) {
    return new AnnouncementImplService(http);
  } else {
    return new AnnouncementMockService();
  }
};

export const announcementServiceProvider = {
  provide: AnnouncementService,
  useFactory: announcementServiceFactory,
  deps: [HttpClient],
};

import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../database-service/database.service';
import { environment } from '../../../environments/environment';
import { AnnouncementImplService } from './announcement.impl.service';
import { AnnouncementMockService } from './announcement.mock.service';

const announcementServiceFactory = (http: HttpClient) => {
  if (environment.useRealAnnouncementService) {
    return new AnnouncementImplService(http);
  } else {
    return new AnnouncementMockService();
  }
};

export const announcementServiceProvider = {
  provide: DatabaseService,
  useFactory: announcementServiceFactory,
  deps: [HttpClient],
};

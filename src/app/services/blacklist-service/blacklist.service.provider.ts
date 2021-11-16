import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BlacklistImplService } from './blacklist.impl.service';
import { BlacklistService } from './blacklist.service';
import { BlacklistMockService } from './blacklist.mock.service';

const blacklistServiceFactory = (http: HttpClient) => {
  if (environment.useRealBlacklistService) {
    return new BlacklistImplService(http);
  } else {
    return new BlacklistMockService();
  }
};

export const blacklistServiceProvider = {
  provide: BlacklistService,
  useFactory: blacklistServiceFactory,
  deps: [HttpClient],
};

import { environment } from '../../../environments/environment';
import { BugImplService } from './bug.impl.service';
import { BugMockService } from './bug.mock.service';
import { HttpClient } from '@angular/common/http';
import { BugService } from './bug.service';

const bugServiceFactory = (http: HttpClient) => {
  if (environment.useRealBugService) {
    return new BugImplService(http);
  } else {
    return new BugMockService();
  }
};

export const bugServiceProvider = {
  provide: BugService,
  useFactory: bugServiceFactory,
  deps: [HttpClient],
};

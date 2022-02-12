import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ForumImplService } from './forum.impl.service';
import { ForumMockService } from './forum.mock.service';
import { ForumService } from './forum.service';

const forumServiceFactory = (http: HttpClient) => {
  if (environment.useRealForumService) {
    return new ForumImplService(http);
  } else {
    return new ForumMockService();
  }
};

export const forumServiceProvider = {
  provide: ForumService,
  useFactory: forumServiceFactory,
  deps: [HttpClient],
};

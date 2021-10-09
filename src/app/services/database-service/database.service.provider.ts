import { DatabaseService } from './database.service';
import { HttpClient } from '@angular/common/http';
import { DatabaseMockService } from './database.mock.service';

const databaseServiceFactory = (http: HttpClient) => {
  return new DatabaseMockService(http);
};

export const databaseServiceProvider = {
  provide: DatabaseService,
  useFactory: databaseServiceFactory,
  deps: [HttpClient],
};

import { DatabaseService } from './database.service';
import { HttpClient } from '@angular/common/http';
import { DatabaseMockService } from './database.mock.service';
import { DatabaseImplService } from './database.impl.service';

const databaseServiceFactory = (http: HttpClient) => {
  return new DatabaseMockService(http);
};

export const databaseServiceProvider = {
  provide: DatabaseService,
  useFactory: databaseServiceFactory,
  deps: [HttpClient],
};

const databaseTestServiceFactory = (http: HttpClient) => {
  return new DatabaseImplService(http);
};

export const databaseServiceTestProvider = {
  provide: DatabaseService,
  useFactory: databaseTestServiceFactory,
  deps: [HttpClient],
};

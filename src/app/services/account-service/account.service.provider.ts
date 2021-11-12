import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AccountImplService } from './account.impl.service';
import { AccountMockService } from './account.mock.service';
import { AccountService } from './account.service';

const accountServiceFactory = (http: HttpClient) => {
  if (environment.useRealAccountService) {
    return new AccountImplService(http);
  } else {
    return new AccountMockService();
  }
};

export const accountServiceProvider = {
  provide: AccountService,
  useFactory: accountServiceFactory,
  deps: [HttpClient],
};

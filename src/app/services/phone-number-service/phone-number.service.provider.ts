import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PhoneNumberService } from './phone-number.service';
import { PhoneNumberImplService } from './phone-number.impl.service';
import { PhoneNumberMockService } from './phone-number.mock.service';

const phoneNumberServiceFactory = (http: HttpClient) => {
  if (environment.useRealBlacklistService) {
    return new PhoneNumberImplService(http);
  } else {
    return new PhoneNumberMockService();
  }
};

export const phoneNumberServiceProvider = {
  provide: PhoneNumberService,
  useFactory: phoneNumberServiceFactory,
  deps: [HttpClient],
};

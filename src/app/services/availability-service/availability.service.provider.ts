import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AvailabilityImplService } from './availability.impl.service';
import { AvailabilityMockService } from './availability.mock.service';
import { AvailabilityService } from './availability.service';

const availabilityServiceFactory = (http: HttpClient) => {
  if (environment.useRealAvailabilityService) {
    return new AvailabilityImplService(http);
  } else {
    return new AvailabilityMockService();
  }
};

export const availabilityServiceProvider = {
  provide: AvailabilityService,
  useFactory: availabilityServiceFactory,
  deps: [HttpClient],
};

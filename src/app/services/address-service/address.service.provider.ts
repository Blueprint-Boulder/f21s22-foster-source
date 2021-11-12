import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AddressImplService } from './address.impl.service';
import { AddressMockService } from './address.mock.service';
import { AddressService } from './address.service';

const addressServiceFactory = (http: HttpClient) => {
  if (environment.useRealAddressService) {
    return new AddressImplService(http);
  } else {
    return new AddressMockService();
  }
};

export const addressServiceProvider = {
  provide: AddressService,
  useFactory: addressServiceFactory,
  deps: [HttpClient],
};

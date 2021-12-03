import { AddressService } from './address.service';
import { AddressReq, SimpleAddressReq } from '../../models/adress.model';
import { Observable, of } from 'rxjs';
import { addresses } from '../../mock/database-entities';

export class AddressMockService implements AddressService {
  updateAddress(address: SimpleAddressReq): Observable<AddressReq> {
    return of(addresses[0]);
  }
}

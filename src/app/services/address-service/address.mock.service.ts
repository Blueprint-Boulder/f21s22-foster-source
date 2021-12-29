import { AddressService } from './address.service';
import { AddressReq, AddressRes, SimpleAddressReq } from '../../models/adress.model';
import { Observable, of } from 'rxjs';
import { addresses } from '../../mock/database-entities';

export class AddressMockService implements AddressService {
  getCurrentAddress(): Observable<AddressRes> {
    return of(addresses[0]);
  }

  updateAddress(address: SimpleAddressReq): Observable<AddressRes> {
    return of(addresses[0]);
  }
}

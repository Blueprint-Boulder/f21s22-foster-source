import { AddressService } from './address.service';
import { Address, SimpleAddress } from '../../models/adress.model';
import { Observable, of } from 'rxjs';
import { addresses } from '../../mock/database-entities';

export class AddressMockService implements AddressService {
  updateAddress(address: SimpleAddress): Observable<Address> {
    return of(addresses[0]);
  }
}

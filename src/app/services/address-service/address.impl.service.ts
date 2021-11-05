import { AddressService } from './address.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address, SimpleAddress } from '../../models/adress.model';
import { environment } from '../../../environments/environment';

export class AddressImplService implements AddressService {
  constructor(private http: HttpClient) {}

  updateAddress(address: SimpleAddress): Observable<Address> {
    return this.http.put<Address>(
      `${environment.backendHost}/api/db/account/address`,
      JSON.stringify(address)
    );
  }
}

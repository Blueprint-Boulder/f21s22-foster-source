import { AddressService } from './address.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressReq, SimpleAddressReq } from '../../models/adress.model';
import { environment } from '../../../environments/environment';

export class AddressImplService implements AddressService {
  constructor(private http: HttpClient) {}

  updateAddress(address: SimpleAddressReq): Observable<AddressReq> {
    return this.http.put<AddressReq>(`${environment.backendHost}/api/db/account/address`, JSON.stringify(address), {
      withCredentials: true,
    });
  }
}

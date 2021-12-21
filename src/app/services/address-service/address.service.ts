import { Injectable } from '@angular/core';
import { AddressReq, SimpleAddressReq } from '../../models/adress.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AddressService {
  public abstract updateAddress(address: SimpleAddressReq): Observable<AddressReq>;
}

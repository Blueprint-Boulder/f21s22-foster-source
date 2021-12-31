import { Injectable } from '@angular/core';
import { AddressReq, AddressRes, SimpleAddressReq } from '../../models/adress.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AddressService {
  public abstract getCurrentAddress(): Observable<AddressRes>;
  public abstract updateAddress(address: SimpleAddressReq): Observable<AddressRes>;
  public abstract logout(): Observable<any>;
}

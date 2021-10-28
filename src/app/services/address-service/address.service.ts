import { Injectable } from '@angular/core';
import { Address } from '../../models/adress.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AddressService {
  public abstract updateAddress(address: Address): Observable<Address>;
}

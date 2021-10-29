import { Injectable } from '@angular/core';
import { Address, SimpleAddress } from '../../models/adress.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AddressService {
  public abstract updateAddress(address: SimpleAddress): Observable<Address>;
}

import { Injectable } from '@angular/core';
import { PhoneNumber } from '../../models/phonenumber.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class PhoneNumberService {
  public abstract updatePhoneNumber(
    phoneNumber: PhoneNumber
  ): Observable<PhoneNumber>;
}

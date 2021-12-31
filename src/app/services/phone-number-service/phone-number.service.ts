import { Injectable } from '@angular/core';
import { PhoneNumber, PhoneNumbersRes, PhoneNumbersUpdateReq } from '../../models/phonenumber.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class PhoneNumberService {
  public abstract updatePhoneNumber(req: PhoneNumbersUpdateReq): Observable<PhoneNumbersRes>;
  public abstract getPhoneNumbers(): Observable<PhoneNumbersRes>;
}

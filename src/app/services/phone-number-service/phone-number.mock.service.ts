import { PhoneNumberService } from './phone-number.service';
import { PhoneNumber, PhoneNumbersRes, PhoneNumbersUpdateReq } from '../../models/phonenumber.model';
import { Observable, of } from 'rxjs';
import { mobilePhones, phoneNumbersRes } from '../../mock/database-entities';

export class PhoneNumberMockService implements PhoneNumberService {
  getPhoneNumbers(): Observable<PhoneNumbersRes> {
    return of(phoneNumbersRes[0]);
  }

  updatePhoneNumber(req: PhoneNumbersUpdateReq): Observable<PhoneNumbersRes> {
    return of(phoneNumbersRes[0]);
  }
}

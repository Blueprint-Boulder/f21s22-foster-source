import { PhoneNumberService } from './phone-number.service';
import { PhoneNumber } from '../../models/phonenumber.model';
import { Observable, of } from 'rxjs';
import { mobilePhones } from '../../mock/database-entities';

export class PhoneNumberMockService implements PhoneNumberService {
  updatePhoneNumber(phoneNumber: PhoneNumber, isPrimary: boolean): Observable<PhoneNumber> {
    return of(mobilePhones[0]);
  }
}

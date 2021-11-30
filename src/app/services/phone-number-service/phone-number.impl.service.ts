import { PhoneNumberService } from './phone-number.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhoneNumber } from '../../models/phonenumber.model';
import { environment } from '../../../environments/environment';

export class PhoneNumberImplService implements PhoneNumberService {
  constructor(private http: HttpClient) {}

  updatePhoneNumber(phoneNumber: PhoneNumber, isPrimary: boolean): Observable<PhoneNumber> {
    const isPrimaryString = isPrimary ? 'true' : 'false';
    return this.http.put<PhoneNumber>(
      `${environment.backendHost}/api/db/?primary=${isPrimaryString}`,
      JSON.stringify(phoneNumber)
    );
  }
}

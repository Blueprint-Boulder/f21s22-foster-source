import { EmailService } from './email.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SendAccountVerificationResponse } from '../../models/send-account-verification';

export class EmailMockService implements EmailService {
  constructor(private http: HttpClient) {}
  public sendAccountVerificationEmail(
    email: string
  ): Observable<SendAccountVerificationResponse> {
    return of({});
  }
}

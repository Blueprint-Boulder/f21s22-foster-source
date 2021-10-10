import { EmailService } from './email.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SendAccountVerificationResponse } from '../../models/send-account-verification';
import { catchError } from 'rxjs/operators';

export class EmailImplService implements EmailService {
  constructor(private http: HttpClient) {}
  public sendAccountVerificationEmail(
    email: string
  ): Observable<SendAccountVerificationResponse> {
    return this.http
      .get<SendAccountVerificationResponse>(
        `${
          environment.backendHost
        }/api/email/sendAccountVerification?email=${encodeURIComponent(email)}`
      )
      .pipe(
        catchError((error) => {
          console.log('Error sending a verification email.');
          console.log(error);
          return throwError(error);
        })
      );
  }
}

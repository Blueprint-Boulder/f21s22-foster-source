import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SendAccountVerificationResponse } from '../../models/send-account-verification';

@Injectable({
  providedIn: 'root',
})
export abstract class EmailService {
  public abstract sendAccountVerificationEmail(
    email: string
  ): Observable<SendAccountVerificationResponse>;
}

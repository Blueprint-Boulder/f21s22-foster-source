import { AccountService } from './account.service';
import { HttpClient } from '@angular/common/http';
import {
  Account,
  Cookie,
  CreateAccountRequest,
  LoginRequest,
  UpdateAccountReq,
} from '../../models/account.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export class AccountImplService implements AccountService {
  constructor(private http: HttpClient) {}

  createAccount(
    accountReq: CreateAccountRequest
  ): Observable<CreateAccountRequest> {
    return this.http.post<CreateAccountRequest>(
      `${environment.backendHost}/api/db/accounts`,
      JSON.stringify(accountReq)
    );
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.backendHost}/api/db/accounts/${encodeURIComponent(id)}`
    );
  }

  deleteOwnAccount(): Observable<void> {
    return this.http.delete<void>(
      `${environment.backendHost}/api/db/accounts/`
    );
  }

  login(params: LoginRequest): Observable<Cookie> {
    return this.http.post<Cookie>(
      `${environment.backendHost}/api/db/accounts/login`,
      JSON.stringify(params)
    );
  }

  updateAccount(params: UpdateAccountReq): Observable<Account> {
    return this.http.put<Account>(
      `${environment.backendHost}/api/db/accounts`,
      JSON.stringify(params)
    );
  }
}

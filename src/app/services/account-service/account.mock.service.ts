import { AccountService } from './account.service';
import {
  Account,
  Cookie,
  CreateAccountRequest,
  LoginRequest,
  UpdateAccountReq,
} from '../../models/account.model';
import { Observable, of } from 'rxjs';
import {
  accounts,
  cookies,
  createAccountRequests,
} from '../../mock/database-entities';

export class AccountMockService implements AccountService {
  createAccount(
    accountReq: CreateAccountRequest
  ): Observable<CreateAccountRequest> {
    return of(createAccountRequests[0]);
  }

  deleteAccount(id: number): Observable<void> {
    return of();
  }

  deleteOwnAccount(): Observable<void> {
    return of();
  }

  login(params: LoginRequest): Observable<Cookie> {
    return of(cookies[0]);
  }

  updateAccount(params: UpdateAccountReq): Observable<Account> {
    return of(accounts[0]);
  }
}

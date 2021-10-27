import { Injectable } from '@angular/core';
import {
  Account,
  Cookie,
  CreateAccountRequest,
  LoginRequest,
  UpdateAccountReq,
} from '../../models/account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AccountService {
  public abstract createAccount(
    accountReq: CreateAccountRequest
  ): Observable<CreateAccountRequest>;
  public abstract login(params: LoginRequest): Observable<Cookie>;
  public abstract updateAccount(params: UpdateAccountReq): Observable<Account>;
  public abstract deleteOwnAccount(): Observable<void>;
  public abstract deleteAccount(id: number): Observable<void>;
}

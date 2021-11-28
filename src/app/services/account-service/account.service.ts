import { Injectable } from '@angular/core';
import { Account, Cookie, CreateAccountRequest, LoginRequest, UpdateAccountReq } from '../../models/account.model';
import { Observable } from 'rxjs';
import {
  ApproveApplicantRequest,
  ApproveApplicantResponse,
  DenyApplicantRequest,
  DenyApplicantResponse,
  GetApplicantsRes,
} from '../../models/applicant.model';

@Injectable({
  providedIn: 'root',
})
export abstract class AccountService {
<<<<<<< HEAD
  public abstract createAccount(
    accountReq: CreateAccountRequest
  ): Observable<CreateAccountRequest>;
  public abstract login(params: LoginRequest): Observable<string>;
=======
  public abstract createAccount(accountReq: CreateAccountRequest): Observable<CreateAccountRequest>;
  public abstract login(params: LoginRequest): Observable<Cookie>;
  public abstract completeProfile(params: any): Observable<any>;
>>>>>>> 3f16f5c15f14f6df99484c145a2c4ad991933174
  public abstract updateAccount(params: UpdateAccountReq): Observable<Account>;
  public abstract deleteOwnAccount(): Observable<any>;
  public abstract deleteAccount(id: number): Observable<any>;
  public abstract getApplicants(): Observable<GetApplicantsRes>;
  public abstract denyApplicant(params: DenyApplicantRequest): Observable<any>;
  public abstract approveApplicant(params: ApproveApplicantRequest): Observable<any>;
  public abstract getCurrentAccount(): Observable<Account>;
}

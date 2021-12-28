import { Injectable } from '@angular/core';
import {
  Account,
  Cookie,
  CreateAccountRequest,
  CreateStaffAccountRequest,
  GetAccountsReq,
  LoginRequest,
  UpdateAccountReq,
  VerifyReq,
} from '../../models/account.model';
import { Observable } from 'rxjs';
import {
  ApproveApplicantRequest,
  ApproveApplicantResponse,
  DenyApplicantRequest,
  DenyApplicantResponse,
  GetApplicantsRes,
} from '../../models/applicant.model';
import { FinishProfileReq } from '../../models/profile.model';
import { ChangePasswordReq } from '../../models/change-password';

@Injectable({
  providedIn: 'root',
})
export abstract class AccountService {
  public abstract createAccount(accountReq: CreateAccountRequest): Observable<CreateAccountRequest>;
  public abstract createStaffAccount(accountReq: CreateStaffAccountRequest): Observable<any>;
  public abstract verifyAccount(params: VerifyReq): Observable<any>;
  public abstract resendVerificationEmail(email: string): Observable<any>;
  public abstract login(params: LoginRequest): Observable<string>;
  public abstract completeProfile(params: FinishProfileReq): Observable<any>;
  public abstract updateAccount(params: UpdateAccountReq): Observable<Account>;
  public abstract deleteOwnAccount(): Observable<any>;
  public abstract deleteAccount(id: number): Observable<any>;
  public abstract getApplicants(): Observable<GetAccountsReq>;
  public abstract getStaffApplicants(): Observable<GetAccountsReq>;
  public abstract denyApplicant(params: DenyApplicantRequest): Observable<any>;
  public abstract approveApplicant(params: ApproveApplicantRequest): Observable<any>;
  public abstract getCurrentAccount(): Observable<Account>;
  public abstract getAccountById(id: number): Observable<Account>;
  public abstract updatePasswordForCurrentAccount(req: ChangePasswordReq): Observable<any>;
}

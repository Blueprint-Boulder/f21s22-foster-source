import { Injectable } from '@angular/core';
import {
  Account,
  CaseWorkerInfo,
  CreateAccountRequest,
  CreateStaffAccountRequest,
  DeleteAccountReq,
  GetAccountsReq,
  LoginRequest,
  UpdateAccountReq,
  VerifyReq,
} from '../../models/account.model';
import { Observable } from 'rxjs';
import { ApproveApplicantRequest, DenyApplicantRequest } from '../../models/applicant.model';
import { FinishProfileReq } from '../../models/profile.model';
import { ChangePasswordReq, RecoveryChangePasswordReq } from '../../models/change-password';
import { NavBarStatus } from '../../models/nav-bar.models';

@Injectable({
  providedIn: 'root',
})
export abstract class AccountService {
  public abstract createAccount(accountReq: CreateAccountRequest): Observable<CreateAccountRequest>;
  public abstract createStaffAccount(accountReq: CreateStaffAccountRequest): Observable<any>;
  public abstract verifyAccount(params: VerifyReq): Observable<any>;
  public abstract resendVerificationEmail(email: string): Observable<any>;
  public abstract login(params: LoginRequest): Observable<string>;
  public abstract logout(): Observable<any>;
  public abstract completeProfile(params: FinishProfileReq): Observable<any>;
  public abstract deleteOwnAccount(req: DeleteAccountReq): Observable<any>;
  public abstract getApplicants(): Observable<GetAccountsReq>;
  public abstract getStaffApplicants(): Observable<GetAccountsReq>;
  public abstract denyApplicant(params: DenyApplicantRequest): Observable<any>;
  public abstract approveApplicant(params: ApproveApplicantRequest): Observable<any>;
  public abstract getCurrentAccount(): Observable<Account>;
  public abstract getAccountById(id: number): Observable<Account>;
  public abstract updatePasswordForCurrentAccount(req: ChangePasswordReq): Observable<any>;
  public abstract getCwInfo(): Observable<CaseWorkerInfo>;
  public abstract updateCwInfo(req: CaseWorkerInfo): Observable<any>;
  public abstract getNavBarStatus(): Observable<NavBarStatus>;
  public abstract recoveryUpdatePassword(req: RecoveryChangePasswordReq): Observable<any>;
  public abstract requestRecoverPassword(email: string): Observable<any>;
}

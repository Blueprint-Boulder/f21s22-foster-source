import { AccountService } from './account.service';
import {
  Account,
  CaseWorkerInfo,
  Token,
  CreateAccountRequest,
  CreateStaffAccountRequest,
  DeleteAccountReq,
  GetAccountsReq,
  LoginRequest,
  UpdateAccountReq,
  VerifyReq,
} from '../../models/account.model';
import { Observable, of } from 'rxjs';
import { accounts, applicants, tokenString, createAccountRequests } from '../../mock/database-entities';
import { ApproveApplicantRequest, DenyApplicantRequest, GetApplicantsRes } from '../../models/applicant.model';
import { FinishProfileReq } from '../../models/profile.model';
import { ChangePasswordReq, RecoveryChangePasswordReq } from '../../models/change-password';
import { NavBarStatus } from '../../models/nav-bar.models';

export class AccountMockService implements AccountService {
  createAccount(accountReq: CreateAccountRequest): Observable<CreateAccountRequest> {
    return of(createAccountRequests[0]);
  }

  createStaffAccount(accountReq: CreateStaffAccountRequest): Observable<any> {
    return of({});
  }

  deleteAccount(id: number): Observable<any> {
    return of({});
  }

  deleteOwnAccount(req: DeleteAccountReq): Observable<any> {
    return of({});
  }

  login(params: LoginRequest): Observable<string> {
    return of(tokenString);
  }

  logout(): Observable<any> {
    return of({});
  }

  updateAccount(params: UpdateAccountReq): Observable<Account> {
    return of(accounts[0]);
  }

  getApplicants(): Observable<GetAccountsReq> {
    return of({
      accounts: accounts,
    });
  }

  getStaffApplicants(): Observable<GetAccountsReq> {
    return of({
      accounts: accounts,
    });
  }

  approveApplicant(params: ApproveApplicantRequest): Observable<any> {
    return of({});
  }

  denyApplicant(params: DenyApplicantRequest): Observable<any> {
    return of({});
  }

  getCurrentAccount(): Observable<Account> {
    return of(accounts[0]);
  }

  completeProfile(params: FinishProfileReq): Observable<any> {
    return of({});
  }

  verifyAccount(params: VerifyReq): Observable<any> {
    return of({});
  }

  resendVerificationEmail(email: string): Observable<any> {
    return of({});
  }

  getAccountById(id: number): Observable<Account> {
    return of(accounts[0]);
  }

  updatePasswordForCurrentAccount(req: ChangePasswordReq): Observable<any> {
    return of({});
  }

  getCwInfo(): Observable<CaseWorkerInfo> {
    return of(accounts[0]);
  }

  updateCwInfo(req: CaseWorkerInfo): Observable<any> {
    return of({});
  }

  getNavBarStatus(): Observable<NavBarStatus> {
    return of({
      adminNotifications: 4,
    });
  }

  recoveryUpdatePassword(req: RecoveryChangePasswordReq): Observable<any> {
    return of({});
  }
}

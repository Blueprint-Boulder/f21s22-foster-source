import { ChangePasswordReq, RecoveryChangePasswordReq } from '../../models/change-password';
import { ApproveApplicantRequest, DenyApplicantRequest } from '../../models/applicant.model';
import { accounts, tokenString, createAccountRequests } from '../../mock/database-entities';
import { AccountService } from './account.service';
import { FinishProfileReq } from '../../models/profile.model';
import { NavBarStatus } from '../../models/nav-bar.models';
import { Observable, of } from 'rxjs';
import {
  Account,
  CaseWorkerInfo,
  CreateAccountRequest,
  CreateStaffAccountRequest,
  DeleteAccountReq,
  GetAccountsReq,
  LoginRequest,
  VerifyReq,
} from '../../models/account.model';

export class AccountMockService implements AccountService {
  createAccount(accountReq: CreateAccountRequest): Observable<CreateAccountRequest> {
    return of(createAccountRequests[0]);
  }

  createStaffAccount(accountReq: CreateStaffAccountRequest): Observable<any> {
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

  requestRecoverPassword(email: string): Observable<any> {
    return of({});
  }
}

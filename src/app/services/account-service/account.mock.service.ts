import { AccountService } from './account.service';
import {
  Account,
  Cookie,
  CreateAccountRequest,
  GetAccountsReq,
  LoginRequest,
  UpdateAccountReq,
  VerifyReq,
} from '../../models/account.model';
import { Observable, of } from 'rxjs';
import { accounts, applicants, tokenString, createAccountRequests } from '../../mock/database-entities';
import { ApproveApplicantRequest, DenyApplicantRequest, GetApplicantsRes } from '../../models/applicant.model';
import { FinishProfileReq } from '../../models/profile.model';

export class AccountMockService implements AccountService {
  createAccount(accountReq: CreateAccountRequest): Observable<CreateAccountRequest> {
    return of(createAccountRequests[0]);
  }

  deleteAccount(id: number): Observable<any> {
    return of({});
  }

  deleteOwnAccount(): Observable<any> {
    return of({});
  }

  login(params: LoginRequest): Observable<string> {
    return of(tokenString);
  }

  updateAccount(params: UpdateAccountReq): Observable<Account> {
    return of(accounts[0]);
  }

  getApplicants(): Observable<GetAccountsReq> {
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
}

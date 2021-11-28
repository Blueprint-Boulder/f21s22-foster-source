import { AccountService } from './account.service';
import { Account, Cookie, CreateAccountRequest, LoginRequest, UpdateAccountReq } from '../../models/account.model';
import { Observable, of } from 'rxjs';
<<<<<<< HEAD
import {
  accounts,
  applicants,
  createAccountRequests,
  tokenString,
} from '../../mock/database-entities';
import {
  ApproveApplicantRequest,
  DenyApplicantRequest,
  GetApplicantsRes,
} from '../../models/applicant.model';
=======
import { accounts, applicants, cookies, createAccountRequests } from '../../mock/database-entities';
import { ApproveApplicantRequest, DenyApplicantRequest, GetApplicantsRes } from '../../models/applicant.model';
>>>>>>> 3f16f5c15f14f6df99484c145a2c4ad991933174

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

  getApplicants(): Observable<GetApplicantsRes> {
    return of({
      applicants: applicants,
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

  completeProfile(params: any): Observable<any> {
    return of({});
  }
}

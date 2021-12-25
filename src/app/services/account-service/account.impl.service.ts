import { AccountService } from './account.service';
import { HttpClient } from '@angular/common/http';
import {
  Account,
  Cookie,
  CreateAccountRequest,
  GetAccountsReq,
  LoginRequest,
  UpdateAccountReq,
  VerifyReq,
} from '../../models/account.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApproveApplicantRequest, DenyApplicantRequest, GetApplicantsRes } from '../../models/applicant.model';
import { FinishProfileReq } from '../../models/profile.model';

export class AccountImplService implements AccountService {
  constructor(private http: HttpClient) {}

  createAccount(accountReq: CreateAccountRequest): Observable<CreateAccountRequest> {
    return this.http.post<CreateAccountRequest>(`${environment.backendHost}/api/db/accounts`, accountReq);
  }

  verifyAccount(params: VerifyReq): Observable<any> {
    return this.http.post<any>(`${environment.backendHost}/api/db/accounts/verification`, params);
  }

  resendVerificationEmail(email: string): Observable<any> {
    return this.http.post<any>(`${environment.backendHost}/api/db/accounts/verification/resend`, { email: email });
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete<void>(`${environment.backendHost}/api/db/accounts/${encodeURIComponent(id)}`);
  }

  deleteOwnAccount(): Observable<any> {
    return this.http.delete<void>(`${environment.backendHost}/api/db/accounts/`);
  }

  login(params: LoginRequest): Observable<Cookie> {
    return this.http.post<Cookie>(`${environment.backendHost}/api/db/accounts/login`, JSON.stringify(params));
  }

  updateAccount(params: UpdateAccountReq): Observable<Account> {
    return this.http.put<Account>(`${environment.backendHost}/api/db/accounts`, JSON.stringify(params));
  }

  getApplicants(): Observable<GetAccountsReq> {
    return this.http.get<GetAccountsReq>(`${environment.backendHost}/api/db/accounts?approved=false&level=USER`);
  }

  approveApplicant(params: ApproveApplicantRequest): Observable<any> {
    return this.http.put<any>(`${environment.backendHost}/api/db/accounts/approval?approve=true`, params);
  }

  denyApplicant(params: DenyApplicantRequest): Observable<any> {
    return this.http.put<any>(`${environment.backendHost}/api/db/accounts/approval?approve=false`, params);
  }

  getCurrentAccount(): Observable<Account> {
    return this.http.get<Account>(`${environment.backendHost}/api/db/current-account`);
  }

  completeProfile(params: FinishProfileReq): Observable<any> {
    return this.http.post<any>(`${environment.backendHost}/api/db/accounts/complete`, JSON.stringify(params));
  }
}

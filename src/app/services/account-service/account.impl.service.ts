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
    return this.http.post<CreateAccountRequest>(`${environment.backendHost}/api/db/accounts`, accountReq, {
      withCredentials: true,
    });
  }

  verifyAccount(params: VerifyReq): Observable<any> {
    return this.http.post<any>(`${environment.backendHost}/api/db/accounts/verification`, params, {
      withCredentials: true,
    });
  }

  resendVerificationEmail(email: string): Observable<any> {
    return this.http.post<any>(
      `${environment.backendHost}/api/db/accounts/verification/resend`,
      { email: email },
      { withCredentials: true }
    );
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete<void>(`${environment.backendHost}/api/db/accounts/${encodeURIComponent(id)}`, {
      withCredentials: true,
    });
  }

  deleteOwnAccount(): Observable<any> {
    return this.http.delete<void>(`${environment.backendHost}/api/db/accounts/`, {
      withCredentials: true,
    });
  }

  login(params: LoginRequest): Observable<string> {
    return this.http.post<string>(`${environment.backendHost}/api/db/accounts/login`, params, {
      withCredentials: true,
    });
  }

  updateAccount(params: UpdateAccountReq): Observable<Account> {
    return this.http.put<Account>(`${environment.backendHost}/api/db/accounts`, JSON.stringify(params), {
      withCredentials: true,
    });
  }

  getApplicants(): Observable<GetAccountsReq> {
    return this.http.get<GetAccountsReq>(`${environment.backendHost}/api/db/accounts?approved=false&level=USER`, {
      withCredentials: true,
    });
  }

  approveApplicant(params: ApproveApplicantRequest): Observable<any> {
    return this.http.put<any>(`${environment.backendHost}/api/db/accounts/approval?approve=true`, params, {
      withCredentials: true,
    });
  }

  denyApplicant(params: DenyApplicantRequest): Observable<any> {
    return this.http.put<any>(`${environment.backendHost}/api/db/accounts/approval?approve=false`, params, {
      withCredentials: true,
    });
  }

  getCurrentAccount(): Observable<Account> {
    return this.http.get<Account>(`${environment.backendHost}/api/db/current-account`, {
      withCredentials: true,
    });
  }

  completeProfile(params: FinishProfileReq): Observable<any> {
    return this.http.post<any>(`${environment.backendHost}/api/db/accounts/complete`, JSON.stringify(params), {
      withCredentials: true,
    });
  }
}

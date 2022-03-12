import { AccountService } from './account.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApproveApplicantRequest, DenyApplicantRequest } from '../../models/applicant.model';
import { FinishProfileReq } from '../../models/profile.model';
import { AuthService } from '../auth-service/auth.service';
import { ChangePasswordReq, RecoveryChangePasswordReq } from '../../models/change-password';
import { switchMap } from 'rxjs/operators';
import { NavBarStatus } from '../../models/nav-bar.models';

export class AccountImplService implements AccountService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createAccount(accountReq: CreateAccountRequest): Observable<CreateAccountRequest> {
    return this.http.post<CreateAccountRequest>(`${environment.backendHost}/api/db/accounts`, accountReq, {
      withCredentials: true,
    });
  }

  createStaffAccount(accountReq: CreateStaffAccountRequest): Observable<any> {
    return this.http.post<any>(`${environment.backendHost}/api/db/accounts/staff`, accountReq, {
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

  deleteOwnAccount(req: DeleteAccountReq): Observable<any> {
    return this.http.delete<void>(`${environment.backendHost}/api/db/accounts/`, {
      body: req,
      withCredentials: true,
    });
  }

  login(params: LoginRequest): Observable<string> {
    params.username = params.username.toLowerCase();
    return this.http
      .post<HttpResponse<any>>(`${environment.backendHost}/api/session/login`, params, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        switchMap((res) => {
          console.log(res);
          return of(res.body as unknown as string);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${environment.backendHost}/api/session/logout`, {
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

  getStaffApplicants(): Observable<GetAccountsReq> {
    return this.http.get<GetAccountsReq>(`${environment.backendHost}/api/db/accounts?approved=false&level=STAFF`, {
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

  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${environment.backendHost}/api/db/accounts/${id}`, {
      withCredentials: true,
    });
  }

  getCurrentAccount(): Observable<Account> {
    const cookie = this.authService.getToken();

    if (!cookie) {
      return throwError('There is no user currently logged in.');
    }

    return this.getAccountById(cookie.id);
  }

  completeProfile(params: FinishProfileReq): Observable<any> {
    return this.http.post<any>(`${environment.backendHost}/api/db/profiles/`, params, {
      withCredentials: true,
    });
  }

  updatePasswordForCurrentAccount(req: ChangePasswordReq): Observable<any> {
    return this.http.put<any>(`${environment.backendHost}/api/db/accounts/password`, req, {
      withCredentials: true,
    });
  }

  getCwInfo(): Observable<CaseWorkerInfo> {
    return this.http.get<CaseWorkerInfo>(`${environment.backendHost}/api/db/accounts/case-worker-info`, {
      withCredentials: true,
    });
  }

  updateCwInfo(req: CaseWorkerInfo): Observable<any> {
    return this.http.put(`${environment.backendHost}/api/db/accounts/case-worker-info`, req, {
      withCredentials: true,
    });
  }

  getNavBarStatus(): Observable<NavBarStatus> {
    return this.http.get<NavBarStatus>(`${environment.backendHost}/api/utils/nav-status`, {
      withCredentials: true,
    });
  }
  
  recoveryUpdatePassword(req: RecoveryChangePasswordReq): Observable<any> {
    return this.http.put(`${environment.backendHost}/api/db/accounts/recovery`, req, { withCredentials: true });
  }
}

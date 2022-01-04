import { Component, OnInit } from '@angular/core';
import {
  Applicant,
  ApprovalTableUser,
  ApproveApplicantRequest,
  DenyApplicantRequest,
  GetApplicantsRes,
} from '../../models/applicant.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { formatDate } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ToastService } from '../../services/toast-service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastPresets } from '../../models/toast.model';
import { AccountService } from '../../services/account-service/account.service';
import { accountServiceProvider } from '../../services/account-service/account.service.provider';
import { Account, GetAccountsReq } from '../../models/account.model';

@Component({
  selector: 'app-user-action-table',
  templateUrl: './user-action-table.component.html',
  styleUrls: ['./user-action-table.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':leave', [style({ opacity: 1 }), animate('0.1s ease-in', style({ opacity: 0 }))]),
    ]),
  ],
  providers: [accountServiceProvider],
})
export class UserActionTableComponent implements OnInit {
  public users: ApprovalTableUser[] = [];
  public denyFormGroup = this.formBuilder.group({
    reason: '',
    ban: false,
    sendCopy: false,
  });

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.accountService.getApplicants().subscribe(
      (res: GetAccountsReq) => {
        const applicants = res.accounts;
        this.users = [];
        for (let i = 0; i < applicants.length; i++) {
          this.users.push({ ...applicants[i], isCollapsed: true });
        }
      },
      (error: HttpErrorResponse) => {
        this.toastService.httpError(error);
      }
    );
  }

  public getFormattedDateForUser(index: number): string {
    return formatDate(this.users[index].lastLogin, 'MM/dd/yyyy', 'en-US');
  }

  public denyApplicant(index: number): void {
    const denied: Account = this.users[index];
    const params = this.denyFormGroup.value;
    const denyRequest: DenyApplicantRequest = {
      id: denied.id,
      reason: params.reason,
      shouldNotifyApplicant: params.sendCopy,
      shouldBlacklist: params.ban,
    };

    this.accountService.denyApplicant(denyRequest).subscribe(
      (res: any) => {
        this.getAndRemoveApplicantByIndex(index);
        this.toastService.show({
          body: `Successfully denied applicant ${denied.firstName} ${denied.lastName}.`,
          preset: ToastPresets.SUCCESS,
        });
      },
      (error: HttpErrorResponse) => {
        this.toastService.httpError(error);
      }
    );
  }

  public approveApplicant(index: number): void {
    const approved: Account = this.getAndRemoveApplicantByIndex(index);
    const approveParams: ApproveApplicantRequest = {
      id: approved.id,
    };

    this.accountService.approveApplicant(approveParams).subscribe(
      (res: any) => {
        this.toastService.show({
          body: `Successfully approved applicant ${approved.firstName} ${approved.lastName}.`,
          preset: ToastPresets.SUCCESS,
        });
      },
      (error: HttpErrorResponse) => {
        this.toastService.httpError(error);
      }
    );
  }

  private getAndRemoveApplicantByIndex(index: number): Account {
    const toGet: Account = this.users[index];
    this.users.splice(index, 1);
    return toGet;
  }
}

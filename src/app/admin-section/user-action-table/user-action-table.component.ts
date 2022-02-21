import { Component, OnInit } from '@angular/core';
import { ApprovalTableUser, ApproveApplicantRequest, DenyApplicantRequest } from '../../models/applicant.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { formatDate } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast-service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastPresets } from '../../models/toast.model';
import { AccountService } from '../../services/account-service/account.service';
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
})
export class UserActionTableComponent implements OnInit {
  public users: ApprovalTableUser[] = [];

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
          const controlsConfig: { [p: string]: any } = {};
          controlsConfig['reason' + i.toString()] = ['', Validators.required];
          controlsConfig['ban' + i.toString()] = false;
          controlsConfig['sendCopy' + i.toString()] = false;

          this.users.push({
            ...applicants[i],
            isCollapsed: true,
            index: i,
            denyForm: this.formBuilder.group(controlsConfig),
          });
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
    const denied: ApprovalTableUser = this.users[index];
    if (denied.denyForm.invalid) {
      denied.denyForm.markAllAsTouched();
    } else {
      const params = denied.denyForm.value;
      const denyRequest: DenyApplicantRequest = {
        id: denied.id,
        reason: params['reason' + denied.index],
        shouldNotifyApplicant: params['sendCopy' + denied.index],
        shouldBlacklist: params['ban' + denied.index],
      };
      this.accountService.denyApplicant(denyRequest).subscribe(
        (res: any) => {
          this.toastService.success(`Successfully denied applicant ${denied.firstName} ${denied.lastName}.`);
          this.getAndRemoveApplicantByIndex(index);
        },
        (error: HttpErrorResponse) => {
          this.toastService.httpError(error);
        }
      );
    }
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

import { Component, OnInit } from '@angular/core';
import {
  Applicant,
  ApprovalTableUser,
  ApproveApplicantRequest,
  ApproveApplicantResponse,
  DenyApplicantRequest,
  DenyApplicantResponse,
} from '../../models/applicant.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { DatabaseService } from '../../services/database-service/database.service';
import { databaseServiceProvider } from '../../services/database-service/database.service.provider';
import { formatDate } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ToastService } from '../../services/toast-service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastPresets } from '../../models/toast.model';

@Component({
  selector: 'app-user-action-table',
  templateUrl: './user-action-table.component.html',
  styleUrls: ['./user-action-table.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.1s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
  providers: [databaseServiceProvider],
})
export class UserActionTableComponent implements OnInit {
  public users: ApprovalTableUser[] = [];
  public denyFormGroup = this.formBuilder.group({
    reason: '',
    ban: false,
    sendCopy: false,
  });

  constructor(
    private dbService: DatabaseService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.dbService.getApplicants().subscribe(
      (applicants: Applicant[]) => {
        this.users = [];
        for (let i = 0; i < applicants.length; i++) {
          this.users.push({ ...applicants[i], isCollapsed: true });
        }
      },
      (error: HttpErrorResponse) => {
        this.toastService.show({
          body: `Something went wrong trying to fetch the list of applicants.`,
          preset: ToastPresets.ERROR,
        });
      }
    );
  }

  public getFormattedDateForUser(index: number): string {
    return formatDate(this.users[index].dateApplied, 'dd/MM/yyyy', 'en-US');
  }

  public denyApplicant(index: number): void {
    const denied: Applicant = this.getAndRemoveApplicantByIndex(index);
    const params = this.denyFormGroup.value;
    const denyRequest: DenyApplicantRequest = {
      //TODO: include banned by in some manor
      id: denied.id,
      reason: params.reason,
      shouldNotifyApplicant: params.sendCopy,
      shouldBlacklist: params.shouldBan,
    };

    this.dbService.denyApplicant(denyRequest).subscribe(
      (res: DenyApplicantResponse) => {
        if (res.error) {
          this.toastService.show({
            body: 'Something went wrong trying to deny the user.',
            preset: ToastPresets.ERROR,
          });
        } else {
          this.toastService.show({
            body: `Successfully denied applicant ${denied.name}.`,
            preset: ToastPresets.SUCCESS,
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.toastService.show({
          body: 'Something went wrong trying to deny the user.',
          preset: ToastPresets.ERROR,
        });
      }
    );
  }

  public approveApplicant(index: number): void {
    const approved: Applicant = this.getAndRemoveApplicantByIndex(index);
    const approveParams: ApproveApplicantRequest = {
      id: approved.id,
    };

    this.dbService.approveApplicant(approveParams).subscribe(
      (res: ApproveApplicantResponse) => {
        if (res.error) {
          this.toastService.show({
            body: 'Something went wrong trying to approve the user.',
            preset: ToastPresets.ERROR,
          });
        } else {
          this.toastService.show({
            body: `Successfully approved applicant ${approved.name}.`,
            preset: ToastPresets.SUCCESS,
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.toastService.show({
          body: 'Something went wrong trying to approve the user.',
          preset: ToastPresets.ERROR,
        });
      }
    );
  }

  private getAndRemoveApplicantByIndex(index: number): Applicant {
    const toGet: Applicant = this.users[index];
    this.users.splice(index, 1);
    return toGet;
  }
}

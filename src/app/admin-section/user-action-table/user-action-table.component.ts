import { Component, OnInit } from '@angular/core';
import { Applicant, ApprovalTableUser } from '../../models/applicant.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { DatabaseService } from '../../services/database-service/database.service';
import { databaseServiceProvider } from '../../services/database-service/database.service.provider';
import { formatDate } from '@angular/common';
import { FormBuilder } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dbService.getApplicants().subscribe(
      (applicants: Applicant[]) => {
        for (let i = 0; i < applicants.length; i++) {
          this.users.push({ ...applicants[i], isCollapsed: true });
        }
      },
      (error) => {
        // TODO
      }
    );
  }

  public getFormattedDateForUser(index: number): string {
    return formatDate(this.users[index].dateApplied, 'dd/MM/yyyy', 'en-US');
  }

  public denyApplicant(index: number) {
    this.users.splice(index, 1);
  }

  public approveApplicant(index: number) {
    this.users.splice(index, 1);
  }
}

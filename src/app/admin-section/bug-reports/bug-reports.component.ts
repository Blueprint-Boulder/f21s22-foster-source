import { Component, OnInit } from '@angular/core';
import { BugService } from '../../services/bug-service/bug.service';
import { BugReport } from '../../models/bug.model';
import { ToastService } from '../../services/toast-service/toast.service';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bug-reports',
  templateUrl: './bug-reports.component.html',
  styleUrls: ['./bug-reports.component.scss'],
})
export class BugReportsComponent implements OnInit {
  public bugs: BugReport[] = [];

  constructor(private bugService: BugService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.bugService.getBugs().subscribe(
      (res) => {
        this.bugs = res.bugs;
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }

  public removeBug(index: number): void {
    const toRemove: BugReport = this.getAndRemoveBugByIndex(index);

    this.bugService.deleteBug(toRemove.id).subscribe(
      (res: BugReport) => {
        this.toastService.success('Successfully removed bug report.');
      },
      (error: HttpErrorResponse) => {
        this.toastService.httpError(error);
      }
    );
  }

  public getFormattedDateForBug(index: number): string {
    return formatDate(this.bugs[index].createdAt, 'MM/dd/yyyy', 'en-US');
  }

  private getAndRemoveBugByIndex(index: number): BugReport {
    const toGet: BugReport = this.bugs[index];
    this.bugs.splice(index, 1);
    return toGet;
  }
}

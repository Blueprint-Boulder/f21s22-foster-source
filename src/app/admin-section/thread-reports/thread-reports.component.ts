import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { ThreadReport } from '../../models/forum.models';
import { formatDate } from '@angular/common';
import { BugReport } from '../../models/bug.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-thread-reports',
  templateUrl: './thread-reports.component.html',
  styleUrls: ['./thread-reports.component.scss'],
})
export class ThreadReportsComponent implements OnInit {
  public reports: ThreadReport[];

  constructor(private forumService: ForumService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.forumService.getThreadReports().subscribe(
      (res) => {
        this.reports = res.threadReports;
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }

  public getFormattedDateForThreadReport(index: number): string {
    return formatDate(this.reports[index].createdAt, 'MM/dd/yyyy', 'en-US');
  }

  public dismissReport(index: number): void {
    this.forumService.deleteThreadReport(this.reports[index].id).subscribe(
      (_) => {
        this.removeReportByIndex(index);
        this.toastService.success('Successfully dismissed the thread report.');
      },
      (error: HttpErrorResponse) => {
        this.toastService.httpError(error);
      }
    );
  }

  private removeReportByIndex(index: number): void {
    this.reports.splice(index, 1);
  }
}

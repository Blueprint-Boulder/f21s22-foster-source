import { ForumService } from '../../services/forum-service/forum.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReplyReport } from '../../models/forum.models';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reply-reports',
  templateUrl: './reply-reports.component.html',
  styleUrls: ['./reply-reports.component.scss'],
})
export class ReplyReportsComponent implements OnInit {
  public reports: ReplyReport[];

  constructor(private forumService: ForumService, private toastService: ToastService, private router: Router) {}

  ngOnInit(): void {
    this.forumService.getReplyReports().subscribe(
      (res) => {
        console.log(res);
        this.reports = res.replyReports;
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }

  getBodyForIndex(index: number): string {
    const tempDivElement = document.createElement('div');
    tempDivElement.innerHTML = this.reports[index].replyBody;
    return tempDivElement.textContent || tempDivElement.innerText || '';
  }

  public getFormattedDateForReplyReport(index: number): string {
    return formatDate(this.reports[index].createdAt, 'MM/dd/yyyy', 'en-US');
  }

  public dismissReport(index: number): void {
    this.forumService.deleteReplyReport(this.reports[index].id).subscribe(
      (_) => {
        this.removeReportByIndex(index);
        this.toastService.success('Successfully dismissed the reply report.');
      },
      (error: HttpErrorResponse) => {
        this.toastService.httpError(error);
      }
    );
  }

  private removeReportByIndex(index: number): void {
    this.reports.splice(index, 1);
  }

  public inspectReply(index: number): void {
    this.router.navigate(['/forum/threads/' + this.reports[index].threadId], {
      queryParams: { replyOffset: 0, inspecting: this.reports[index].replyId },
    });
  }
}

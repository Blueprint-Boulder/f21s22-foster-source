import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { ProfileReportSummary } from '../../models/profile.model';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-reports',
  templateUrl: './profile-reports.component.html',
  styleUrls: ['./profile-reports.component.scss'],
})
export class ProfileReportsComponent implements OnInit {
  public reports: ProfileReportSummary[];

  constructor(private profileService: ProfileService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.profileService.getProfileReports().subscribe(
      (res) => {
        this.reports = res.profileReports;
        console.log(res);
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }

  public getFormattedDateForProfileReport(index: number): string {
    return formatDate(this.reports[index].createdAt, 'MM/dd/yyyy', 'en-US');
  }

  public dismissReport(index: number): void {
    this.profileService.deleteProfileReport(this.reports[index].id).subscribe(
      (_) => {
        this.removeReportByIndex(index);
        this.toastService.success('Successfully dismissed the profile report.');
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }

  private removeReportByIndex(index: number): void {
    this.reports.splice(index, 1);
  }
}
